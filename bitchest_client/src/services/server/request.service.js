import axios from "axios";
import localStorageService from '../localStorage/localStorage.service';

let server = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

let Api = () => {
    let localStorageData = localStorageService.getUserLocalStorage();

    // If we have a token, we inject it into the header
    if (localStorageData?.token) {
        server.defaults.headers.common["Authorization"] = `Bearer ${localStorageData.token}`;
    }

    return server;
};

export default Api;