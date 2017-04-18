import Vue from 'vue'

Vue.prototype.$bus = new Vue()

/**
 * spin(bound_function)
 *
 * Local spinner wrapper function
 *
 * Usage:
 *
 *     @click="spin(updateScenarioDetails.bind(this, scenario))"
 *
 * instead of
 *
 *     @click="updateScenarioDetails(scenario)"
 *
 * Also, the button markup needs to include an "i.fa-spin" element. Below is
 * full markup showing how to use use spin().
 *
 *     a.btn.btn-primary.float-right(href="#", @click="spin(updateScenarioDetails.bind(this, scenario))")
 *         i(style="display:none;").fa.fa-spinner.fa-spin.mr-2
 *         | apply
 *
 */
Vue.prototype.spin = function(fn) {
    let t = window.event.currentTarget
    let el = t.querySelector('i.fa-spin')
    el.style.display='inline-block'
    t.tagName==='BUTTON' ? t.disabled=true : t.classList.add('disabled')

    // give the browser time to update the screen
    setTimeout(()=>{
        let pr = fn()
        if (!pr || !pr.then) pr = Promise.resolve()

        pr
        .then(()=>{el.style.display='none'; t.tagName==='BUTTON' ? t.disabled=false : t.classList.remove('disabled')})
        .catch(()=>{el.style.display='none'; t.tagName==='BUTTON' ? t.disabled=false : t.classList.remove('disabled')})
    }, 10)

}

// todo: remove the temporary debug helper, below, before Go-Live
// This allows us to log(123) in templates, ex: @click="log"
Vue.prototype.log = console.debug.bind(console)

