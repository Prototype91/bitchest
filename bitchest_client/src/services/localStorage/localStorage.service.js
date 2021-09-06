export default {
    // Local Storage for User Data
    setUserLocalStorage(data) {
        const localStorageData = JSON.stringify(data);
        window.localStorage.setItem("user", localStorageData);
    },

    getUserLocalStorage() {
        let dataToGet = window.localStorage.getItem("user");
        return JSON.parse(dataToGet);
    },

    // Local Storage for the wanted currency when you want to buy it
    setWantedCurrencyLocalStorage(currency) {
        window.localStorage.setItem("wanted-currency", currency);
    },

    getWantedCurrencyLocalStorage() {
        return window.localStorage.getItem("wanted-currency");
    },

    // Local Storage for the DB currencies
    setDataBaseCurrenciesLocalStorage(data) {
        const localStorageData = JSON.stringify(data);
        window.localStorage.setItem("dataBaseCurrencies", localStorageData);
    },

    getDataBaseCurrenciesLocalStorage() {
        let dataToGet = window.localStorage.getItem("dataBaseCurrencies");
        return JSON.parse(dataToGet).currencies;
    },

    // Local Storage for Cryptocurrencies
    setCryptoCurrenciesLocalStorage(data) {
        const localStorageData = JSON.stringify(data);
        window.localStorage.setItem("cryptoCurrencies", localStorageData);
    },

    getCryptoCurrenciesLocalStorage() {
        let dataToGet = window.localStorage.getItem("cryptoCurrencies");
        return JSON.parse(dataToGet);
    },

    // Clears all the Local Storage
    clearLocalStorage() {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("cryptoCurrencies");
        window.localStorage.removeItem("dataBaseCurrencies");
    }
};