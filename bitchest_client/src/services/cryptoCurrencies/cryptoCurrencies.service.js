import axios from "axios";

export default {
    getCryptoCurrencies() {
        // Base URL
        const baseUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=';

        // End URL
        const endUrl = '&order=market_cap_desc&per_page=10&page=1&sparkline=true';

        // Returns all the cryptocurrencies needed
        return axios.all([
            axios.get(`${baseUrl}ethereum${endUrl}`),
            axios.get(`${baseUrl}ripple${endUrl}`),
            axios.get(`${baseUrl}iota${endUrl}`),
            axios.get(`${baseUrl}cardano${endUrl}`),
            axios.get(`${baseUrl}stellar${endUrl}`),
            axios.get(`${baseUrl}bitcoin-cash${endUrl}`),
            axios.get(`${baseUrl}nem${endUrl}`),
            axios.get(`${baseUrl}bitcoin${endUrl}`),
            axios.get(`${baseUrl}litecoin${endUrl}`),
            axios.get(`${baseUrl}dash${endUrl}`)
        ]);
    },
    
    getHistoricalCoinValues(cryptoCurrency) {
        // Base URL
        const baseUrl = 'https://api.coingecko.com/api/v3/coins/';

        // End URL
        const endUrl = '/market_chart?vs_currency=eur&days=30&interval=daily';

        // Returns the cryptocurrency historical values for 30 days
        return axios.get(`${baseUrl}${cryptoCurrency}${endUrl}`);
    }
}