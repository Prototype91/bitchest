<template>
  <div>
    <Loader :isLoading="isLoading" />
    <main v-if="cryptoCurrencies.length && userData">
      <Navigation />
      <section class="synthesis-ctn">
        <h1 class="welcome">
          Bonjour {{ userData.firstname }}, bienvenue sur votre espace BitChest
          !
        </h1>
        <Balance :balance="userData.balance" />
        <HeartSynthesis
          v-if="!isLoading"
          :userId="userData.id"
          :cryptoCurrencies="cryptoCurrencies"
          :userCryptoCurrencies="userCryptoCurrencies"
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
import transactionsService from "../../services/transactions/transactions.service";
import cryptoCurrenciesMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import transactionsMapper from "../../services/transactions/transactions.mapper";

export default {
  name: "Home",
  components: { Navigation, Balance, HeartSynthesis, Loader },
  data() {
    return {
      userData: null,
      cryptoCurrencies: [],
      isLoading: true,
      userCryptoCurrencies: [],
      userId: null,
    };
  },
  mounted() {
    // Gets all the cryptocurrencies data
    cryptoCurrencyService
      .getCryptoCurrencies()
      .then((response) => {
        // Maps the response
        const mappedValues = cryptoCurrencyMapper.mapCryptoCurrencies(response);

        this.cryptoCurrencies = mappedValues;

        // Sets the Local Storage
        localStorageService.setCryptoCurrenciesLocalStorage(mappedValues);

        // Gets all the user's cryptocurrencies
        this.getUserCryptoCurrencies();
      })
      .catch((error) => {
        this.isLoading = false;
        console.error(error);
      });

    // Gets the user's ID
    this.userId = localStorageService.getUserLocalStorage().id;

    // Gets the user's data
    usersService.getUser(this.userId).then((response) => {
      this.userData = response.data;
    });
  },
  methods: {
    getUserCryptoCurrencies() {
      // Gets the user's transactions
      transactionsService
        .getUserTransactions(this.userId)
        .then((response) => {
          if (response.data.length) {
            // Maps the response
            this.userCryptoCurrencies =
              cryptoCurrenciesMapper.mapUserCryptoCurrencies(
                transactionsMapper.sortUserCryptoCurrencies(response.data),
                this.cryptoCurrencies
              );
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
  },
};
</script>

<style>
.welcome {
  text-align: center;
  font-size: 1.5rem;
  margin: 30px auto 0;
  width: 90%;
}

@media (min-width: 769px) {
  .synthesis-ctn {
    width: calc(100% - 120px);
    margin-left: 130px;
  }
}
</style>
