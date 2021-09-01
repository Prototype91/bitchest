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
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in this.transactions" :key="index">
              <td>
                <i class="fas fa-arrow-alt-circle-down"></i>
              </td>

              <td class="name">
                {{ transaction.name }}
              </td>

              <td>{{ transaction.amount }} €</td>

              <td>{{ transaction.currency_value }} {{ transaction.symbol.toUpperCase() }}</td>

              <td>
                {{ transaction.created_at }}
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
  name: "TransactionsTable",
  props: {
    transactions: {
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