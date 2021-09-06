import Api from "../server/request.service";
export default {
    // Returns all the transactions of a specific user
    getUserTransactions(id) {
        return Api().get(`/transactions/user/${id}`);
    },

    // Returns all the currencies that you can buy
    getCurrencies() {
        return Api().get('/currencies');
    },

    // Update the sold status of the currency
    updateTransactions(name) {
        return Api().put(`/transactions/${name}`);
    },

    // Adds a new Transaction
    addNewUserTransaction(data) {
        return Api().post(`/transactions`, data);
    }
};