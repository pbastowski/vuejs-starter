// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import "core-js/client/shim.min.js"

import "./dev-stuff";
import "./vue-prototype-decorators";

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

require('mini-toastr').init()

// Add Auto prop injection mixin
Vue.mixin(require('./common/inject-store').default)

import App from './App'
import store from './store'
import router from './router'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el:         '#app',
    store,
    router,
    template:   '<App/>',
    components: { App },
})
