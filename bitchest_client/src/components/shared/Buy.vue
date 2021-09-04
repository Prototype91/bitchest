<template>
  <div class="ctn">
    <div class="error" v-if="errorBalance">
      <h1>
        Vous n'avez pas les fonds requis pour effectuer cette transaction.
      </h1>
    </div>

    <form @submit.prevent="startTransfert" class="inputs">
      <div class="input-euro">
        <label for="acheter">Dépenser</label>
        <div class="input-ctn">
          <div>
            <input
              id="acheter"
              type="number"
              placeholder="Veuillez entrer le montant"
              v-model="exchange_value"
              @keyup="calculate"
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
              v-model="this.crypto_amount"
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
                {{ currency.id.toUpperCase() }}
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
      exchange_value: null,
      crypto_amount: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setCurrentCurrency();
    },
    calculate() {
      if (this.exchange_value)
        this.crypto_amount = (this.exchange_value / this.currencyPrice).toFixed(9);
      else this.crypto_amount = null;
    },
    setCurrentCurrency() {
      const currencyData = this.cryptoCurrenciesData.filter(
        (currency) => currency.id === this.currencySelected
      );
      this.currencySymbol = currencyData[0].symbol;
      this.currencyPrice = currencyData[0].current_price;
      this.currencyImg = currencyData[0].image;
      this.calculate();
    },
    startTransfert() {
      if (this.userData.balance < this.exchange_value) {
        this.errorBalance = true;
        return;
      }
      const currency_id = localStorageService
        .getDataBaseCurrenciesLocalStorage()
        .filter((currency) => currency.coin_id === this.currencySelected)[0].id;

      const data = {
        currency_id,
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