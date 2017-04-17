var http = require('http')
var sockjs = require('sockjs')

function initSockJS (server) {
    var echo = sockjs.createServer({sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'})
    echo.on('connection', function (conn) {
        conn.on('data', function (message) {
            conn.write(message)
        })
        conn.on('close', function () {
            console.log('aa')
        })
    })
    echo.installHandlers(server, {prefix: '/api/echo'})
}

module.exports = {
    initSockJS
}