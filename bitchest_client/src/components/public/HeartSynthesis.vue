<template>
  <div>
    <section class="cards-ctn" v-if="userCryptoCurrencies.length">
      <CryptoCurrencyCard
        v-for="(userCryptoCurrency, index) in this.userCryptoCurrencies"
        :name="userCryptoCurrency.name"
        :price="userCryptoCurrency.currency_value"
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
    },
  },
  data() {
    return {
      userCryptoCurrencies: [],
    };
  },
  mounted() {
    transactionsService.getUserTransactions(this.userId).then((response) => {
      console.log(response);
      this.userCryptoCurrencies = transactionsMapper.sortUserCryptoCurrencies(
        response.data
      );
      console.log("User Cryptos", this.userCryptoCurrencies);
    });
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
