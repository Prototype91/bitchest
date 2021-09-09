<template>
  <main>
    <Navigation />
    <Loader :isLoading="isLoading" />
    <div>
      <div class="title-div" v-if="!isLoading">
        <h1>Historique des transactions :</h1>
        <Balance v-if="balance" :balance="balance" />
      </div>
      <div class="transcations-table-ctn" v-if="transactions.length">
        <TransactionsTable :transactions="transactions" />
      </div>
      <div class="no-transactions" v-else>
        <h2 v-if="!isLoading">Aucune Transaction à afficher ...</h2>
      </div>
    </div>
  </main>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import transactionsService from "../../services/transactions/transactions.service";
import TransactionsTable from "../../components/client/TransactionsTable.vue";
import Loader from "../../components/shared/Loader.vue";
import Balance from "../../components/client/Balance.vue";
import usersService from "../../services/users/users.service";
import localStorageService from "../../services/localStorage/localStorage.service";

export default {
  name: "TransactionsView",
  components: { Navigation, TransactionsTable, Loader, Balance },
  data() {
    return {
      transactions: [],
      isLoading: true,
      balance: null,
      userData: {},
    };
  },
  mounted() {
    // Gets the user's ID
    const userId = localStorageService.getUserLocalStorage().id;

    // Gets the user's data and his balance
    usersService.getUser(userId).then((response) => {
      this.userData = response.data;
      this.balance = response.data.balance;
    });

    // Gets the user's transactions
    transactionsService
      .getUserTransactions(userId)
      .then((response) => {
        // Reverses the transactions
        this.transactions = response.data.reverse();
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        console.error(error);
      });
  },
};
</script>

<style scoped>
.title-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  padding: 0px 15px;
}

.title-div .balance-ctn {
  width: auto;
  padding: 15px;
}

.transcations-table-ctn {
  overflow: auto;
}

.no-transactions {
  text-align: center;
  margin: 50px 0;
}

main {
  display: block;
}

h1 {
  text-align: center;
}

@media (min-width: 769px) and (max-width: 992px) {
  .title-div h1 {
    font-size: 24px;
  }

  .title-div {
    margin-bottom: 20px;
  }

  h2 {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .title-div {
    padding: 0px;
    margin-bottom: 10px;
    font-size: 20px;
    flex-direction: column;
  }

  .title-div h1 {
    font-size: 20px;
  }

  .title-div .balance-ctn {
    padding: 5px;
  }
}
</style>