<template>
  <section>
    <div class="container">
      <div>
        <h2>
          Retour sur investissement total en cas de vente :
          {{
            total.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 2,
            })
          }}
        </h2>
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
                      ? 'fas fa-arrow-alt-circle-down green'
                      : 'fas fa-arrow-alt-circle-up',
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
              <td v-if="!transaction.type">
                {{ transaction.currency_value }}
                {{ transaction.symbol.toUpperCase() }}
              </td>
              <td v-if="transaction.type">
                +{{ transaction.currency_value }}
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
import transactionsMapper from "../../services/transactions/transactions.mapper";

export default {
  name: "TransactionsTable",
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      roiValues: [],
      total: 0,
    };
  },
  mounted() {
    this.total = this.getTotalReturnOnInvest();
  },
  methods: {
    formatDate(date) {
      console.log(date);
      return moment(date).local(true).format("DD/MM/YYYY - HH:mm");
    },
    getReturnOnInvest(cryptoCurrencyName, boughtValue, currencyValue) {
      const returnOnInvest = transactionsMapper.getReturnOnInvest(
        cryptoCurrencyName,
        boughtValue,
        currencyValue
      );
      this.roiValues.push(returnOnInvest);
      return returnOnInvest;
    },

    getTotalReturnOnInvest() {
      return this.roiValues.reduce(
        (total, value) => Number(total) + Number(value)
      );
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