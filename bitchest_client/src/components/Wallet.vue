<template>
    <Card :balance="100" :fluctuation="1.2"/>
</template>

<script>
import Card from "./Card.vue";
export default {
  name: "Wallet",
  components: { Card },
};
</script>

<style>

</style>
