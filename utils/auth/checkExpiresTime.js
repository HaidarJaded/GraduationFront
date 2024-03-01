import {WindowStorage} from "../common"

export const checkExpires = {
    checkAccessExpires,
    checkRefreshExpires
}

function checkAccessExpires() {
    if (typeof window !== 'undefined') {
        const today = new Date().toUTCString()
        const access_expires_at = WindowStorage.get("data")?.access_expires_at

        if (access_expires_at) {
            const access_expires_at_Date = new Date(access_expires_at).toUTCString()
            const numberOfDays = new Date(access_expires_at_Date) - new Date(today)
            return numberOfDays
        }
        return 0
    }
}

function checkRefreshExpires() {
    if (typeof window !== 'undefined') {
        const today = new Date().toUTCString()
        const refresh_expires_at = WindowStorage.get("data")?.refresh_expires_at
        if (refresh_expires_at) {
            const refresh_expires_at_Date = new Date(refresh_expires_at).toUTCString()
            const numberOfDays = new Date(refresh_expires_at_Date) - new Date(today)

            return numberOfDays
        }
        return 0

    }
}
