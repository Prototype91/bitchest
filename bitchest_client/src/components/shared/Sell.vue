<template>
  <div class="ctn-form">
    <form
      @submit.prevent="startTransfert"
      class="inputs"
      v-if="userCryptoCurrencies.length"
    >
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
                {{ currency.name.toUpperCase() }}
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
import transactionsService from "../../services/transactions/transactions.service";
import localStorageService from "../../services/localStorage/localStorage.service";

export default {
  name: "Sell",
  emits: ["transfer"],
  props: {
    userData: {
      type: Object,
      required: true,
    },
    cryptoCurrenciesData: {
      type: Array,
      required: true,
    },
    userCryptoCurrencies: {
      type: Array,
    },
  },
  data() {
    return {
      currencySelected: "",
      currencyImg: "",
      currencySymbol: "",
      currencyTotalPrice: 0,
      crypto_amount: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.currencySelected = this.userCryptoCurrencies[0].name;
      this.setCurrentCurrency();
    },
    setCurrentCurrency() {
      const currencyData = this.userCryptoCurrencies.filter(
        (currency) => currency.name === this.currencySelected
      );
      this.currencySymbol = currencyData[0].symbol;
      this.currencyTotalPrice = currencyData[0].amount.toFixed(2);
      this.currencyImg = currencyData[0].image;
      this.crypto_amount = currencyData[0].currency_value.toFixed(9);
    },
    startTransfert() {
      const currency_id = localStorageService
        .getDataBaseCurrenciesLocalStorage()
        .filter((currency) => currency.coin_id === this.currencySelected)[0].id;

      const data = {
        currency_id,
        currency_value: this.crypto_amount * -1,
        user_id: this.userData.id,
        amount: this.currencyTotalPrice,
        type: false,
        name: this.currencySelected,
        symbol: this.currencySymbol,
      };

      console.log(data);

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