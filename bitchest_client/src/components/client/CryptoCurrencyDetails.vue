<template>
  <section class="graph-ctn">
    <Loader :isLoading="isLoading" />
    <div v-if="Object.entries(graphData).length && balance && !isLoading">
      <Balance :balance="balance" />
      <h1>
        Voici l'évolution du {{ this.cryptoCurrencyId.toUpperCase() }} sur 30
        jours :
      </h1>
      <div class="graph">
        <CryptoCurrencyGraph :graphData="graphData" />
        <button @click="onBuyClick" class="btn btn-primary">Acheter</button>
        <div v-if="transactions.length">
          <TransactionsTable :transactions="transactions" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CryptoCurrencyGraph from "../shared/CryptoCurrencyGraph.vue";
import cryptoCurrencyService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import cryptoCurrencyMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import TransactionsTable from "../../components/client/TransactionsTable.vue";
import Loader from "../shared/Loader.vue";
import localStorageService from "../../services/localStorage/localStorage.service";
import Balance from "./Balance.vue";
import usersService from "../../services/users/users.service";
import transactionsService from "../../services/transactions/transactions.service";

export default {
  name: "CryptoCurrencyDetails",
  components: { CryptoCurrencyGraph, Loader, TransactionsTable, Balance },
  data() {
    return {
      graphData: {},
      allCryptoCurrencies: [],
      userData: {},
      cryptoCurrencyId: null,
      transactions: [],
      isLoading: true,
      balance: null,
    };
  },
  mounted() {
    // Gets the coin_id
    this.cryptoCurrencyId = this.$route.params.id;

    // Gets the history (30 days) of the coin
    this.getHistoricalCoinValues(this.cryptoCurrencyId);

    // Gets the user data from the local storage
    this.userData = localStorageService.getUserLocalStorage();

    // Gets the user's data
    this.getUser();

    // Gets all the users's transactions
    this.getUserTransactions(this.userData, this.cryptoCurrencyId);
  },
  methods: {
    onBuyClick() {
      // Sets the currency that you want to buy
      localStorageService.setWantedCurrencyLocalStorage(this.cryptoCurrencyId);

      // Redirection to Market Place
      this.$router.push("/client/market");
    },
    getHistoricalCoinValues(cryptoCurrencyId) {
      // Gets the historical values
      cryptoCurrencyService
        .getHistoricalCoinValues(cryptoCurrencyId)
        .then((response) => {
          this.graphData =
            cryptoCurrencyMapper.mapCryptoCurrencyHistory(response);
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
    getUser() {
      // Gets the user's data
      usersService
        .getUser(this.userData.id)
        .then((response) => {
          this.balance = response.data.balance;
          this.userData.balance = response.data.balance;
          localStorageService.setUserLocalStorage(this.userData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getUserTransactions(userData, cryptoCurrencyId) {
      // Gets the user's transactions
      transactionsService
        .getUserTransactions(userData.id)
        .then((response) => {
          this.transactions = response.data
            .filter((transaction) => transaction.name == cryptoCurrencyId)
            // Reverses the transactions
            .reverse();
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.graph-ctn {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.graph {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.graph-ctn h1 {
  margin-bottom: 30px;
  text-align: center;
  font-size: 20px;
}

.btn-primary {
  width: 20%;
  margin: 40px auto;
}

@media (max-width: 830px) {
  .graph {
    width: 90%;
  }
}

@media (max-width: 380px) {
  .btn-primary {
    width: 90%;
  }
}
</style>
