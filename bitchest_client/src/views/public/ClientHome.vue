<template>
  <main>
    <Navigation />
    <section class="synthesis-ctn">
      <HeaderSynthesis :balance="3000" />
      <HeartSynthesis :cryptoCurrencies="cryptoCurrencies" />
    </section>
  </main>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import HeaderSynthesis from "../../components/public/HeaderSythesis.vue";
import HeartSynthesis from "../../components/public/HeartSynthesis.vue";
import CryptoCurrencyService from "../../services/cryptoCurrencies/cryptoCurrencies.service";
import CryptoCurrencyMapper from "../../services/cryptoCurrencies/cryptoCurrencies.mapper";

export default {
  name: "Home",
  components: { Navigation, HeaderSynthesis, HeartSynthesis },
  data() {
    return {
      cryptoCurrencies: [],
    };
  },
  mounted() {
    CryptoCurrencyService.getCryptoCurrencies()
      .then((response) => {
        this.cryptoCurrencies = CryptoCurrencyMapper.mapCryptoCurrencies(response);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
main {
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding: 15px 10px;
}

.synthesis-ctn {
  width: 80%;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  main {
    padding: 7.5px 5px;
    flex-direction: column;
  }
}
</style>
