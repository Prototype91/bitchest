<template>
  <section class="graph-ctn">
    <Loader :isLoading="isLoading" />
    <div v-if="Object.entries(cryptoCurrencyData).length && !isLoading">
      <Balance :balance="balance" />
      <h1>Voici l'évolution du {{ label }} sur 30 jours :</h1>
      <CryptoCurrencyGraph :cryptoCurrencyData="cryptoCurrencyData" />
      <button class="btn btn-primary">Acheter</button>
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

export default {
  name: "CryptoCurrencyDetails",
  components: { CryptoCurrencyGraph, Loader, TransactionsTable, Balance },
  data() {
    return {
      cryptoCurrencyData: {},
      transactions: [],
      label: "",
      isLoading: false,
      balance: null,
    };
  },
  methods: {
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
        this.transactions = response.data.filter(
          (transaction) => transaction.name == cryptoCurrencyId
        );

        console.log(response, this.cryptoCurrencyData);
        this.isLoading = false;
        console.log("Transactions", this.transactions);
      })
      .catch((error) => {
        this.isLoading = false;
        console.error(error);
      });
    }
  },
  mounted() {
    const cryptoCurrencyId = this.$route.params.id;
    this.label = cryptoCurrencyId.toUpperCase();
    this.isLoading = true;

    this.getHistoricalCoinValues(cryptoCurrencyId);

    const userData = LocalStorageService.getUserLocalStorage();
    this.balance = userData.balance;

    this.getUserTransactions(userData, cryptoCurrencyId);
  },
};
</script>

<style scoped>
.graph-ctn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 10px;
}
.graph-ctn h1 {
  margin-bottom: 30px;
}
</style>
