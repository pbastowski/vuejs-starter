// const adminApi = require('./admin-api')
const userApi = require('./user-api')

module.exports = function (app) {

    app.get('/api/user/details', userApi.get_user_details)

    // app.get('/api/settings/date-format-settings', adminApi.get_date_format_settings)
    // app.post('/api/settings/date-format-settings', adminApi.save_date_format_settings)
    //
    // app.get('/api/settings/ignored-outstations', adminApi.get_outstations)
    // app.post('/api/settings/ignored-outstations', adminApi.save_ignored_oustations)
    //
    // app.get('/api/settings/duration-config', adminApi.get_duration_config)
    // app.post('/api/settings/duration-config', adminApi.save_duration_config)
    //
    // app.get('/api/settings/accompat', adminApi.get_accompat)
    // app.post('/api/settings/accompat', adminApi.save_accompat)
    //
    // app.post('/api/settings/role-settings', adminApi.save_role_settings)
    // app.get('/api/settings/role-settings', adminApi.get_role_settings)

}
