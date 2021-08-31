import axios from "axios";
import LocalStorageService from '../localStorage/localStorage.service';

let server = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

let Api = () => {
    let localStorageData = LocalStorageService.getLocalStorage();

    if (localStorageData?.token) {
        server.defaults.headers.common["Authorization"] = `Bearer ${localStorageData.token}`;
    }

    return server;
};

export default Api;