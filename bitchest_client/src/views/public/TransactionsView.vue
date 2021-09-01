<template>
  <main>
    <Navigation />
    <Loader :isLoading="isLoading" />
    <div v-if="transactions.length">
      <h1>Historique des transactions :</h1>
      <TransactionsTable :transactions="transactions" />
    </div>
  </main>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import TransactionsService from "../../services/transactions/transactions.service";
import LocalStorageService from "../../services/localStorage/localStorage.service";
import TransactionsTable from "../../components/public/TransactionsTable.vue";
import Loader from "../../components/shared/Loader.vue";

export default {
  name: "TransactionsView",
  components: { Navigation, TransactionsTable, Loader },
  data() {
    return {
      transactions: [],
      isLoading: false,
    };
  },
  mounted() {
    const userData = LocalStorageService.getUserLocalStorage();
    this.isLoading = true;
    TransactionsService.getUserTransactions(userData.id)
      .then((response) => {
        this.transactions = response.data.reverse();
        this.isLoading = false;
        console.log('Transactions', this.transactions);
      })
      .catch((error) => {
        this.isLoading = false;
        console.error(error);
      });
  },
};
</script>

<style scoped>
div {
  width: 80%;
  margin: 0 auto;
}

h1 {
  text-align: left;
  margin-bottom: 50px;
}
</style>