<template>
  <main>
    <Navigation />
    <CryptoCurrencyDetails />
  </main>
</template>

<script>
import CryptoCurrencyDetails from "../../components/public/CryptoCurrencyDetails.vue";
import Navigation from '../../components/shared/Navigation.vue'

export default {
  components: { CryptoCurrencyDetails, Navigation },
};
</script>

<style>
main {
  display: block;
}
</style>