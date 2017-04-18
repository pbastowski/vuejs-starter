// let lifeCycleHooks = [
//     // Vue hooks
//     'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate',
//     'updated', 'activated', 'deactivated', 'beforeDestroy', 'destroyed',
//     'render',
//     // Vue Router hooks
//     'beforeRouteEnter', 'beforeRouteLeave'
// ]
//
//
// function install(Vue, options = {}) {
//     if (options.hooks)
//         lifeCycleHooks = [...lifeCycleHooks, ...options.hooks]
// }
//
// /**
//  * The Component decorator converts the target class into a component
//  * definition object. The options parameter is the same options that
//  * you would normally provide when creating a component. As in:
//  *   Vue.component(options)
//  * or
//  *   Vue({
//  *      template: '<my-component />',
//  *      components: { myComponent: options }
//  *   })
//  *
//  * @param options
//  * @returns {Function}
//  * @constructor
//  */
// function Component(options={}) {
//     if (typeof options !=='object')
//         throw new TypeError('Component options must be an object literal {...}')
//
//     return function (target) {
//         // console.time('CDO')
//         // Initialise the Component Definition Object (o)
//         let cdo = {}
//         let t = new target()
//
//         if (options) Object.assign(cdo, options)
//
//         // All class properties become data object properties
//         let data = cdo.data || {}
//         Object.keys(t).forEach(prop => data[prop] = t[prop])
//
//         // Create the data function - data must be cloned each time
//         // otherwise all the components will share the same data.
//         if (Object.keys(data).length) cdo.data = function () {
//             return clone(data)
//         }
//
//         // Create methods and computed (getters/setters)
//         let methods = (Object.getOwnPropertyNames(target.prototype) || Object.keys(target.prototype))
//             .filter(m=>m!=='constructor')
//         cdo.methods  = cdo.methods || {}  // any existing methods from options
//         cdo.computed = cdo.computed || {}  // any existing computed from options
//         methods.forEach(m => {
//             let desc = Object.getOwnPropertyDescriptor(target.prototype, m)
//
//             if (desc.get || desc.set) {
//                 // It is a getter/setter (computed)
//                 let cp = {}
//                 if (desc.get) cp.get = desc.get
//                 if (desc.set) cp.set = desc.set
//                 cdo.computed[m] = cp
//             } else {
//                 if (lifeCycleHooks.includes(m)) {
//                     // lifecycle hook
//                     cdo[m] = desc.value
//                 } else {
//                     // normal method
//                     cdo.methods[m] = desc.value
//                 }
//             }
//         })
//
//         // console.timeEnd('CDO')
//         console.log('CDO:', _.cloneDeep(cdo))
//         return cdo
//     }
//
//     function clone(obj) {
//         if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
//             return obj;
//
//         if (obj instanceof Date)
//             var temp = new obj.constructor(); //or new Date(obj);
//         else
//             var temp = obj.constructor();
//
//         for (var key in obj) {
//             if (Object.prototype.hasOwnProperty.call(obj, key)) {
//                 obj['isActiveClone'] = null;
//                 temp[key]            = clone(obj[key]);
//                 delete obj['isActiveClone'];
//             }
//         }
//
//         return temp;
//     }
// }
//
// /**
//  * Assigning the Plugin object as a static to Component is the
//  * easiest way to make the Component object available everywhere
//  * using WebPack's resolve.alias and ProvidePlugin config options.
//  * Using the standard export and export default results in WebPack
//  * providing not the Component function by default, but the whole
//  * module.exports object, of which Component is a method.
//  */
//
// Component.Plugin = { install }
//
// module.exports = Component
