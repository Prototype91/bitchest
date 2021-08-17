<template>
  <section class="card-ctn">
    <Card
      v-for="(crypto, index) in cryptos"
      :cryptoName="crypto.cryptoName"
      :balance="crypto.balance"
      :fluctuation="crypto.fluctuation"
      :key="index"
    />
  </section>
  <Table :cryptos="cryptos"/>
</template>

<script>
import Card from "./Card.vue";
import Table from "./Table.vue";
export default {
  name: "Wallet",
  components: { Card, Table },
  data() {
    return {
      cryptos: [
        { cryptoName: "Bitcoin", balance: "145", fluctuation: "1.3" },
        { cryptoName: "Bitcoin", balance: "145", fluctuation: "1.3" },
        { cryptoName: "Bitcoin", balance: "145", fluctuation: "1.3" },
        { cryptoName: "Bitcoin", balance: "145", fluctuation: "1.3" },
        { cryptoName: "Bitcoin", balance: "145", fluctuation: "1.3" },
        { cryptoName: "Bitcoin", balance: "145", fluctuation: "1.3" },
        { cryptoName: "Bitcoin", balance: "145", fluctuation: "1.3" },
        { cryptoName: "Bitcoin", balance: "145", fluctuation: "1.3" },
      ],
    };
  },
};
</script>

<style>
.card-ctn {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
}
</style>
