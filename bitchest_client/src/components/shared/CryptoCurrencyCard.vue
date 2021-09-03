<template>
  <div class="card">
    <img :src="image" alt="" />
    <p class="name">{{ name }}</p>
    <p class="orange">+{{ price.toFixed(2) }} {{ symbol.toUpperCase() }}</p>
    <p class="end green">
      +{{
        amount.toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 2,
        })
      }}
    </p>
  </div>
</template>

<script>
export default {
  name: "CryptoCurrencyCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: repeat(4, 20%);
  justify-content: space-around;
  width: 80%;
  background-color: white;
  border-radius: 25px;
  align-items: center;
  padding: 20px;
}
.name {
  text-transform: capitalize;
}

.orange {
  color: #454a75 !important;
}

.card p {
  margin: 0;
  color: black;
  text-align: start;
}

.end {
  text-align: end !important;
}

.card img {
  width: 30%;
}

@media (max-width: 700px) {
  .card {
    width: 100%;
  }
}
</style>
