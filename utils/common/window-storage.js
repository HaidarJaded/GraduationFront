function getAllData() {
    if (typeof window !== "undefined") {
        return JSON.parse(window.localStorage.getItem("data"))
    }
}

function setDataLogin(data) {
    const permissions = data.profile.permissions
    const profile = data.profile

    function set() {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("data", JSON.stringify(data))
            window.localStorage.setItem("permissions", JSON.stringify(permissions))
            window.localStorage.setItem("profile", JSON.stringify(profile))
        }
    }
    set()
}

function get(key) {
    if (typeof window !== "undefined") {
        return JSON.parse(window.localStorage.getItem(key))
    }
}

function set(key, value) {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value))
    }
}

function clearStorage() {
    if (typeof window !== "undefined") {
        window.localStorage.clear()
    }
}

function removeItem(key) {
    if (typeof window !== "undefined") {
        window.localStorage.removeItem(key)
    }
}

export const WindowStorage = {
    getAllData,
    setDataLogin,
    get,
    set,
    clearStorage,
    removeItem
}