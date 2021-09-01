import LocalStorageService from "../localStorage/localStorage.service";

export default {
    // Return On Invesment
    getReturnOnInvest(cryptoCurrencyName, boughtValue, currencyValue) {
        const cryptoCurrencies =
            LocalStorageService.getCryptoCurrenciesLocalStorage();

        const cryptoCurrencyData = cryptoCurrencies.find(
            (cryptoCurrency) => cryptoCurrency.id === cryptoCurrencyName
        );

        const returnOnInvest =
            (cryptoCurrencyData.current_price -
                boughtValue / Number(currencyValue)) *
            Number(currencyValue);

        return returnOnInvest >= 0 ? `+${returnOnInvest.toFixed(2)}` : returnOnInvest.toFixed(2);
    },
};