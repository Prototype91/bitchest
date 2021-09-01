<template>
  <section>
    <div class="container">
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Cryptomonnaie</th>
              <th>Débit</th>
              <th>Crédit</th>
              <th>RSI</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in this.transactions" :key="index">
              <td>
                <i
                  :class="[
                    !transaction.type
                      ? 'fas fa-arrow-alt-circle-down'
                      : 'fas fa-arrow-alt-circle-up',
                  ]"
                ></i>
              </td>

              <td class="name">
                {{ transaction.name }}
              </td>

              <td v-if="transaction.type">
                -{{
                  transaction.amount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                }}
                €
              </td>
              <td v-if="!transaction.type">
                -{{ transaction.currency_value }}
                {{ transaction.symbol.toUpperCase() }}
              </td>

              <td v-if="transaction.type">
                +{{ transaction.currency_value }}
                {{ transaction.symbol.toUpperCase() }}
              </td>
              <td v-if="!transaction.type">
                +{{
                  transaction.amount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                }}
                €
              </td>

              <td>
                {{
                  getReturnOnInvest(
                    transaction.name,
                    transaction.amount,
                    transaction.currency_value
                  )
                }}
                €
              </td>

              <td>{{ this.formatDate(transaction.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import LocalStorageService from "../../services/localStorage/localStorage.service";

export default {
  name: "TransactionsTable",
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).utc().format("DD/MM/YYYY-hh:mm");
    },
    getReturnOnInvest(cryptoCurrencyName, boughtValue, currencyValue) {
      const cryptoCurrencies =
        LocalStorageService.getCryptoCurrenciesLocalStorage();

      const cryptoCurrencyData = cryptoCurrencies.find(
        (cryptoCurrency) => cryptoCurrency.id === cryptoCurrencyName
      );

      const returnOnInvest =
        (cryptoCurrencyData.current_price -
          boughtValue / Number(currencyValue)) *
        Number(currencyValue);

      return returnOnInvest >= 0 ? `+${returnOnInvest}` : returnOnInvest;
    },
  },
};
</script>

<style scoped>
table,
td {
  color: white;
}

.name {
  text-transform: capitalize;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

.container {
  padding: 0;
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