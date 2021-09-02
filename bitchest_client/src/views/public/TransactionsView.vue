<template>
  <main>
    <Navigation />
    <Loader :isLoading="isLoading" />
    <Balance :balance="balance" />
    <div v-if="transactions.length">
      <h1>Historique des transactions :</h1>
      <TransactionsTable :transactions="transactions" />
    </div>
  </main>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import transactionsService from "../../services/transactions/transactions.service";
import TransactionsTable from "../../components/public/TransactionsTable.vue";
import Loader from "../../components/shared/Loader.vue";
import Balance from "../../components/public/Balance.vue";
import usersService from '../../services/users/users.service';
import localStorageService from '../../services/localStorage/localStorage.service';

export default {
  name: "TransactionsView",
  components: { Navigation, TransactionsTable, Loader, Balance },
  data() {
    return {
      transactions: [],
      isLoading: false,
      balance: 0,
      userData: {}
    };
  },
  mounted() {
    const userId = localStorageService.getUserLocalStorage().id;
    usersService.getUser(userId).then(response => {
      this.userData = response.data;
      this.balance = response.data.balance;
    });
    this.isLoading = true;
    transactionsService.getUserTransactions(userId)
      .then((response) => {
        this.transactions = response.data.reverse();
        this.isLoading = false;
        console.log("Transactions", this.transactions);
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

main {
  display: block;
}

h1 {
  text-align: left;
  margin-bottom: 50px;
}
</style>