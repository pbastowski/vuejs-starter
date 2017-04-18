import Vue from 'vue'

/**
 * Useful filters
 */
Vue.filter('date', (v, format) => moment(v).format(format))
Vue.filter('slice', (v, s, e) => v.slice(s, e))
