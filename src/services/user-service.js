import {httpSpinner} from "./data-service";

export function getUserDetails () {
    return httpSpinner.get('/api/user/details')
        .catch(err => {
            console.log('oops something went wrong', err)
            return Promise.reject(err)
        })
        .then(({data}) => {
            if (data.roles.ADMIN) {
                Object.keys(data.roles).forEach((key, index) => data.roles[key] = true)
            }
            data.view_role = getDefaultViewRole(data.roles, data.view_role)
            return data
        })
}

/**
 * if no view role is selected take first active one ( it will take admin or dmo first because of the order ).
 * @returns {string}
 */
export function getDefaultViewRole (roles) {
    return roles.ADMIN ?
        'ADMIN'
        : Object.keys(roles).slice(-1)
}