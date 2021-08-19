import axios from "axios";

let server = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

let Api = () => {
    let dataToGet = sessionStorage.getItem("token");

    let sessionStorageData = JSON.parse(dataToGet);

    if (sessionStorageData?.token) {
        server.defaults.headers.common["Authorization"] = `Bearer ${sessionStorageData.token}`;
    }

    return server;
};

export default Api;