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
    }
}