export function newDate (str) {
    if (typeof str === 'string') str = str.replace(/-/g, '/')
    return new Date(str)
}

export function formatDate (r = '') {
    if (typeof r === 'object') return r  // it's already been converted before

    if (!r || r === ' ') throw new TypeError('It\'s invalid to pass an empty date.')

    let greatDate = r  // Assume the passed in date is already in the new date format
    let [date, time] = r.split(' ')

    /**
     * Two date formats exist now
     *   new: "2017-02-09 16:30:00" (already valid format)
     *   old: "09/11/16 03:55"  (needs to be converted to a valid format)
     */
    if (date.length === 8) {
        let [d, m, y] = date.split('/')
        greatDate = `20${y}/${m}/${d} ${time}`
    }

    // Dates from the flightdata file are by default in the GMT+1 timezone,
    // but do not have the indicator appended to them properly. So, we add it.
    if (greatDate.length === 19) greatDate += '+1'

    // For internet explorer the date parts must be separated with "/' not "-"
    greatDate = greatDate.replace(/-/g, '/')

    let formattedDate = newDate(greatDate)
    if (formattedDate == 'Invalid Date') {
        console.log('passed in date was', r, greatDate)
        throw new TypeError(`Invalid date: |${greatDate}|`)
    }

    return formattedDate ? formattedDate : ''
}

export function daysBetween (now, other) {
    let dif = other.getDate() - now.getDate()
    if (dif > 14) dif = dif - (new Date(now.getFullYear(), now.getMonth() + 1, 0)).getDate()
    if (dif < -13) dif = dif + (new Date(now.getFullYear(), now.getMonth() + 1, 0)).getDate()
    return dif
}

/**
 * Calculates the difference in minutes between two dates
 * @param start The early date
 * @param end The later date
 */
export function calcDiffMinutes (start, end) {
    const x = moment(start)
    const y = moment(end)
    return moment.duration(y.diff(x)).asMinutes()
}