import moment from 'moment';

export default {
    // Function to map the response
    mapCryptoCurrencies(response) {
        let cryptoCurrencies = [];
        for (let i = 0; i < response.length; i++) {
            let cryptoData = response[i].data[0];
            cryptoCurrencies.push(cryptoData)
        }
        // Returns a mapped array of all the cryptocurrencies
        return cryptoCurrencies;
    },

    mapUserCryptoCurrencies(userCryptoCurrencies, cryptoCurrencies) {
        let result = userCryptoCurrencies.filter(currency => currency.currency_value > 0);
        for (let i = 0; i < result.length; i++) {
            const currencyData = cryptoCurrencies.filter(
                (currency) => currency.id === result[i].name
            );
            result[i].amount =
                result[i].currency_value *
                currencyData[0].current_price;
            result[i].image = currencyData[0].image;
            result[i].symbol = currencyData[0].symbol;
        }

        return result;
    },

    mapCryptoCurrencyHistory(response) {
        const thirtyDaysValues = response.data.prices;

        let mappedValues = {};

        for (let i = 0; i < thirtyDaysValues.length; i++) {
            const price = Number(thirtyDaysValues[i][1]);
            const unixTime = thirtyDaysValues[i][0];
            const finalTime = moment.unix(unixTime / 1000).format("YYYY-MM-DD");
            mappedValues = { ...mappedValues, [finalTime]: price };
        }

        return mappedValues;
    }
};