/**
 * Inject your store reactive properties into your components by
 * automatically creating getters and setters for each injected prop.
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
 *   data: {
 *     store
 *   }
 * })
 *
 * When defining your component, simply add the "inject" key
 * to your component definition and then specify which props
 * from your store you wish to be bound to this component.
 *
 * "inject" is an array or either strings or objects. String
 * elements refer to the exact property in the Vuex store.
 * For example, to inject "data" into your component, so that
 * it is accessible in your component as "this.data", specify
 * it in the array as a string, like this:
 *
 *   export default {
 *     injectstore: [ 'data' ],
 *     template: ...
 *   }
 *
 * Then, in your template you can access "data" as "{{ data }}".
 * In the created function, or any methods, you can access
 * "data" as "this.data".
 *
 * Nested props, such as "xx.a" or "xxx.b.c", can also be
 * injected like this:
 *
 *   export default {
 *     injectstore: [ { c: 'xxx.b.c' }, { a: 'xxx.a' }, 'data' ],
 *     template: ...
 *   }
 */

export default {
    beforeCreate() {
        let vm = this
        if (!this.$parent || !this.$root.store || !this.$options.injectstore) return
        if (!this.$options.computed) this.$options.computed = {}

        this.$options.injectstore.forEach(function(prop) {
            let name, readonly = false
            let keys = Object.keys(prop)

            if (typeof prop === 'string') {
                name = prop

            } else if (prop.service) {
                let m = {}
                // console.log('service: ', prop)
                vm.$options.computed[prop.name] = { get() { return m } }
                Object.keys(prop.service).forEach(key => m[key] = prop.service[key].bind(vm, store, m))
                return

            } else if (typeof prop[keys[0]] === 'function') {
                if (!vm.$options.methods) vm.$options.methods = {}
                let m = Object.assign({}, prop)
                keys.forEach(key => vm.$options.methods[key] = prop[key].bind(vm, store, vm.$options.methods))
                return

            } else if (typeof prop === 'object') {
                name = keys[0]
                readonly = prop.readonly
                prop = prop[name]
            }

            vm.$options.computed[name] = {
                get() {
                    return prop.split('.').reduce((pValue, cValue) => {
                        return pValue[cValue];
                    }, vm.$root.store)
                },
            }
            if (!readonly) {
                vm.$options.computed[name].set = function (value) {
                    let path = prop.split('.');
                    let length = path.length - 1;
                    let store = vm.$root.store;

                    for (var i = 0; i < length; i++) {
                        if (store.hasOwnProperty(path[i])) {
                            store = store[path[i]];
                        }
                    }

                    store[path[i]] = value;
                }
            }
        })
    }
}
