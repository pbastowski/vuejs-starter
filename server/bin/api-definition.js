const adminApi = require('./admin-api')
const flightdataApi = require('./flightdata-api')
const scenarioApi = require('./scenario-api')
const userApi = require('./user-api')

module.exports = function (app) {

    app.get(['/api/flightdata', '/api/flightdata/:rows'], flightdataApi.get_flightdata)

    app.get('/api/user/details', userApi.get_user_details)

    app.get('/api/settings/date-format-settings', adminApi.get_date_format_settings)
    app.post('/api/settings/date-format-settings', adminApi.save_date_format_settings)

    app.get('/api/settings/ignored-outstations', adminApi.get_outstations)
    app.post('/api/settings/ignored-outstations', adminApi.save_ignored_oustations)

    app.get('/api/settings/duration-config', adminApi.get_duration_config)
    app.post('/api/settings/duration-config', adminApi.save_duration_config)

    app.get('/api/settings/accompat', adminApi.get_accompat)
    app.post('/api/settings/accompat', adminApi.save_accompat)

    app.post('/api/settings/role-settings', adminApi.save_role_settings)
    app.get('/api/settings/role-settings', adminApi.get_role_settings)

    app.get('/api/scenarios/rebuild', scenarioApi.rebuildScenarioIndexFile)

    app.get('/api/scenarios', scenarioApi.get_scenarios)
    app.get('/api/scenarios/:id/status', scenarioApi.get_scenario_status)
    app.get('/api/scenarios/:id', scenarioApi.get_scenario)
    app.get('/api/scenarios/:id/rotations/:rId', scenarioApi.get_rotations)
    app.post('/api/scenarios', scenarioApi.save_scenario)
    app.post('/api/scenarios/:id', scenarioApi.save_scenario)
    app.post('/api/scenarios/:id/status', scenarioApi.save_scenario)
    app.delete('/api/scenarios/:id', scenarioApi.deleteScenario)

    app.post('/api/scenarios/:scId/rotations/:rId/solutions/:sId', scenarioApi.save_priority_for_solution)


}
