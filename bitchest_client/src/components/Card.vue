<template>
  <div class="card">
    <p><i class="fab fa-bitcoin"></i> {{ cryptoName }}</p>
    <p>${{ balance }}</p>
    <p>+{{ fluctuation }}%</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cryptoName: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    fluctuation: {
      type: Number,
      required: true,
    },
  }
};
</script>

<style scoped>
.card {
  width: 15%;
  background-color: #1e1f23;
  border-radius: 25px;
  padding: 20px;
}

.card p {
  margin: 0;
}
</style>
