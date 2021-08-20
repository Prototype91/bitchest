<template>
  <section class="graph-ctn">
    <Loader :isLoading="isLoading" />
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
import Loader from "../shared/Loader.vue";

export default {
  name: "CryptoCurrencyDetails",
  components: { CryptoCurrencyGraph, Loader },
  data() {
    return {
      cryptoCurrencyData: [],
      label: "",
      isLoading: false,
    };
  },
  mounted() {
    const cryptoCurrencyId = this.$route.params.id;
    this.label = `Cours du ${cryptoCurrencyId.toUpperCase()}`;
    this.isLoading = true;
    CryptoCurrencyService.getHistoricalCoinValues(cryptoCurrencyId)
      .then((response) => {
        this.cryptoCurrencyData =
          CryptoCurrencyMapper.mapCryptoCurrencyHistory(response);
        this.isLoading = false;
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
