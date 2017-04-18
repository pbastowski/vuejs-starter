// * "phase" can be one of the below values in the ordered sequence shown:
//     *   1) NEW (create-scenario)
// *   2) PREPARATION
// *   3) PRIORITISATION
// *   4) ASSIGNMENT (actual cancelling flights)
// *   5) FINISHED (done, completed, kaput, fin)
export const NEW = 'NEW'
export const PREPARATION = 'PREPARATION'
export const PRIORITISATION = 'PRIORITISATION'
export const ASSIGNMENT = 'ASSIGNMENT'
export const FINISHED = 'FINISHED'
export const ABORTED = 'ABORTED'

export default {
    NEW,
    PREPARATION,
    PRIORITISATION,
    ASSIGNMENT,
    FINISHED,
    ABORTED
}
