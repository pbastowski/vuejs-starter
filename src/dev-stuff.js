import Vue from 'vue'

window.log = function (...args) {
    args = args.map(v=>(typeof v === "object") ? JSON.stringify(v,null,4) : v)
    setTimeout(console.log.bind(console, ...args))
}
window.trace = function (...args) {
    args = args.map(v=>(typeof v === "object") ? JSON.stringify(v,null,4) : v)
    setTimeout(console.log.bind(console, ...args))
    setTimeout(console.debug.bind(console, Error().stack.split('\n')[2]))
}

//(2500).toLocaleString("en-GB", {style: "currency", currency: "GBP", minimumFractionDigits: 2})

window.axios = require('axios')
