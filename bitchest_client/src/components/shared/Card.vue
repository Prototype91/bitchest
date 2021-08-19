<template>
  <div class="card">
    <img :src="image" alt="">
    <p>{{ name }}</p>
    <p>{{ price }}€</p>
    <p>{{ fluctuation }}%</p>
  </div>
</template>

<script>
export default {
  name: "Card",
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
  width: 30%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 25px;
  padding: 20px;
  text-align: center;
}

.card p {
  margin: 0;
}

.card img {
  width: 50%;
}

@media (max-width: 700px) {
  .card {
    width: 100%;
  }
}
</style>
