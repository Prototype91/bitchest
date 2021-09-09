<template>
  <div class="ctn-form">
    <div class="no-sale" v-if="!this.userCryptoCurrencies.length">
      <h1>Vous n'avez rien à vendre</h1>
    </div>
    <form
      @submit.prevent="startTransfert"
      class="inputs"
      v-if="userCryptoCurrencies.length"
    >
      <h2>
        Valeur actuelle du <span class="crypto-name">{{ this.currencySelected }}</span> :
        {{ this.currencyPrice }} €
      </h2>
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
                {{ currency.symbol.toUpperCase() }}
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
      <h2>
        Retour sur investissement prévisionnel :
        {{
          rsi.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 2,
          })
        }}
      </h2>
    </form>
  </div>
</template>

<script>
import transactionsService from "../../services/transactions/transactions.service";
import localStorageService from "../../services/localStorage/localStorage.service";
import transactionsMapper from "../../services/transactions/transactions.mapper";

export default {
  name: "Sell",
  emits: ["transfer"],
  props: {
    userData: {
      type: Object,
    },
    cryptoCurrenciesData: {
      type: Array,
    },
    userCryptoCurrencies: {
      type: Array,
    },
    userTransactions: {
      type: Array,
    },
  },
  data() {
    return {
      currencySelected: "",
      currencyImg: "",
      currencySymbol: "",
      currencyPrice: 0,
      currencyTotalPrice: 0,
      crypto_amount: null,
      rsi: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log("crypto user : ", this.userCryptoCurrencies)
      if (this.userCryptoCurrencies.length) {
        this.currencySelected = this.userCryptoCurrencies[0].name;
        this.setCurrentCurrency();
      }
    },
    setCurrentCurrency() {
      const currencyData = this.userCryptoCurrencies.filter(
        (currency) => currency.name === this.currencySelected
      );
      console.log(currencyData[0])
      this.currencySymbol = currencyData[0].symbol;
      this.currencyTotalPrice = currencyData[0].amount.toFixed(2);
      this.currencyPrice = currencyData[0].current_price;
      this.currencyImg = currencyData[0].image;
      this.crypto_amount = currencyData[0].currency_value;

      let amounts = transactionsMapper.getBoughtAmount(this.userTransactions);
      let boughtAmount = amounts.filter(
        (data) => data.name === this.currencySelected
      )[0].amount;
      this.rsi = this.currencyTotalPrice - boughtAmount;
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
        sold: true,
        rsi: this.rsi,
      };

      console.log("datas : ", data);

      // Ajout de la transaction
      transactionsService
        .addNewUserTransaction(data)
        .then((response) => {
          console.log(response);
          this.$emit("transfer");
          transactionsService.updateTransactions(this.currencySelected);
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

.no-sale {
  padding: 25px 0px;
}
</style>