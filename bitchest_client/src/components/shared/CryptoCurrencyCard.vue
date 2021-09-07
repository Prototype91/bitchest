<template>
  <div class="card">
    <div>
      <img :src="image" alt="" />
      <p class="name">{{ name }}</p>
    </div>
    <div>
      <p>+{{ price.toFixed(9) }} {{ symbol.toUpperCase() }}</p>
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
  flex-direction: column;
  justify-content: space-around;
  width: 30%;
  background-color: white;
  border-radius: 25px;
  align-items: center;
  padding: 20px;
}

.card > div {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.card > div:last-of-type {
  padding-top: 15px;
}

.name {
  text-transform: capitalize;
  font-size: 18px;
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
  width: 40px;
}

@media (min-width: 1440px) {
  .card {
    width: 24%;
  }
}

@media (max-width: 992px) {
  .card {
    width: 45%;
  }
}

@media (max-width: 768px) {
  .card {
    width: 49%;
  }
}

@media (max-width: 560px) {
  .card {
    width: 100%;
  }
}
</style>
