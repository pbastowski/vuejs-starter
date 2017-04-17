var axios = require('axios')
var csv = require('csvtojson')

const FILE_NAME = "http://mvsdsa.ces.klm.nl/'EE20.ACC.FST.MZFST01A.KLMREAD.FSTINPUT.CSV'"

module.exports = {
    get_flightdata
}


function get_flightdata (req, res) {

    axios.get(FILE_NAME)

        .catch(er => {
            console.error(`ERROR getting flight data file "${FILE_NAME}"\n`, er)
            res.setHeader('Content-Type', 'text/html')
            res.write(`ERROR getting flight data file "${FILE_NAME}":\n` + JSON.stringify(er))
            res.end()
        })

        .then(rawdata => {

            csv()
                .fromString(rawdata.data)
                .on('end_parsed', json => {
                    let rows = req.params.rows || 9999

                    res.json(json.slice(0, rows))
                })

        })

}
