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

    mapCryptoCurrencyHistory(response) {
        const thirtyDaysValues = response.data.prices;

        let mappedValues = {};

        for (let i = 0; i < thirtyDaysValues.length; i++) {
            const price = Number(thirtyDaysValues[i][1]);
            const unixTime = thirtyDaysValues[i][0];
            const finalTime = moment.unix(unixTime / 1000).format("YYYY-MM-DD");
            mappedValues = { ...mappedValues, [finalTime]: price.toFixed(2) };
        }

        console.log(mappedValues);

        return mappedValues;
    }
}