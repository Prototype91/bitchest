<template>
  <div class="table-ctn">
    <table>
      <thead>
        <tr>
          <th>Crypto</th>
          <th>Prix</th>
          <th>Fluctuation</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cryptoCurrency, index) in this.cryptoCurrencies" :key="index">
          <td data-label="Crypto">{{ cryptoCurrency.name }}</td>
          <td data-label="Prix">{{ cryptoCurrency.current_price }}€</td>
          <td data-label="Fluctuation">{{ cryptoCurrency.ath_change_percentage }}%</td>
          <td data-label="Action">
            <router-link to="/"><span>Acheter</span></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
.table-ctn {
  width: 80%;
  margin: 0 auto 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.table-ctn .state button {
  width: 100px;
}

.table-ctn a {
  padding: 0;
  outline: none;
}

.table-ctn th {
  text-align: center;
}

table {
  border-collapse: collapse;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  table-layout: fixed;
  -webkit-box-shadow: 5px 4px 11px 0px rgba(0, 0, 0, 0.49);
  box-shadow: 5px 4px 11px 0px rgba(0, 0, 0, 0.49);
  border-radius: 15px !important;
}

table tr {
  border: 1px solid rgb(228, 225, 225);
  border-radius: 15px;
  padding: 7px;
}

table th,
table td {
  padding: 10px;
  text-align: center;
}

table th {
  font-size: 15px;
  letter-spacing: 1.5px;
}

@media (max-width: 1040px) {
  table {
    border: 0;
  }

  table thead {
    border: none;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    display: block;
    margin-bottom: 10px;
  }

  table td {
    border-bottom: 1px solid rgb(228, 228, 228);
    display: block;
    font-size: 15px;
    text-align: right;
  }

  table td::before {
    content: attr(data-label);
    float: left;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
