<template>
  <section class="graph-ctn">
    <Loader :isLoading="isLoading" />
    <div v-if="Object.entries(cryptoCurrencyData).length">
      <h1>Voici l'évolution du {{ label }} sur 30 jours :</h1>
      <CryptoCurrencyGraph
        :cryptoCurrencyData="cryptoCurrencyData"
      />
    </div>
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
      cryptoCurrencyData: {},
      label: "",
      isLoading: false,
    };
  },
  mounted() {
    const cryptoCurrencyId = this.$route.params.id;
    this.label = cryptoCurrencyId.toUpperCase();
    this.isLoading = true;
    CryptoCurrencyService.getHistoricalCoinValues(cryptoCurrencyId)
      .then((response) => {
        this.cryptoCurrencyData =
          CryptoCurrencyMapper.mapCryptoCurrencyHistory(response);
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        console.error(error);
      });
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
