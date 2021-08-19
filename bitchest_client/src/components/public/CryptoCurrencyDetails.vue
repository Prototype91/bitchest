<template>
  <section class="graph-ctn">
    <CryptoCurrencyGraph
      v-if="cryptoCurrencyData.length"
      :cryptoCurrencyData="cryptoCurrencyData"
      :label="label"
    />
  </section>
</template>

<script>
import CryptoCurrencyGraph from "../shared/CryptoCurrencyGraph.vue";
import CryptoCurrencyService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import CryptoCurrencyMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
export default {
  name: "CryptoCurrencyDetails",
  components: { CryptoCurrencyGraph },
  data() {
    return {
      cryptoCurrencyData: [],
      label: "Prix",
    };
  },
  mounted() {
    CryptoCurrencyService.getHistoricalCoinValues("bitcoin")
      .then((response) => {
        this.cryptoCurrencyData =
          CryptoCurrencyMapper.mapCryptoCurrencyHistory(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
.graph-ctn {
  width: 50%;
  height: 200px !important;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 10px;
}
</style>
