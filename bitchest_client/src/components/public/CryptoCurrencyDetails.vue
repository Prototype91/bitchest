<template>
  <section class="graph-ctn">
    <Loader :isLoading="isLoading" />
    <div v-if="Object.entries(graphData).length && !isLoading">
      <Balance :balance="balance" />
      <h1>Voici l'évolution du {{ this.cryptoCurrencyId.toUpperCase() }} sur 30 jours :</h1>
      <CryptoCurrencyGraph :graphData="graphData" />
      <button @click="buyCryptoCurrency" class="btn btn-primary">
        Acheter
      </button>
      <div v-if="transactions.length">
        <TransactionsTable :transactions="transactions" />
      </div>
    </div>
  </section>
</template>

<script>
import CryptoCurrencyGraph from "../shared/CryptoCurrencyGraph.vue";
import cryptoCurrencyService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import cryptoCurrencyMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import TransactionsTable from "../../components/public/TransactionsTable.vue";
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
      isLoading: false,
      balance: 0,
    };
  },
  methods: {
    init() {
      // Gets the coin_id
      this.cryptoCurrencyId = this.$route.params.id;

      // Starts the Loader
      this.isLoading = true;

      // Gets the history (30 days) of the coin
      this.getHistoricalCoinValues(this.cryptoCurrencyId);

      // Gets the user data from the local storage
      this.userData = localStorageService.getUserLocalStorage();

      // Gets all the currencies that you can buy
      this.getCurrencies();

      // Gets the user's data
      this.getUser();

      // Gets all the users's transactions
      this.getUserTransactions(this.userData, this.cryptoCurrencyId);
    },

    getCurrencies() {
      transactionsService
        .getCurrencies()
        .then((response) => {
          console.log(response);
          this.allCryptoCurrencies = response.data.currencies;
          console.log("All currencies", response.data.currencies);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getUser() {
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
    getHistoricalCoinValues(cryptoCurrencyId) {
      cryptoCurrencyService.getHistoricalCoinValues(cryptoCurrencyId)
        .then((response) => {
          this.graphData =
            cryptoCurrencyMapper.mapCryptoCurrencyHistory(response);
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
    getUserTransactions(userData, cryptoCurrencyId) {
      transactionsService
        .getUserTransactions(userData.id)
        .then((response) => {
          this.transactions = response.data
            .filter((transaction) => transaction.name == cryptoCurrencyId)
            .reverse();

          this.isLoading = false;
          console.log("Transactions", this.transactions);
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
    buyCryptoCurrency() {
      const values = Object.values(this.graphData);
      const lastValue = values[values.length - 1];

      if (lastValue > this.balance) {
        return;
      }

      const localStorageData =
        localStorageService.getCryptoCurrenciesLocalStorage();

      const currentCurrencyData = localStorageData.filter(
        (cryptoCurrency) => cryptoCurrency.id === this.cryptoCurrencyId
      );

      const currencyId = this.allCryptoCurrencies.filter(
        (currency) => currency.coin_id === this.cryptoCurrencyId
      )[0].id;

      console.log("currencyId", currencyId);

      const transactionData = {
        currency_id: currencyId,
        user_id: this.userData.id,
        amount: lastValue,
        currency_value: 1,
        type: true,
        name: this.cryptoCurrencyId,
        symbol: currentCurrencyData[0].symbol,
      };

      transactionsService.addNewUserTransaction(transactionData);

      // Reloads all the data
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.graph-ctn {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.graph-ctn h1 {
  margin-bottom: 30px;
}
</style>
