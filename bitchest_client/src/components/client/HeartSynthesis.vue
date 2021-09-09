<template>
  <div>
    <div>
      <h2 v-if="userCryptoCurrencies.length" class="total">
        Montant total de vos cryptomonnaies :
        <span class="green">+{{ this.getTotalCryptoCurrenciesAmount() }}</span>
      </h2>
      <section class="cards-ctn" v-if="userCryptoCurrencies.length">
        <CryptoCurrencyCard
          v-for="(userCryptoCurrency, index) in this.userCryptoCurrencies"
          :name="userCryptoCurrency.name"
          :price="userCryptoCurrency.currency_value"
          :image="userCryptoCurrency.image"
          :symbol="userCryptoCurrency.symbol"
          :amount="userCryptoCurrency.amount"
          :key="index"
        />
      </section>
      <section>
        <CryptoCurrenciesTable :cryptoCurrencies="this.cryptoCurrencies" />
      </section>
    </div>
  </div>
</template>

<script>
import CryptoCurrencyCard from "../shared/CryptoCurrencyCard.vue";
import CryptoCurrenciesTable from "../shared/CryptoCurrenciesTable.vue";
export default {
  name: "HeartSynthesis",
  components: { CryptoCurrencyCard, CryptoCurrenciesTable },
  props: {
    cryptoCurrencies: {
      type: Array,
      required: true,
    },
    userCryptoCurrencies: {
      type: Array, 
      required: true
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getTotalCryptoCurrenciesAmount() {
      return this.userCryptoCurrencies
        .reduce((total, currency) => total + currency.amount, 0)
        .toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 2,
        });
    },
  }
};
</script>

<style scoped>
.cards-ctn {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  width: 100%;
  margin-bottom: 10px;
}

.total {
  text-align: center;
  padding: 30px;
  font-size: 1.2rem;
}

@media (min-width: 1440px) {
  .cards-ctn {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}

@media (max-width: 992px) {
  .cards-ctn {
    width: 90%;
    gap: 10px;
    margin: 0 auto;
    margin-bottom: 10px;  
  }
}

@media (max-width: 560px) {
  .cards-ctn {
    gap: 20px;
  }
}
</style>
