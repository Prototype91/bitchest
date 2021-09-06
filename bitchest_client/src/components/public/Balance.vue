<template>
  <div class="balance-ctn">
    <p>
      Solde :
      <span class="green"
        >+{{
          balance.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 2,
          })
        }}</span
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "Balance",
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

@media (max-width: 768px) {
  .title-div .balance-ctn p {
    font-size: 20px;
  }
}
</style>
