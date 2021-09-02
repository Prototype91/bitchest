import localStorageService from "../localStorage/localStorage.service";

export default {
    // Return On Invesment
    getReturnOnInvest(cryptoCurrencyName, boughtValue, currencyValue) {
        const cryptoCurrencies =
            localStorageService.getCryptoCurrenciesLocalStorage();

        const cryptoCurrencyData = cryptoCurrencies.find(
            (cryptoCurrency) => cryptoCurrency.id === cryptoCurrencyName
        );

        const returnOnInvest =
            (cryptoCurrencyData.current_price -
                boughtValue / Number(currencyValue)) *
            Number(currencyValue);

        return returnOnInvest >= 0 ? `+${returnOnInvest.toFixed(2)}` : returnOnInvest.toFixed(2);
    },

    // Returns all the sorted user's crypto currencies
    sortUserCryptoCurrencies(transactions) {
        return Array.from(
            transactions.reduce(
              (map, { name, currency_value }) => map.set(name, (map.get(name) || 0) + Number(currency_value)),
              new Map()
            ),
            ([name, currency_value]) => ({ name, currency_value })
          );
    }
};