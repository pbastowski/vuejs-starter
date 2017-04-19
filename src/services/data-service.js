import axios from 'axios'
import BusySpinner from '../common/components/busy-spinner.vue'

export const http = axios
export const httpSpinner = axios.create()

httpSpinner.interceptors.request.use(
    config => {
        BusySpinner.show()
        return config
    },
    error => {
        BusySpinner.hide()
        return Promise.reject(error)
    }
)

httpSpinner.interceptors.response.use(
    response => {
        BusySpinner.hide()
        return response
    },
    error => {
        BusySpinner.hide()
        return Promise.reject(error)
    }
)