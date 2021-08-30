<template>
  <div>
    <Loader :isLoading="isLoading" />
    <main v-if="cryptoCurrencies.length">
      <Navigation />
      <CryptoCurrenciesTable :cryptoCurrencies="this.cryptoCurrencies" />
    </main>
  </div>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import CryptoCurrenciesTable from "../../components/shared/CryptoCurrenciesTable.vue";
import CryptoCurrencyService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import CryptoCurrencyMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import Loader from "../../components/shared/Loader.vue";

export default {
  name: "CryptoCurrenciesPricesView",
  components: { Navigation, CryptoCurrenciesTable, Loader },
  data() {
    return {
      cryptoCurrencies: [],
      isLoading: false,
    };
  },
  mounted() {
    this.isLoading = true;
    CryptoCurrencyService.getCryptoCurrencies()
      .then((response) => {
        this.cryptoCurrencies =
          CryptoCurrencyMapper.mapCryptoCurrencies(response);
        this.isLoading = false;
        console.log(this.cryptoCurrencies);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped></style>