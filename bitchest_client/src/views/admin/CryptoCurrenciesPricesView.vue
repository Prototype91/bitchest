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
import LocalStorageService from "../../services/localStorage/localStorage.service";

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

    const cryptosLocalStorageData =
      LocalStorageService.getCryptoCurrenciesLocalStorage();

    if (cryptosLocalStorageData?.length) {
      this.cryptoCurrencies = cryptosLocalStorageData;
      this.isLoading = false;
    } else {
      CryptoCurrencyService.getCryptoCurrencies()
        .then((response) => {
          const mappedValues =
            CryptoCurrencyMapper.mapCryptoCurrencies(response);

          this.cryptoCurrencies = mappedValues;

          LocalStorageService.setCryptoCurrenciesLocalStorage(mappedValues);

          this.isLoading = false;

          console.log(this.cryptoCurrencies);
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    }
  },
};
</script>

<style scoped></style>