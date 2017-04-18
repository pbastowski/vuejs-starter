/**
 * 'v-float-head' directive
 * Note: this only floats the thead section as is, without
 * any Vue reactivity whatsoever.
 */

export default {
    unbind(elem) {
        elem.removeFloatHeaderListeners()
    },

    inserted(elem) {

        if (elem.tagName !== 'TABLE') {
            throw new Error('v-float-head must be placed on a table element.')
        }

        let zindex = 1001

        init()

        function init() {
            let sticky = elem.cloneNode(true)

            if (sticky.querySelector('tfoot')) sticky.querySelector('tfoot').remove()
            sticky.querySelectorAll('tbody').forEach(b=>b.remove())
            sticky.removeAttribute('v-float-head')


            let boundOnResize = onResize.bind({ elem, sticky })
            let boundOnScroll = onScroll.bind({ elem, sticky })

            window.addEventListener('resize', boundOnResize)
            window.addEventListener('scroll', boundOnScroll)

            // Create a function that removes the above event listeners
            elem.removeFloatHeaderListeners = () => {
                window.removeEventListener('resize', boundOnResize)
                window.removeEventListener('scroll', boundOnScroll)
            }

            Object.assign(sticky.style, {
                'z-index': zindex,
                top:       0,
                position:  'fixed',
                display:   'none',
                //border:    'none',
                background: 'white',
            })

            elem.parentElement.insertBefore(sticky, elem)

            onResize.call({elem, sticky})
            if (window.scrollY > 0) {
                onScroll()
            }
        }

    },
}

function onResize() {
    let {elem, sticky} = this

    let th2 = elem.querySelectorAll('th')
    sticky.querySelectorAll('th').forEach((th, index) => {
        th.style.width = th2[index].offsetWidth+'px'
    })
}

function onScroll() {
    let {elem, sticky} = this

    let theadHeight = elem.querySelector('thead').offsetHeight
    var off       = window.scrollY
    var tblOffTop = elem.getBoundingClientRect().top + off
    var tblOffBot = tblOffTop + elem.offsetHeight - theadHeight
    if (off < tblOffTop || off > tblOffBot) {
        sticky.style.display = 'none'
    } else if (off >= tblOffTop && off <= tblOffBot && sticky.style.display === 'none') {
        sticky.style.display = 'block'
    }
}
