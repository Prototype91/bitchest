export default {
    setUserLocalStorage(data) {
        const localStorageData = JSON.stringify(data);
        window.localStorage.setItem("user", localStorageData);
    },
    
    getUserLocalStorage() {
        let dataToGet = localStorage.getItem("user");
        return JSON.parse(dataToGet);
    },

    setCryptoCurrenciesLocalStorage(data) {
        const localStorageData = JSON.stringify(data);
        window.localStorage.setItem("cryptoCurrencies", localStorageData);
    },

    getCryptoCurrenciesLocalStorage() {
        let dataToGet = localStorage.getItem("cryptoCurrencies");
        return JSON.parse(dataToGet);
    }
}