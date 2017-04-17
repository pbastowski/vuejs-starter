const createFile = require('./util').createFile
const requireUncached = require('./util').requireUncached
const fs = require('fs')
const dirName = `${__dirname}/db/users`

function get_user_details (req, res) {
    if (!fs.existsSync(`${dirName}/1.json`)) {
        return res.sendStatus(404)
    }
    return res.json(requireUncached(`${dirName}/1.json`))
}

module.exports = {
    get_user_details
}