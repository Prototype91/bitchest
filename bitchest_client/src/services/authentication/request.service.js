import axios from "axios";

let server = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 1000
});

let Api = () => {
    let token = sessionStorage.getItem("token");

    if (token) {
        server.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return server;
};

export default Api;