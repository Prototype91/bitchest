<template>
  <div class="bg-danger">
    {{ this.error }}
  </div>
</template>

<script>
export default {
  name: "TransactionsTable",
  props: {
    error: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style scoped>
div {
  position: absolute;
  right: 20px;
  top: 20px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid white;
}
</style>