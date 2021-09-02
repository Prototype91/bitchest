<template>
  <div>
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
export default {
  name: "HeartSynthesis",
  components: { CryptoCurrencyCard, CryptoCurrenciesTable },
  props: {
    cryptoCurrencies: {
      type: Array,
      required: true,
    },
    userId: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      userCryptoCurrencies: [],
    };
  },
  methods: {
    getUserCryptoCurrencies() {
      transactionsService
        .getUserTransactions(this.userId)
        .then((response) => {
          this.userCryptoCurrencies =
            cryptoCurrenciesMapper.mapUserCryptoCurrencies(
              transactionsMapper.sortUserCryptoCurrencies(response.data),
              this.cryptoCurrencies
            );
          console.log("User Cryptos", this.userCryptoCurrencies);
        })
        .catch((error) => {
          console.error(error);
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
</style>
