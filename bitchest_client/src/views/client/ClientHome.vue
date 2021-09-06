<template>
  <div>
    <Loader :isLoading="isLoading" />
    <main v-if="cryptoCurrencies.length && userData">
      <Navigation />
      <section class="synthesis-ctn">
        <h1>Bonjour {{ userData.firstname }}</h1>
        <Balance :balance="userData.balance" />
        <HeartSynthesis
          v-if="!isLoading"
          :userId="userData.id"
          :cryptoCurrencies="cryptoCurrencies"
        />
      </section>
    </main>
  </div>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import Balance from "../../components/client/Balance.vue";
import HeartSynthesis from "../../components/client/HeartSynthesis.vue";
import cryptoCurrencyService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import cryptoCurrencyMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import localStorageService from "../../services/localStorage/localStorage.service";
import Loader from "../../components/shared/Loader.vue";
import usersService from "../../services/users/users.service";

export default {
  name: "Home",
  components: { Navigation, Balance, HeartSynthesis, Loader },
  data() {
    return {
      userData: null,
      cryptoCurrencies: [],
      isLoading: false,
      allLoaded: false,
      loaded: false
    };
  },
  mounted() {
    this.isLoading = true;

    const cryptosLocalStorageData =
      localStorageService.getCryptoCurrenciesLocalStorage();

    if (cryptosLocalStorageData?.length) {
      this.cryptoCurrencies = cryptosLocalStorageData;
      this.isLoading = false;
    } else {
      cryptoCurrencyService.getCryptoCurrencies()
        .then((response) => {
          const mappedValues =
            cryptoCurrencyMapper.mapCryptoCurrencies(response);
          this.cryptoCurrencies = mappedValues;
          localStorageService.setCryptoCurrenciesLocalStorage(mappedValues);
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    }
    const userId = localStorageService.getUserLocalStorage().id;
    usersService.getUser(userId).then((response) => {
      this.userData = response.data;
    });
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
