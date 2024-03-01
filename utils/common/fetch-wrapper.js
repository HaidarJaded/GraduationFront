import axios from "axios";

export const fetchWrapper = {
    get,
    post,
    put,
    deleteApi
};


async function get(url, header , params) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: header,
        params : params
    };
    return await axios.get(url, requestOptions).then(response => response);
}

async function post(url, body, header = {}) {
    return await axios.post(url, body, {
        headers: header
    }).then(response => response);
}

async function put(url, body, header = {}) {

    return await axios.put(url, body, {
        headers: header
    }).then(response => response);
}

async function deleteApi(url, header) {
    return await axios.delete(url, {
        headers: header
    }).then(response => response);
}





