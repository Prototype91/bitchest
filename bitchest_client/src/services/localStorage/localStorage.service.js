export default {
    getLocalStorage() {
        let dataToGet = localStorage.getItem("token");
        return JSON.parse(dataToGet);
    },

    setLocalStorage(data) {
        const localStorageData = JSON.stringify(data);
        window.localStorage.setItem("token", localStorageData);
    }
}