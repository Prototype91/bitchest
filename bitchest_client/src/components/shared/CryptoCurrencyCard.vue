<template>
  <div class="card">
    <img src="" alt="">
    <p>{{ name }}</p>
    <p>{{ price.toLocaleString(undefined, { maximumFractionDigits: 7 }) }}</p>
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
