const fs = require('fs')
const dir = require('node-dir')

const createFile = require('./util').createFile
const requireUncached = require('./util').requireUncached
const createUUID = require('./util').createUUID

const dirName = `${__dirname}/db/scenarios`

function save_scenario (req, res) {

    console.time('save_scenario')

    let scenarioId = req.params.id

    let scenario = req.body
    let scenarioFilePath = `${__dirname}/db/scenarios`

    if (!scenario) {
        return res.sendStatus(403)
    }

    dir.paths(`${dirName}`, true, (err, paths) => {
        if (err) throw err

        // calculate a new incremented ID
        if (!scenarioId) {
            let highestId = 0
            // loop through filename to find the highest id
            paths.forEach(path => {
                // split the url of the filepath
                const splitPath = path.split('/')
                // get the last part of the url and remove the .json extension
                const id = parseInt(splitPath[splitPath.length - 1].replace('.json', ''))
                if (id > highestId) {
                    highestId = id
                }
            })
            // increment id
            scenario.status.scenarioCreated = new Date()
            scenario.status.paused = true
            scenario.id = highestId + 1

            scenario.rotations = generateIndexesForRotationsAndSolutions(scenario.rotations)
        }

        // save scenario to index file first
        saveScenarioToIndex(scenario, (scenarioSummary) => {
            // create or overwrite actual scenario file
            createFile(`${scenarioFilePath}/${scenario.id}.json`, scenario, () => {
                const sc = requireUncached(`${scenarioFilePath}/${scenario.id}.json`)
                console.timeEnd('save_scenario')
                return res.json(scenario)
            })

        })

    })
}

function save_priority_for_solution (req, res) {

    const scenarioId = parseInt(req.params.scId)
    const solutionId = parseInt(req.params.sId)
    const rotationId = parseInt(req.params.rId)
    const {prio, dept} = req.body
    const filePath = `${dirName}/${scenarioId}.json`
    const scenario = requireUncached(filePath)

    const rIndex = scenario.rotations.findIndex(r => {
        return r.id === rotationId
    })

    const sIndex = scenario.rotations[rIndex].solutions.findIndex(s => s.id === solutionId)
    scenario.rotations[rIndex].solutions[sIndex].priorities[dept] = prio

    console.log('setting > ', scenarioId, rotationId, rIndex, solutionId, sIndex, dept, prio)

    createFile(`${filePath}`, scenario, () => {
        return res.json({sId: scenario.id, sol: scenario.rotations[rIndex].solutions})
    })
}

function generateIndexesForRotationsAndSolutions (rotations) {
    let id = 0
    rotations.forEach((rotation, index) => {
        rotations[index].id = ++id
        if (rotations[index].solutions) {
            rotations[index].solutions.forEach((sol, solIndex) => {
                rotations[index].solutions[solIndex].id = ++id
            })
        }
    })
    return rotations
}

function get_scenario (req, res) {
    const scenarioId = req.params.id
    if (!fs.existsSync(`${dirName}/${scenarioId}.json`)) {
        return res.sendStatus(404)
    }
    return res.json(requireUncached(`${dirName}/${scenarioId}.json`))
}

function get_rotations (req, res) {
    const scenarioId = parseInt(req.params.id)
    const rId = parseInt(req.params.rId)

    if (!fs.existsSync(`${dirName}/${scenarioId}.json`)) {
        return res.sendStatus(404)
    }
    let sc = (requireUncached(`${dirName}/${scenarioId}.json`))
    return res.json(sc.disturbedRotations.filter(r => r.id === (rId)))
}

function get_scenario_status (req, res) {
    const scenarioId = req.params.id
    if (!fs.existsSync(`${dirName}/${scenarioId}.json`)) {
        return res.sendStatus(404)
    }
    const sc = requireUncached(`${dirName}/${scenarioId}.json`)
    const status = {status: sc.status, settings: {durations: sc.settings.durations}}
    return res.json(status)
}

function get_scenarios (req, res) {
    console.time('get_scenarios')
    const filePath = `${__dirname}/db/scenario-index.json`
    console.timeEnd('get_scenarios')
    return res.json(requireUncached(filePath))
}

function saveScenarioToIndex (scenario, cb) {

    const filePath = `${__dirname}/db/scenario-index.json`
    const scenarioSummaries = requireUncached(filePath)

    const scenarioSummary = {
        id: scenario.id,
        legsToCancel: {
            inbound: scenario.legsToCancel.inbound,
            outbound: scenario.legsToCancel.outbound
        },
        repairPeriods: {
            dep: {
                startDate: scenario.repairPeriods.dep.startDate,
                endDate: scenario.repairPeriods.dep.endDate,
            },
            arr: {
                startDate: scenario.repairPeriods.arr.startDate,
                endDate: scenario.repairPeriods.arr.endDate,
            }
        },
        status: scenario.status,
        remarks: scenario.remarks
    }

    const scIndex = scenarioSummaries.findIndex(s => parseInt(s.id) === parseInt(scenario.id))
    // update existing scenario
    if (scIndex > -1) {
        scenarioSummaries[scIndex] = scenarioSummary
    } else {
        // insert new scenario
        scenarioSummaries.push(scenarioSummary)
    }

    // recreate scenarioSummaries
    createFile(filePath, scenarioSummaries, () => cb(scenarioSummary))
}

function removeScenarioFromIndex (scenarioId, cb) {
    const filePath = `${__dirname}/db/scenario-index.json`
    const scenarioSummaries = requireUncached(filePath)
    console.log('scenario id is ', scenarioId)
    const scIndex = scenarioSummaries.findIndex(s => parseInt(s.id) === parseInt(scenarioId))
    console.log('removing index', scIndex)
    scenarioSummaries.splice(scIndex, 1)
    createFile(filePath, scenarioSummaries, () => cb())
}

function deleteScenario (req, res) {
    const scenarioId = req.params.id
    const scenarioFilePath = `${dirName}/${scenarioId}.json`
    if (!fs.existsSync(scenarioFilePath)) {
        return res.sendStatus(404)
    }
    removeScenarioFromIndex(scenarioId, () => {
        fs.unlinkSync(scenarioFilePath)
        return res.sendStatus(200)
    })
}

function rebuildScenarioIndexFile (req, res) {
    const filePath = `${__dirname}/db/scenario-index.json`
    const scenarioSummaries = []

    dir.readFiles(`${__dirname}/db/scenarios`,
        (err, data, next) => {
            if (err) throw err

            const scenario = JSON.parse(data)

            const scenarioSummary = {
                id: scenario.id,
                legsToCancel: {
                    inbound: scenario.legsToCancel.inbound,
                    outbound: scenario.legsToCancel.outbound
                },
                repairPeriods: {
                    dep: {
                        startDate: scenario.repairPeriods.dep.startDate,
                        endDate: scenario.repairPeriods.dep.endDate,
                    },
                    arr: {
                        startDate: scenario.repairPeriods.arr.startDate,
                        endDate: scenario.repairPeriods.arr.endDate,
                    }
                },
                status: scenario.status,
                remarks: scenario.remarks
            }

            scenarioSummaries.push(scenarioSummary)
            next()
        },
        (err, files) => {
            if (err) throw err

            createFile(filePath, scenarioSummaries, () => {
                return res.json({msg: 'OK!'})
            })
        })
}

module.exports = {
    save_scenario,
    get_scenario,
    get_scenarios,
    deleteScenario,
    rebuildScenarioIndexFile,
    get_scenario_status,
    save_priority_for_solution,
    get_rotations
}