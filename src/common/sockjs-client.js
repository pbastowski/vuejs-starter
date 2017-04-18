const SockJS = require('sockjs-client')
const WEBSOCKET_URL = '/api/register'
const transports = {transports: 'xhr-polling'}

/**
 *
 * Instantiates socket object. If the connection closes for some reason it re-initializes automatically.
 *
 * @param sock - {} - The socket object
 * @param msgHandler - Function - The message handler ( passed from outside )
 */
function initSocket(sock, msgHandler) {

    console.log('Initializing websocket..')

    sock = new SockJS(WEBSOCKET_URL, null, transports)

    sock.onopen = onopenTest
    // sock.onopen = onopen

    sock.onclose = () => {
        console.log('closed websocket connection.')
        initSocket(sock, msgHandler)
    }

    sock.onmessage = data => {
        msgHandler(data.data)
    }

    function onopen() {
        console.log('opened websocket connection.')
    }

    // test function, closes the socket in 30% of cases to trigger re-initialization
    function onopenTest() {
        console.log('opened websocket connection.')
    }
}

export default initSocket