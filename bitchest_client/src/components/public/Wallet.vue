<template>
  <section>
    <section class="card-ctn">
      <Card
        v-for="(cryptoCurrency, index) in this.cryptoCurrencies"
        :name="cryptoCurrency.name"
        :price="cryptoCurrency.current_price"
        :fluctuation="cryptoCurrency.ath_change_percentage"
        :image="cryptoCurrency.image"
        :key="index"
      />
    </section>
    <Table :cryptoCurrencies="this.cryptoCurrencies" />
  </section>
</template>

<script>
import Card from "../shared/Card.vue";
import Table from "./Table.vue";
export default {
  name: "Wallet",
  components: { Card, Table },
  props: {
    cryptoCurrencies: {
      type: Array,
      requied: true,
    },
  },
};
</script>

<style>
.card-ctn {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  width: 80%;
  margin: 0 auto 30px;
}
</style>
