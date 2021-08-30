<template>
  <div>
    <section class="cards-ctn">
      <CryptoCurrencyCard
        v-for="(cryptoCurrency, index) in this.cryptoCurrencies"
        :name="cryptoCurrency.name"
        :price="cryptoCurrency.current_price"
        :fluctuation="cryptoCurrency.price_change_percentage_24h"
        :image="cryptoCurrency.image"
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
import CryptoCurrenciesTable from "./CryptoCurrenciesTable.vue";
export default {
  name: "HeartSynthesis",
  components: { CryptoCurrencyCard, CryptoCurrenciesTable },
  props: {
    cryptoCurrencies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.cards-ctn {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  width: 80%;
  margin: 0 auto 30px;
}
</style>
