<template>
  <main>
    <Navigation />
    <section class="synthesis-ctn">
      <Header :balance="3000" />
      <Wallet :cryptoCurrencies="cryptoCurrencies" />
    </section>
  </main>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import Header from "../../components/shared/Header.vue";
import Wallet from "../../components/public/Wallet.vue";
import CryptoService from "../../services/crypto/cryptoCurrencies.service";
import CryptoMapper from "../../services/crypto/cryptoCurrencies.mapper";

export default {
  name: "Home",
  components: { Navigation, Header, Wallet },
  data() {
    return {
      cryptoCurrencies: [],
    };
  },
  mounted() {
    CryptoService.getCryptoCurrencies().then((response) => {
      this.cryptoCurrencies = CryptoMapper.mapCryptoCurrencies(response);
      console.log(this.cryptoCurrencies);
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
