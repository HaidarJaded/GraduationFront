import {Notify, checkExpires} from "/utils"

import {authServices} from "/Routes";
import Cookies from "js-cookie";

    export function responseErrorHandlers(response) {

    console.log(response?.data?.data)
    switch (response?.status) {
        case 400:
            Notify("colored", `${response?.data?.message}`, "error")
            break;
        case 401:
        case 403:
            Notify("colored", `${response?.data?.message}`, "error")
            setTimeout(function () {
                  history.back()
                  window.location.href = ''
                Cookies.remove('auth-token');
            })
            break;
        case 404:
            Notify("colored", `Not Found`, "error")

            break;
        case 422 :

            Object.keys(response?.data?.errors).forEach((key) => {
                Notify("colored", `${response?.data?.errors[key][0]}`, "error")
            })
            break;
        case 500:
        case 501:
        case 503:
            Notify("colored", `Server Error`, "error")
            console.log(response)
            break;
        default :
            return response
    }
}




