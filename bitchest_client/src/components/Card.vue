<template>
  <div class="card">
    <p>BTC</p>
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
  border: white solid 1px;
  border-radius: 25px;
  padding: 20px;
  background-color: #131517 !important;
}

.card p {
  margin: 0;
}
</style>
