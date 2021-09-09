<template>
  <div class="ctn-form">
    <div class="error" v-if="errorBalance">
      <h1>
        Vous n'avez pas les fonds requis pour effectuer cette transaction.
      </h1>
    </div>

    <form @submit.prevent="startTransfert" class="inputs">
      <h2>
        Valeur actuelle du
        <span class="crypto-name">{{ this.currencySelected }}</span> :
        {{ this.currencyPrice }} €
      </h2>
      <div class="input-euro">
        <label for="acheter">Dépenser</label>
        <div class="input-ctn">
          <div>
            <input
              id="acheter"
              type="text"
              placeholder="Veuillez entrer le montant"
              v-model="exchange_value"
              @keypress="isNumber($event)"
              @keyup="calculateAmountInCrypto"
            />
          </div>
          <div class="select-ctn">
            <i class="fas fa-euro-sign"></i>
            <span>EUR</span>
          </div>
        </div>
      </div>
      <div class="input-crypto">
        <label for="vendre">Recevoir</label>
        <div class="input-ctn">
          <div>
            <input
              id="vendre"
              type="text"
              placeholder="0.00"
              v-model.number="this.cryptoAmount"
              @keypress="isNumber($event)"
              @keyup="calculateAmountInEuro"
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
                v-for="(currency, index) in this.cryptoCurrenciesData"
                :key="index"
                :value="currency.id"
              >
                {{ currency.symbol.toUpperCase() }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <button class="btn btn-success" type="submit">Conclure</button>
    </form>
  </div>
</template>

<script>
import localStorageService from "../../services/localStorage/localStorage.service";
import transactionsService from "../../services/transactions/transactions.service";

export default {
  name: "Buy",
  props: {
    cryptoCurrenciesData: {
      type: Array,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      errorBalance: false,
      currencySelected: "bitcoin",
      currencyImg: "",
      currencySymbol: "",
      currencyPrice: 0,
      exchangeValue: null,
      cryptoAmount: null,
    };
  },
  mounted() {
    // Init
    this.init();
  },
  methods: {
    init() {
      this.setSelectedCurrency();
      this.setCurrentCurrency();
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    calculateAmountInCrypto() {
      if (this.exchangeValue)
        this.cryptoAmount = this.exchangeValue / this.currencyPrice;
      else this.cryptoAmount = null;
    },
    calculateAmountInEuro() {
      if (this.cryptoAmount)
        this.exchangeValue = Number(this.cryptoAmount) * this.currencyPrice;
      else this.exchangeValue = null;
    },
    setCurrentCurrency() {
      // Gets the currency data
      const currencyData = this.cryptoCurrenciesData.filter(
        (currency) => currency.id === this.currencySelected
      );

      // Assignments of the data
      this.currencySymbol = currencyData[0].symbol;
      this.currencyPrice = currencyData[0].current_price;
      this.currencyImg = currencyData[0].image;

      // Calculs
      this.calculateAmountInCrypto();
      this.calculateAmountInEuro();
    },
    setSelectedCurrency() {
      // If you have been redirected from the details page
      const wantedCurrency =
        localStorageService.getWantedCurrencyLocalStorage();

      wantedCurrency
        ? (this.currencySelected =
            localStorageService.getWantedCurrencyLocalStorage())
        : "bitcoin";

      // Deleted the wanted currency
      window.localStorage.removeItem("wanted-currency");
    },
    startTransfert() {
      if (this.userData.balance < this.exchangeValue) {
        this.errorBalance = true;
        return;
      }

      // Gets the currency ID
      const currency_id = localStorageService
        .getDataBaseCurrenciesLocalStorage()
        .filter((currency) => currency.coin_id === this.currencySelected)[0].id;

      // Sets the data to send
      const data = {
        currency_id,
        currency_value: this.cryptoAmount,
        user_id: this.userData.id,
        amount: this.exchangeValue,
        currency_rate: this.currencyPrice,
        type: true,
        name: this.currencySelected,
        symbol: this.currencySymbol,
        sold: false,
      };

      // Add a transaction
      transactionsService
        .addNewUserTransaction(data)
        .then(() => {
          this.$emit("transfer");
          this.init();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.btn-success {
  margin: 30px 0;
}
</style>