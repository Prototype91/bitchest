export default {
    // Returns all the sorted user's crypto currencies
    sortUserCryptoCurrencies(transactions) {
        return Array.from(
            transactions.filter(transaction => transaction.type === 1 && !transaction.sold).reduce(
                (total, { name, currency_value }) => total.set(
                    name,
                    (total.get(name) || 0) + Number(currency_value),
                ),
                new Map()
            ),
            ([name, currency_value]) => ({ name, currency_value })
        );
    },

    // Returns the bought values of cryptocurrencies
    getBoughtAmount(transactions) {
        return Array.from(
            transactions.filter(transaction => transaction.type === 1 && !transaction.sold).reduce(
                (total, { name, amount }) => total.set(
                    name,
                    (total.get(name) || 0) + Number(amount),
                ),
                new Map()
            ),
            ([name, amount]) => ({ name, amount })
        );
    }
};