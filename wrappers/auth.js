import { Notify } from "/utils";

import Cookies from "js-cookie";

export function responseErrorHandlers(response) {
    const { status, data } = response || {};

    const handleClientError = (message) => {
        Notify("colored", message, "error");
    };

    const handleServerError = (message, logResponse = false) => {
        Notify("colored", message, "error");
        if (logResponse) {
            console.error("Server Error:", response);
        }
    };
    switch (status) {
        case 400:
            handleClientError(data?.message || "Bad Request");

            break;
        case 401:
            handleClientError(data?.message + 'Please log in again' || "Unauthenticated");

            setTimeout(() => {
                // history.back();
                window.location.href = "/auth/login";
                Cookies.remove("auth-token");
                localStorage.removeItem("profile");
            }, 1000);
        case 403:
            handleClientError(data?.message + 'Please log in again' || "Unauthorized");
            setTimeout(() => {
                //   history.back();
                window.location.href = "/auth/login";
                Cookies.remove("auth-token");
                localStorage.removeItem("profile");
            }, 1000);
            break;
        case 404:
            handleClientError("Not Found");
            break;
        case 422:
            console.log(response?.data)
            // Object.keys(response?.data?.errors).forEach((key) => {
            //     Notify("colored", `${response?.data?.errors[key][0]}`, "error");
            // });
            Notify("colored", `${response?.data.message}`, "error");

            break;
        case 500:
        case 501:
        case 503:
            handleServerError("Server Error", true);
            break;
        default:
            return response;
    }
}
