<template>
  <div class="ctn-form">
    <Loader :isLoading="isLoading" />

    <form @submit.prevent="startTransfert" class="inputs">
      <div class="input-crypto">
        <label for="vendre">Vendre</label>
        <div class="input-ctn">
          <div>
            <input
              id="vendre"
              type="text"
              placeholder="0.00"
              v-model="this.crypto_amount"
              disabled="true"
            />
          </div>
          <div class="select-ctn">
            <img :src="currencyImg" alt="icone de la cryptomonnaie choisie" />
            <select
              name="crypto-select"
              id="crypto-select"
              v-model="currencySelected"
              @change="setCurrentCurrency"
            >
              <option
                v-for="(currency, index) in this.userCryptoCurrencies"
                :key="index"
                :value="currency.name"
              >
                {{ currency.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="input-euro">
        <label for="recevoir">Recevoir</label>
        <div class="input-ctn">
          <div>
            <input
              id="recevoir"
              type="number"
              placeholder="Veuillez entrer le montant"
              v-model="currencyTotalPrice"
              disabled="true"
            />
          </div>
          <div class="select-ctn">
            <i class="fas fa-euro-sign"></i>
            <span>EUR</span>
          </div>
        </div>
      </div>
      <button class="btn btn-success" type="submit">Conclure</button>
    </form>
  </div>
</template>

<script>
import cryptoCurrenciesMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";
import transactionsService from "../../services/transactions/transactions.service";
import transactionsMapper from "../../services/transactions/transactions.mapper";
import Loader from "./Loader.vue";

export default {
  name: "Sell",
  components: { Loader },
  props: {
    userData: {
      type: Object,
      required: true,
    },
    cryptoCurrenciesData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      currencySelected: "",
      currencyImg: "",
      currencySymbol: "",
      currencyTotalPrice: 0,
      crypto_amount: null,
      userCryptoCurrencies: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.isLoading = true;

      transactionsService
        .getUserTransactions(this.userData.id)
        .then((response) => {
          this.userCryptoCurrencies =
            cryptoCurrenciesMapper.mapUserCryptoCurrencies(
              transactionsMapper.sortUserCryptoCurrencies(response.data),
              this.cryptoCurrenciesData
            );
          console.log("User Cryptos", this.userCryptoCurrencies);
          this.currencySelected = this.userCryptoCurrencies[0].name;
          this.setCurrentCurrency();
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setCurrentCurrency() {
      const currencyData = this.userCryptoCurrencies.filter(
        (currency) => currency.name === this.currencySelected
      );
      this.currencySymbol = currencyData[0].symbol;
      this.currencyTotalPrice = currencyData[0].amount;
      this.currencyImg = currencyData[0].image;
      this.crypto_amount = currencyData[0].currency_value;
    },
    startTransfert() {
      let currency_id;
      let data;

      transactionsService.getCurrencies().then((response) => {
        currency_id = response.data.currencies.filter(
          (currency) => currency.coin_id === this.currencySelected
        )[0].id;

        data = {
          currency_id: currency_id,
          currency_value: this.crypto_amount * -1,
          user_id: this.userData.id,
          amount: this.currencyTotalPrice,
          type: false,
          name: this.currencySelected,
          symbol: this.currencySymbol,
        };

        // Ajout de la transaction
        transactionsService
          .addNewUserTransaction(data)
          .then((response) => {
            console.log(response);
            this.$emit("transfer");
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
.ctn {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: 50%;
}

form {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
</style>