import {toast} from "react-toastify";



function Notify(theme, message, type) {
    const notifyOption = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: `${theme}`,
    }
    const notify = () => {
        switch (type) {
            case "success":
                toast.success(`${message}`, notifyOption)
                break;
            case "warning":
                toast.warning(`${message}`, notifyOption)
                break;
            case "info":
                toast.info(`${message}`, notifyOption)
                break;
            case "error":
                toast.error(`${message}`, notifyOption)
                break;
            default :
                toast(`${message}`, notifyOption)
                break;
        }
    };

    return notify()
}

export {Notify}