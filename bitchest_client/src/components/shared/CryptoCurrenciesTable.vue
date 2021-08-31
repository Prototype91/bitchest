<template>
  <section>
    <div class="container">
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Cryptomonnaie</th>
              <th>Prix</th>
              <th class="responsive">Fluctuation (24h)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(cryptoCurrency, index) in this.cryptoCurrencies"
              :key="index"
            >
              <td>
                <img :src="cryptoCurrency.image" class="prices-icon" alt="" />
                <span class="responsive">{{ cryptoCurrency.name }}</span>
                ({{ cryptoCurrency.symbol.toUpperCase() }})
              </td>
              <td>{{ cryptoCurrency.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}€</td>
              <td
                :class="[
                  'responsive',
                  cryptoCurrency.price_change_percentage_24h > 0
                    ? 'positive'
                    : 'negative',
                ]"
              >
                {{ cryptoCurrency.price_change_percentage_24h.toFixed(2) }}%
              </td>
              <td>
                <router-link
                  class="btn btn-primary"
                  :to="'/client/details/' + cryptoCurrency.id"
                  >Voir</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CryptoCurrenciesTable",
  props: {
    cryptoCurrencies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
table,
td {
  color: white;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

table img {
  vertical-align: middle;
  margin-right: 20px;
  width: 20%;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
}

@media (max-width: 700px) {
  .responsive {
    display: none;
  }

  table img {
    width: 40%;
    padding: 10px;
  }
}
</style>
