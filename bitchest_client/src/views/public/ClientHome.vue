<template>
  <div>
    <Loader :isLoading="isLoading" />
    <main v-if="cryptoCurrencies.length && userData">
      <Navigation />
      <section class="synthesis-ctn">
        <h1>Bonjour {{ userData.firstname }}</h1>
        <HeaderSynthesis :balance="userData.balance" />
        <HeartSynthesis :cryptoCurrencies="cryptoCurrencies" />
      </section>
    </main>
  </div>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import HeaderSynthesis from "../../components/public/HeaderSythesis.vue";
import HeartSynthesis from "../../components/public/HeartSynthesis.vue";
import CryptoCurrencyService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import CryptoCurrencyMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import LocalStorageService from "../../services/localStorage/localStorage.service";
import Loader from "../../components/shared/Loader.vue";

export default {
  name: "Home",
  components: { Navigation, HeaderSynthesis, HeartSynthesis, Loader },
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

.synthesis-ctn {
  width: 80%;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  main {
    padding: 7.5px 5px;
    flex-direction: column;
  }
}

@media screen and (max-width: 917px) {
  .synthesis-ctn {
    width: 100%;
  }
}
</style>
