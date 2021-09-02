<template>
  <div>
    <Loader :isLoading="isLoading" />
    <main v-if="cryptoCurrencies.length && userData">
      <Navigation />
      <section class="synthesis-ctn">
        <h1>Bonjour {{ userData.firstname }}</h1>
        <Balance :balance="userData.balance" />
        <HeartSynthesis :userId="userData.id" :cryptoCurrencies="cryptoCurrencies" />
      </section>
    </main>
  </div>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import Balance from "../../components/public/Balance.vue";
import HeartSynthesis from "../../components/public/HeartSynthesis.vue";
import CryptoCurrencyService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import CryptoCurrencyMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import LocalStorageService from "../../services/localStorage/localStorage.service";
import Loader from "../../components/shared/Loader.vue";

export default {
  name: "Home",
  components: { Navigation, Balance, HeartSynthesis, Loader },
  data() {
    return {
      userData: null,
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
    this.userData = LocalStorageService.getUserLocalStorage();
  },
};
</script>

<style>
h1 {
  text-align: center;
  font-size: 2rem;
}

@media (min-width: 769px) {
  .synthesis-ctn {
    width: calc(100% - 120px);
    margin-left: 130px;
  }
}
</style>
