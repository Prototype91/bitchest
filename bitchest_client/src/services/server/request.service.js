import axios from "axios";
import SessionStorageService from '../sessionStorage/sessionStorage.service';

let server = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

let Api = () => {
    let sessionStorageData = SessionStorageService.getSessionStorage();

    if (sessionStorageData?.token) {
        server.defaults.headers.common["Authorization"] = `Bearer ${sessionStorageData.token}`;
    }

    return server;
};

export default Api;