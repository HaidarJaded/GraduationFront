export function checkUser() {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('user')) {
            return localStorage.getItem('user')
        } else {
            return null
        }
    }
}