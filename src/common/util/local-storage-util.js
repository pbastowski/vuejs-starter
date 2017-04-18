const localStorageKey = 'activeScenarioId'

export function activeScenarioExistsInLocalStorage () {
    return window.localStorage.getItem(localStorageKey) > 0
}

export function getActiveScenarioId () {
    return window.localStorage.getItem(localStorageKey) || 0
}

export function setActiveScenarioIdInLocalStorage (activeScenarioId) {
    activeScenarioId && window.localStorage.setItem(localStorageKey, activeScenarioId)
}