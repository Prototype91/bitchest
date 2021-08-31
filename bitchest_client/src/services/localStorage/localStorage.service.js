export default {
    // Local Storage for User Data
    setUserLocalStorage(data) {
        const localStorageData = JSON.stringify(data);
        window.localStorage.setItem("user", localStorageData);
    },

    getUserLocalStorage() {
        let dataToGet = localStorage.getItem("user");
        return JSON.parse(dataToGet);
    },

    // Local Storage for Cryptocurrencies
    setCryptoCurrenciesLocalStorage(data) {
        const localStorageData = JSON.stringify(data);
        window.localStorage.setItem("cryptoCurrencies", localStorageData);
    },

    getCryptoCurrenciesLocalStorage() {
        let dataToGet = localStorage.getItem("cryptoCurrencies");
        return JSON.parse(dataToGet);
    },

    // Clears all the Local Storage
    clearLocalStorage() {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("cryptoCurrencies");
    }
}