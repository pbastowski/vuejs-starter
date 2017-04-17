const createFile = require('./util').createFile
const requireUncached = require('./util').requireUncached
const fs = require('fs')

const dbFolder = 'db'

const getFilePath = (key) => {
    if (key === 'settings') return __dirname + `/${dbFolder}/settings.json`
    if (key === 'ignored-outstations') return __dirname + `/${dbFolder}/ignored-outstations.json`
    if (key === 'accompat') return __dirname + `/${dbFolder}/accompat.json`
    if (key === 'roles') return __dirname + `/${dbFolder}/role-settings.json`
    if (key === 'leg-visbility') return __dirname + `/${dbFolder}/role-settings.json`
    if (key === 'duration-config') return __dirname + `/${dbFolder}/duration-config.json`
    if (key === 'date-format') return __dirname + `/${dbFolder}/date-format.json`
}

// POST    /api/settings/accompat
function save_accompat (req, res) {
    const filePath = getFilePath('accompat')
    const accompat = req.body
    fs.writeFile(filePath, JSON.stringify(accompat), 'utf8', () => {
        res.json(requireUncached(filePath))
    })
}

// - GET  	/api/settings/accompat
function get_accompat (req, res) {
    const filePath = getFilePath('accompat')
    if (!fs.existsSync(filePath)) {
        createFile(filePath)
        res.json({})
    }
    res.json(requireUncached(filePath))
}

// - GET  	/api/settings/role-settings
function get_role_settings (req, res) {
    const filePath = getFilePath('roles')
    if (!fs.existsSync(filePath)) {
        createFile(filePath)
        res.json({})
    }
    res.json(requireUncached(filePath))
}

// - POST    /api/settings/role-settings
function save_role_settings (req, res) {
    const filePath = getFilePath('roles')
    const obj = req.body
    fs.writeFile(filePath, JSON.stringify(obj), 'utf8', () => {
        res.json(requireUncached(filePath))
    })
}

// - GET  	/api/settings/leg-visibility
function get_leg_visbility (req, res) {
    const filePath = getFilePath('leg-visbility')
    if (!fs.existsSync(filePath)) {
        createFile(filePath)
        res.json({})
    }
    res.json(requireUncached(filePath))
}

// - POST    /api/settings/leg-visibility
function save_leg_visbility (req, res) {
    const filePath = getFilePath('leg-visbility')
    const obj = req.body
    fs.writeFile(filePath, JSON.stringify(obj), 'utf8', () => {
        res.json(requireUncached(filePath))
    })
}

// - GET  	/api/settings/
function get_settings (req, res) {
    const filePath = getFilePath('settings')
    if (!fs.existsSync(filePath)) {
        createFile(filePath)
        res.json({})
        return
    }
    res.json(requireUncached(filePath))
}

// - GET /api/ignored-oustations
function get_outstations (req, res) {
    const filePath = getFilePath('ignored-outstations')
    if (!fs.existsSync(filePath)) {
        createFile(filePath)
        res.json({})
        return
    }
    res.json(requireUncached(filePath))
}

// - POST  /api/ignored-oustations
function save_ignored_oustations (req, res) {
    const filePath = getFilePath('ignored-outstations')
    const obj = req.body
    fs.writeFile(filePath, JSON.stringify(obj), 'utf8', () => {
        res.json(requireUncached(filePath))
    })
}

// - GET /api/duration-config
function get_duration_config (req, res) {
    const filePath = getFilePath('duration-config')
    if (!fs.existsSync(filePath)) {
        createFile(filePath)
        res.json({})
        return
    }
    res.json(requireUncached(filePath))
}

// - POST  /api/duration-config
function save_duration_config (req, res) {
    const filePath = getFilePath('duration-config')
    const obj = req.body
    fs.writeFile(filePath, JSON.stringify(obj), 'utf8', () => {
        res.json(requireUncached(filePath))
    })
}

// - GET /api/date-format-settings
function get_date_format_settings (req, res) {
    const filePath = getFilePath('date-format')
    if (!fs.existsSync(filePath)) {
        createFile(filePath)
        res.json({})
        return
    }
    res.json(requireUncached(filePath))
}

// - POST  /api/date-format-settings
function save_date_format_settings (req, res) {
    const filePath = getFilePath('date-format')
    const obj = req.body
    fs.writeFile(filePath, JSON.stringify(obj), 'utf8', () => {
        res.json(requireUncached(filePath))
    })
}

module.exports = {
    get_settings,
    get_accompat,
    save_accompat,
    get_role_settings,
    save_role_settings,
    get_leg_visbility,
    save_leg_visbility,
    get_outstations,
    save_ignored_oustations,
    get_duration_config,
    save_duration_config,
    get_date_format_settings,
    save_date_format_settings
}