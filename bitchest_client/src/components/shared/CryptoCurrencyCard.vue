<template>
  <div class="card">
    <img :src="image" alt="">
    <p>{{ name }}</p>
    <p>{{ price.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}€</p>
    <p>{{ fluctuation.toFixed(2) }}%</p>
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
    fluctuation: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true
    }
  },
};
</script>

<style scoped>
.card {
  width: 45%;
  background-color: white;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.card p {
  margin: 0;
  color: black;
}

.card img {
  width: 10%;
}

@media (max-width: 700px) {
  .card {
    width: 100%;
  }
}
</style>
