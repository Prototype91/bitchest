<template>
  <div class="balance-ctn">
    <p>
      Solde :
      {{
        balance.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })
      }}
      €
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
</style>
