<template>
  <main>
    <NavBar />
    <section class="synthesis-ctn">
        <Header :balance="3000"/>
        <Wallet />
    </section>
  </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Header from "../components/Header.vue"
import Wallet from "../components/Wallet.vue"

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
}

.synthesis-ctn {
  width: 90%;
}
</style>
