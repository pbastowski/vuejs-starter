/**
 * Inject Vuex store reactive properties into your components by
 * automatically creating getters and setters for each injected prop.
 *
 * Install:
 *
 *   import InjectVuexProps from 'inject-vuex-props'
 *
 *   Vue.mixin(InjectVuexProps)
 *
 * Usage:
 *
 * When creating your component simply add the "injected" key
 * to your component definition and then specify which props
 * from the Vuex store you wish to be bound to this component.
 *
 * `inject` is an array or either strings or objects.
 * String elements refer to the exact property in the Vuex store,
 * So, if your store looks like this:
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
 * You can inject "data" by specifying it in the array as a string.
 *
 *   export default {
 *     inject: [ 'data' ],
 *     template: ...
 *   }
 *
 * Nested props, such as "xxx.b.c" or "xx.a", can be injected like this:
 *
 *   export default {
 *     inject: [ { c: 'xxx.b.c' }, { a: 'xxx.a' }, 'data' ],
 *     template: ...
 *   }
 */

export default {
    beforeCreate() {
        let vm = this
        if (!this.$parent || !this.$store || !this.$options.inject) return
        if (!this.$options.computed) this.$options.computed = {}

        this.$options.inject.map(function(prop) {
            let name
            if (typeof prop === 'string') {
                name = prop
            } else {
                name = Object.keys(prop)[0]
                prop = prop[name]
            }

            vm.$options.computed[name] = {
                get() {
                    return prop.split('.').reduce((pValue, cValue) => {
                        return pValue[cValue];
                    }, vm.$store.state)
                },
                set(value) {
                    let path = prop.split('.');
                    let length = path.length - 1;
                    let store = vm.$store.state;

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
