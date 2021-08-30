export default {
    getSessionStorage() {
        let dataToGet = sessionStorage.getItem("token");
        return JSON.parse(dataToGet);
    },

    setSessionStorage(data) {
        const sessionStorageData = JSON.stringify(data);
        sessionStorage.setItem("token", sessionStorageData);
    }
}