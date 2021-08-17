<template>
  <div class="card">
    <p><i class="fab fa-bitcoin"></i> BTC</p>
    <p>${{ balance }}</p>
    <p>+{{ fluctuation }}%</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    balance: {
      type: Number,
      required: true,
    },
    fluctuation: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  width: 15%;
  background-color: #1E1F23;
  border-radius: 25px;
  padding: 20px;
}

.card p {
  margin: 0;
}
</style>
