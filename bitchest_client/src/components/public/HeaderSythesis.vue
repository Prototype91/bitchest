<template>
  <div class="balance-ctn">
    <p>Synthèse</p>
    <p>Solde : {{ balance }} €</p>
  </div>
</template>

<script>
export default {
  name: "HeaderSynthesis",
  props: {
    balance: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.balance-ctn {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
}

.balance-ctn p {
  font-size: 24px;
}
</style>
