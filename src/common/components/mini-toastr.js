// This library causes problems with testing, therefore a conditional check.
let miniToastr = {}

if (process.env.NODE_ENV === 'testing') {
    miniToastr = {
        success: function (text) {
            bla
        }
    }
} else {
    miniToastr = require('mini-toastr')
    miniToastr.init()
}

export default miniToastr