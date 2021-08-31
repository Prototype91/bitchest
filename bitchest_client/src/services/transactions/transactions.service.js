import Api from "../server/request.service";
export default {
    getAllTransactions() {
        return Api().get("/transactions");
    },

    addNewTransaction(transaction) {
        return Api().post("/transactions", transaction);
    },
};