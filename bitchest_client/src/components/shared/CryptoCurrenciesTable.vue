<template>
  <section class="section-ctn">
    <div class="container">
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Cryptomonnaie</th>
              <th>Cours</th>
              <th class="responsive-xs">Fluctuation (24h)</th>
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
                <span class="symbol"
                  >({{ cryptoCurrency.symbol.toUpperCase() }})</span
                >
              </td>
              <td>
                {{
                  cryptoCurrency.current_price.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 2,
                  })
                }}
              </td>
              <td
                :class="[
                  'responsive-xs',
                  cryptoCurrency.price_change_percentage_24h > 0
                    ? 'green'
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
.section-ctn .container {
  padding: 0;
}

.section-ctn {
  margin-top: 30px;
}

.symbol {
  margin-left: 3px;
}

table,
td {
  color: white;
}

.negative {
  color: #df393e;
}

table {
  width: 80%;
  margin: 0 auto;
}

table img {
  vertical-align: middle;
  margin-right: 20px;
  width: 20%;
  background-color: white;
  border-radius: 50%;
  padding: 20px;
}

@media (max-width: 768px) {
  .responsive {
    display: none;
  }

  table img {
    width: 70px;
    padding: 10px;
    margin-right: 5px;
  }
}

@media (max-width: 500px) {
  .responsive-xs {
    display: none;
  }
  table {
    width: 90%;
  }
}
</style>
