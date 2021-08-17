<template>
  <main>
    <NavBar />
    <section class="synthesis-ctn">
      <Header :balance="3000" />
      <Wallet />
    </section>
  </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Header from "../components/Header.vue";
import Wallet from "../components/Wallet.vue";

export default {
  name: "Home",
  components: { NavBar, Header, Wallet },
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
  width: 90%;
}

@media screen and (max-width: 768px) {
  main {
    padding: 7.5px 5px;
    flex-direction: column;
  }
}
</style>
