<template>
  <div class="table-ctn">
    <table>
      <thead>
        <tr>
          <th>Crypto</th>
          <th>Prix</th>
          <th>Fluctuation</th>
          <th>Acheter</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(crypto, index) in cryptos" :key="index">
          <td data-label="Crypto">{{ crypto.cryptoName }}</td>
          <td data-label="Prix">${{ crypto.balance }}</td>
          <td data-label="Fluctuation">+{{ crypto.fluctuation }}%</td>
          <td data-label="Acheter">
            <router-link to="/"><span>Acheter</span></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    cryptos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.table-ctn {
  width: 80%;
  margin: 0 auto;
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
