<template>
  <div>
    <Loader :isLoading="isLoading" />
    <h2 class="total">
      Montant total de vos cryptomonnaies :
      <span class="green">+{{ this.getTotalCryptoCurrenciesAmount() }}</span>
    </h2>
    <section class="cards-ctn" v-if="userCryptoCurrencies.length">
      <CryptoCurrencyCard
        v-for="(userCryptoCurrency, index) in this.userCryptoCurrencies"
        :name="userCryptoCurrency.name"
        :price="userCryptoCurrency.currency_value"
        :image="userCryptoCurrency.image"
        :symbol="userCryptoCurrency.symbol"
        :amount="userCryptoCurrency.amount"
        :key="index"
      />
    </section>
    <section>
      <CryptoCurrenciesTable :cryptoCurrencies="this.cryptoCurrencies" />
    </section>
  </div>
</template>

<script>
import CryptoCurrencyCard from "../shared/CryptoCurrencyCard.vue";
import CryptoCurrenciesTable from "../shared/CryptoCurrenciesTable.vue";
import transactionsService from "../../services/transactions/transactions.service";
import transactionsMapper from "../../services/transactions/transactions.mapper";
import cryptoCurrenciesMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import Loader from "../shared/Loader.vue";
export default {
  name: "HeartSynthesis",
  components: { CryptoCurrencyCard, CryptoCurrenciesTable, Loader },
  props: {
    cryptoCurrencies: {
      type: Array,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      userCryptoCurrencies: [],
    };
  },
  methods: {
    getUserCryptoCurrencies() {
      this.isLoading = true;
      transactionsService
        .getUserTransactions(this.userId)
        .then((response) => {
          this.userCryptoCurrencies =
            cryptoCurrenciesMapper.mapUserCryptoCurrencies(
              transactionsMapper.sortUserCryptoCurrencies(response.data),
              this.cryptoCurrencies
            );
          console.log("User Cryptos", this.userCryptoCurrencies);
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getTotalCryptoCurrenciesAmount() {
      return this.userCryptoCurrencies
        .reduce((total, currency) => total + currency.amount, 0)
        .toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 2,
        });
    },
  },
  mounted() {
    this.getUserCryptoCurrencies();
  },
};
</script>

<style scoped>
.cards-ctn {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  width: 80%;
  margin: 0 auto 30px;
}

.total {
  text-align: center;
  padding: 30px;
}

@media (max-width: 700px) {
  .cards-ctn {
    width: 90%;
  }
}
</style>
