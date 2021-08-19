<template>
  <section>
    <section class="card-ctn">
      <Card
        v-for="(crypto, index) in cryptos"
        :cryptoName="crypto.cryptoName"
        :balance="crypto.balance"
        :fluctuation="crypto.fluctuation"
        :key="index"
      />
    </section>
    <Table :cryptos="cryptos" />
  </section>
</template>

<script>
import Card from "../shared/Card.vue";
import Table from "./Table.vue";
export default {
  name: "Wallet",
  components: { Card, Table },
  data() {
    return {
      cryptos: [
        { cryptoName: "Bitcoin", balance: 145, fluctuation: 1.3 },
        { cryptoName: "Bitcoin", balance: 145, fluctuation: 1.3 },
        { cryptoName: "Bitcoin", balance: 145, fluctuation: 1.3 },
        { cryptoName: "Bitcoin", balance: 145, fluctuation: 1.3 },
        { cryptoName: "Bitcoin", balance: 145, fluctuation: 1.3 },
        { cryptoName: "Bitcoin", balance: 145, fluctuation: 1.3 },
        { cryptoName: "Bitcoin", balance: 145, fluctuation: 1.3 },
        { cryptoName: "Bitcoin", balance: 145, fluctuation: 1.3 },
      ],
    };
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
