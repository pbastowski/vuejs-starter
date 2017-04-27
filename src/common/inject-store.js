/**
 * Uses the Vuex mapState helper to injects store reactive properties
 * into your components (see Vuex mapState helper for full
 * documentaion).
 *
 * Install:
 *
 *   import InjectStore from 'inject-store'
 *
 *   Vue.mixin(InjectStore)
 *
 * Usage:
 *
 * Your store in just an object literal, for example,
 *
 *   const store = {
 *     state: {
 *       xxx : {
 *         a: 1,
 *         b: { c: 123 }
 *       },
 *       data: {}
 *     }
 *   }
 *
 * You must add your store to the root Vue instance first.
 *
 * new Vue({
 *     store
 * })
 *
 * When defining your component, simply add the "injectstore" key
 * to your component definition and then specify, in an array,
 * which props from your store you wish to be bound to this component.
 *
 * "injectstore" is an array or either strings or an object map.
 *
 *   export default {
 *     injectstore: [ 'data', 'version' ],
 *     template: ...
 *   }
 *
 * or
 *
 *   export default {
 *     injectstore: { data: 'data', version: 'version' ],
 *     template: ...
 *   }
 *
 * Nested props, such as "xx.a" or "xxx.b.c", can also be
 * injected like this:
 *
 *   export default {
 *     injectstore: { c: state => state.data.c },
 *     template: ...
 *   }
 */
// import {mapState} from 'vuex'

export default {
    beforeCreate() {
        if (!this.$parent || !this.$options.injectstore) return
        if (!this.$options.computed) this.$options.computed = {}

        this.$options.injectstore.forEach(i => {
            if (i.indexOf('.') === -1) {
                this.$options.computed[i] = {
                    get() { return this.$store.state[i] },
                    set(v) { this.$store.state[i] = v },
                }
            } else {
                let a = i.split('.')
                this.$options.computed[a.slice(-1)[0]] = {
                    get() { let x = this.$store.state; a.forEach(i=>x=x[i]); return x },
                    set(v) { let x = this.$store.state; a.forEach(i=>x=x[i]); x = v },
                }
                // let a = i.split('.')
                // this.$options.computed[a.slice(-1)[0]] = {
                //     get: Function(`return this.$store.state["${a.join('"]["')}"]`).bind(this),
                //     set: Function('v', `console.log('***', this); this.$store.state["${a.join('"]["')}"]=v`).bind(this)
                // }
            }
        })

        // The code below injects top-level objects from the store, whose
        // properties can be both read and written to, but the object itself
        // is read-only (a getter).
        // this.$options.computed = {
        //     ...mapState(this.$options.injectstore),
        //     ...this.$options.computed,
        // }
    }
}
