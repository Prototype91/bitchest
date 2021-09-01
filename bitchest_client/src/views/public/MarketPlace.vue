<template>
  <main>
    <Navigation />
    <div class="market-ctn">
      <section class="buy">
        <h2>Acheter</h2>
      </section>
      <section class="sell">
        <h2>Vendre</h2>
      </section>
    </div>
  </main>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
export default {
  name: "MarketPlace",
  components: { Navigation },
};
</script>

<style scoped>
.buy,
.sell {
  width: 50%;
  text-align: center;
}

.market-ctn {
  display: flex;
  justify-content: center;
  width: calc(100% - 120px);
  margin-left: 130px;
}
</style>
