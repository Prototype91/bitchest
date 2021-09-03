<template>
  <main>
    <Navigation />
    <div class="market-ctn">
      <section class="sell" v-if="this.userData">
        <h1>Bonjour {{ this.userData.firstname }}</h1>
        <Balance :balance="this.userData.balance" />

        <div class="btn-ctn">
          <button class="btn btn-primary">Acheter</button>
          <button class="btn btn-secondary">Vendre</button>
        </div>

        <div style="display: none">
          <Buy v-if="cryptoCurrenciesData.length"
            @transfer="init"
            :cryptoCurrenciesData="this.cryptoCurrenciesData"
          />
        </div>
        <Sell v-if="cryptoCurrenciesData.length"
          @transfer="init"
          :cryptoCurrenciesData="this.cryptoCurrenciesData"
          :userData="this.userData"
        />
      </section>
    </div>
  </main>
</template>

<script>
import Balance from "../../components/public/Balance.vue";
import Buy from "../../components/shared/Buy.vue";
import Navigation from "../../components/shared/Navigation.vue";
import Sell from "../../components/shared/Sell.vue";
import cryptoCurrenciesMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import cryptoCurrenciesService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import localStorageService from "../../services/localStorage/localStorage.service";
import usersService from "../../services/users/users.service";

export default {
  name: "MarketPlace",
  components: { Navigation, Balance, Buy, Sell },
  data() {
    return {
      userData: null,
      cryptoCurrenciesData: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const userid = localStorageService.getUserLocalStorage().id;
      usersService
        .getUser(userid)
        .then((response) => {
          this.userData = response.data;
        })
        .catch((error) => {
          console.error(error);
        });

      cryptoCurrenciesService
        .getCryptoCurrencies()
        .then((response) => {
          this.cryptoCurrenciesData =
            cryptoCurrenciesMapper.mapCryptoCurrencies(response);
          console.log(this.cryptoCurrenciesData);
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
.market-ctn {
  display: flex;
  justify-content: center;
}

.market-ctn section {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
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
  width: 170px;
  height: 40px;
}

.market-ctn .input-euro .select-ctn {
  cursor: default;
}

.market-ctn .input-euro .select-ctn > span {
  width: 110px;
}

.market-ctn select {
  background-color: transparent;
  border-color: transparent;
  color: white;
  outline: none;
  width: 110px;
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
