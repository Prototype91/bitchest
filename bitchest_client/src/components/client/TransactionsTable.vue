<template>
  <section>
    <div class="container">
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Cryptos</th>
              <th>Débit</th>
              <th>Crédit</th>
              <th>Cours</th>
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
                    !transaction.type && transaction.rsi > 0
                      ? 'green'
                      : transaction.rsi < 0
                      ? 'text-danger'
                      : '',
                  ]"
                ></i>
              </td>
              <td class="name">
                {{ transaction.name }}
              </td>

              <td v-if="transaction.type">
                -{{
                  transaction.amount.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 2,
                  })
                }}
              </td>
              <td>
                <span v-if="transaction.type">+</span>
                {{ transaction.currency_value.toFixed(9) }}
                {{ transaction.symbol.toUpperCase() }}
              </td>
              <td v-if="!transaction.type">
                +{{
                  transaction.amount.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 2,
                  })
                }}
              </td>
              <td>
                {{ transaction.currency_rate.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 2,
                  }) }}
              </td>
              <td v-if="!transaction.type">
                {{
                  transaction.rsi.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 2,
                  })
                }}
              </td>
              <td v-if="transaction.type"></td>
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
      return moment(date).local(true).format("DD/MM/YYYY - HH:mm");
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}

table,
td {
  color: white;
}

tbody td {
  padding: 12px 0.5rem;
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
  margin: 0 !important;
  padding: 0px 20px;
  width: 100%;
  max-width: none;
}
table img {
  vertical-align: middle;
  margin-right: 20px;
  width: 20%;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
}

@media (max-width: 768px) {
  .responsive {
    display: none;
  }

  .container {
    padding: 0px;
  }

  table img {
    width: 40%;
    padding: 10px;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 16px;
  }
}
</style>