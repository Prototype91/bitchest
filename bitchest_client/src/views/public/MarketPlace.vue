<template>
  <main>
    <Navigation />
    <Loader :isLoading="isLoading" />
    <div class="market-ctn" v-if="!isLoading">
      <section class="sell" v-if="this.userData">
        <h1>Bonjour {{ this.userData.firstname }}</h1>
        <Balance :balance="this.userData.balance" />

        <div class="error" v-if="errorBalance">
          <h1>
            Vous n'avez pas les fonds requis pour effectuer cette transaction.
          </h1>
        </div>

        <div class="btn-ctn">
          <button class="btn btn-primary">Acheter</button>
          <button class="btn btn-secondary">Vendre</button>
        </div>

        <form @submit.prevent="startTransfert" class="inputs">
          <div class="input-euro">
            <label for="acheter">Dépenser</label>
            <div class="input-ctn">
              <div>
                <input
                  id="acheter"
                  type="number"
                  v-model="exchange_value"
                  @keyup="calculate"
                />
              </div>
              <div class="select-ctn">
                <img src="" alt="Symbole de la monnaie utilisée" />
                <span>EUR</span>
              </div>
            </div>
          </div>
          <div class="input-crypto">
            <label for="vendre">Recevoir</label>
            <div class="input-ctn">
              <div>
                <input id="vendre" type="text" v-model="this.crypto_amount" />
              </div>
              <div class="select-ctn">
                <img
                  :src="currencyImg"
                  alt="icone de la cryptomonnaie choisie"
                />
                <select
                  name="crypto-select"
                  id="crypto-select"
                  v-model="currencySelected"
                  @change="setCurrentCurrency"
                >
                  <option
                    v-for="(currency, index) in this.cryptoCurrenciesData"
                    :key="index"
                    :value="currency.id"
                  >
                    {{ currency.id }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button class="btn btn-success" type="submit">Conclure</button>
        </form>
      </section>
    </div>
  </main>
</template>

<script>
import Balance from "../../components/public/Balance.vue";
import Loader from "../../components/shared/Loader.vue";
import Navigation from "../../components/shared/Navigation.vue";
import cryptoCurrenciesMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import cryptoCurrenciesService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import localStorageService from "../../services/localStorage/localStorage.service";
import transactionsService from "../../services/transactions/transactions.service";
import usersService from "../../services/users/users.service";

export default {
  name: "MarketPlace",
  components: { Navigation, Balance, Loader },
  data() {
    return {
      isLoading: false,
      userData: null,
      errorBalance: false,
      currencySelected: "bitcoin",
      currencyImg: "",
      currencySymbol: "",
      currencyPrice: 0,
      exchange_value: 0,
      crypto_amount: 0,
      cryptoCurrenciesData: [],
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
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });

      cryptoCurrenciesService
        .getCryptoCurrencies()
        .then((response) => {
          this.cryptoCurrenciesData =
            cryptoCurrenciesMapper.mapCryptoCurrencies(response);
          console.log(this.cryptoCurrenciesData);
          this.setCurrentCurrency();
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
    calculate() {
      this.crypto_amount = this.exchange_value / this.currencyPrice;
    },
    setCurrentCurrency() {
      const currencyData = this.cryptoCurrenciesData.filter(
        (currency) => currency.id === this.currencySelected
      );
      this.currencySymbol = currencyData[0].symbol;
      this.currencyPrice = currencyData[0].current_price;
      this.currencyImg = currencyData[0].image;
    },
    startTransfert() {
      let currency_id;
      let data;

      if (this.userData.balance < this.exchange_value) {
        this.errorBalance = true;
        return;
      }

      transactionsService.getCurrencies().then((response) => {
        currency_id = response.data.currencies.filter(
          (currency) => currency.coin_id === this.currencySelected
        )[0].id;

        data = {
          currency_id: currency_id,
          currency_value: this.crypto_amount,
          user_id: this.userData.id,
          amount: this.exchange_value,
          type: true,
          name: this.currencySelected,
          symbol: this.currencySymbol,
        };

        // Ajout de la transaction
        transactionsService
          .addNewUserTransaction(data)
          .then((response) => {
            console.log(response);
            this.init();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>

<style scoped>
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

.market-ctn .btn-ctn {
  width: 250px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 25px;
}

.input-ctn {
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

.input-ctn input {
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  width: 100%;
  height: 24px;
  color: #1e2329;
  font-size: 20px;
  outline: none;
  background-color: #fafafa;
  border: 0 none;
  line-height: 21px;
  font-family: inherit;
  font-weight: mediumm;
  color: rgb(208, 202, 192);
  outline-color: initial;
  background-color: rgb(39, 40, 39);
  border-color: initial;
}

.select-ctn {
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
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  width: 116px;
}

.error {
  color: red;
  padding: 7.5px 0px;
}
</style>
