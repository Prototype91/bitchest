<template>
  <section class="graph-ctn">
    <Loader :isLoading="isLoading" />
    <div v-if="Object.entries(cryptoCurrencyData).length && !isLoading">
      <Balance :balance="balance" />
      <h1>Voici l'évolution du {{ label }} sur 30 jours :</h1>
      <CryptoCurrencyGraph :cryptoCurrencyData="cryptoCurrencyData" />
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
import CryptoCurrencyService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import CryptoCurrencyMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import TransactionsTable from "../../components/public/TransactionsTable.vue";
import Loader from "../shared/Loader.vue";
import LocalStorageService from "../../services/localStorage/localStorage.service";
import TransactionsService from "../../services/transactions/transactions.service";
import Balance from "./Balance.vue";
import usersService from '../../services/users/users.service';

export default {
  name: "CryptoCurrencyDetails",
  components: { CryptoCurrencyGraph, Loader, TransactionsTable, Balance },
  data() {
    return {
      cryptoCurrencyData: {},
      transactions: [],
      label: "",
      isLoading: false,
      balance: 0,
      userData: {},
      currencyId: null,
      allCryptoCurrencies: [
        "none",
        "ethereum",
        "ripple",
        "iota",
        "cardano",
        "stella",
        "bitcoin-cash",
        "nem",
        "bitcoin",
        "litecoin",
        "dash",
      ],
    };
  },
  methods: {
    init() {
      this.cryptoCurrencyId = this.$route.params.id;
      this.label = this.cryptoCurrencyId.toUpperCase();
      this.isLoading = true;

      this.getHistoricalCoinValues(this.cryptoCurrencyId);

      this.userData = LocalStorageService.getUserLocalStorage();

      usersService.getUser(this.userData.id).then(response => {
        this.balance = response.data.balance
      });

      this.getUserTransactions(this.userData, this.cryptoCurrencyId);
    },
    getHistoricalCoinValues(cryptoCurrencyId) {
      CryptoCurrencyService.getHistoricalCoinValues(cryptoCurrencyId)
        .then((response) => {
          this.cryptoCurrencyData =
            CryptoCurrencyMapper.mapCryptoCurrencyHistory(response);
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
    getUserTransactions(userData, cryptoCurrencyId) {
      TransactionsService.getUserTransactions(userData.id)
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
      const values = Object.values(this.cryptoCurrencyData);
      const lastValue = values[values.length - 1];

      const localStorageData =
        LocalStorageService.getCryptoCurrenciesLocalStorage();

      const currentCurrencyData = localStorageData.filter(
        (cryptoCurrency) => cryptoCurrency.id === this.cryptoCurrencyId
      );

      const id = this.allCryptoCurrencies.indexOf(this.cryptoCurrencyId);

      const transactionData = {
        currency_id: id,
        user_id: this.userData.id,
        amount: lastValue,
        currency_value: 1,
        type: true,
        name: this.cryptoCurrencyId,
        symbol: currentCurrencyData[0].symbol,
      };

      TransactionsService.addNewUserTransaction(transactionData);

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
