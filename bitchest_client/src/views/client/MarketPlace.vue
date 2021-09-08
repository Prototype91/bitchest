<template>
  <main>
    <Navigation />
    <div class="market-ctn">
      <Loader :isLoading="isLoading" />

      <section class="sell" v-if="this.userData && !isLoading">
        <h1 v-if="!isLoading">Bonjour {{ this.userData.firstname }}</h1>
        <Balance v-if="!isLoading" :balance="this.userData.balance" />

        <ul class="btn-choice-ctn">
          <li>
            <button
              class="btn"
              :class="this.buyMode ? 'active' : ''"
              @click="setMode(true)"
            >
              Acheter
            </button>
          </li>
          <li>
            <button
              class="btn"
              :class="!this.buyMode ? 'active' : ''"
              @click="setMode(false)"
            >
              Vendre
            </button>
          </li>
        </ul>

        <Buy
          v-if="cryptoCurrenciesData.length && this.buyMode"
          :cryptoCurrenciesData="this.cryptoCurrenciesData"
          :userData="this.userData"
          @transfer="init"
        />
        <Sell
          v-if="cryptoCurrenciesData.length && !this.buyMode"
          :cryptoCurrenciesData="cryptoCurrenciesData"
          :userCryptoCurrencies="userCryptoCurrencies"
          :userData="this.userData"
          :userTransactions="userTransactions"
          @transfer="init"
        />
      </section>
    </div>
  </main>
</template>

<script>
import Balance from "../../components/client/Balance.vue";
import Buy from "../../components/shared/Buy.vue";
import Loader from "../../components/shared/Loader.vue";
import Navigation from "../../components/shared/Navigation.vue";
import Sell from "../../components/shared/Sell.vue";
import cryptoCurrenciesMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import localStorageService from "../../services/localStorage/localStorage.service";
import transactionsMapper from "../../services/transactions/transactions.mapper";
import transactionsService from "../../services/transactions/transactions.service";
import usersService from "../../services/users/users.service";

export default {
  name: "MarketPlace",
  components: { Navigation, Balance, Buy, Sell, Loader },
  data() {
    return {
      userData: null,
      cryptoCurrenciesData: [],
      userCryptoCurrencies: [],
      userTransactions: [],
      isLoading: false,
      buyMode: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.isLoading = true;
      const userid = localStorageService.getUserLocalStorage().id;
      usersService
        .getUser(userid)
        .then((response) => {
          this.userData = response.data;
          transactionsService
            .getUserTransactions(response.data.id)
            .then((response) => {
              this.userCryptoCurrencies =
                cryptoCurrenciesMapper.mapUserCryptoCurrencies(
                  transactionsMapper.sortUserCryptoCurrencies(response.data),
                  this.cryptoCurrenciesData
                );
              console.log(this.cryptoCurrenciesData);
              this.userTransactions = response.data;
              this.isLoading = false;
            })
            .catch((error) => {
              this.isLoading = false;
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });

      this.cryptoCurrenciesData =
        localStorageService.getCryptoCurrenciesLocalStorage();
    },
    setMode(mode) {
      this.buyMode = mode;
    },
  },
};
</script>

<style>
.market-ctn {
  display: flex;
  justify-content: center;
  height: 100%;
}

.market-ctn .ctn-form {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: 45%;
}

.market-ctn form {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.market-ctn form h2 {
  font-size: 20px;
}

.market-ctn section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.market-ctn section .btn-choice-ctn {
  display: flex;
  width: 200px;
}

.market-ctn section .btn-choice-ctn button.active {
  border-bottom: 5px solid #0bc18d;
}

.market-ctn section .btn-choice-ctn button {
  width: 100px;
  background-color: none;
  color: white;
  box-shadow: none;
  border-bottom: 5px solid darkslategray;
}

.market-ctn form > div {
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  width: 100%;
  border-radius: 8px;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px solid grey;
  background-color: rgb(39, 40, 39);
}

.market-ctn .btn-ctn {
  width: 250px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 25px;
}

.market-ctn .input-ctn {
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-top: 10px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.market-ctn .input-ctn img,
.market-ctn .input-ctn svg {
  box-sizing: border-box;
  margin: 0;
  max-width: 100%;
  width: 24px;
  height: 24px;
}

.market-ctn .input-ctn input {
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  width: 100%;
  height: 40px;
  font-size: 20px;
  outline: none;
  border: 0 none;
  line-height: 21px;
  font-family: inherit;
  font-weight: mediumm;
  color: rgb(208, 202, 192);
  outline-color: initial;
  background-color: rgb(39, 40, 39);
  border-color: initial;
}

.market-ctn .select-ctn {
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background-color: darkslategrey;
  border-radius: 50px;
  padding: 8px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  width: 120px;
  min-width: 120px;
  height: 40px;
}

.market-ctn .input-euro .select-ctn {
  cursor: default;
}

.market-ctn .input-euro .select-ctn > span {
  width: 75px;
}

.market-ctn select {
  background-color: transparent;
  border-color: transparent;
  color: white;
  outline: none;
  width: 75px;
}

.market-ctn select option {
  background-color: darkslategrey;
}

.market-ctn .error {
  color: red;
  padding: 15px;
}

/* Remove arrows on input type number */

/* Chrome, Safari, Edge, Opera */
.market-ctn input::-webkit-outer-spin-button,
.market-ctn input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.market-ctn input[type="number"] {
  -moz-appearance: textfield;
}
</style>
