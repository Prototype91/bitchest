<template>
  <main>
    <Navigation />
    <section class="synthesis-ctn">
      <Header :balance="3000" />
      <Wallet />
    </section>
  </main>
  <button @click="clickme">AAAA</button>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import Header from "../../components/shared/Header.vue";
import Wallet from "../../components/public/Wallet.vue";

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: { Navigation, Header, Wallet },
  setup() {
    const store = useStore();

    let storeCrypto = computed(function () {
      return store.state.cryptoCurrencies;
    });

    return {
      storeCrypto,
    };
  },
  methods: {
    clickme() {
      console.log(this.storeCrypto);
    },
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
