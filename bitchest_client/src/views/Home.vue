<template>
  <main>
    <NavBar />
    <section class="col-lg-11 col-md-10 col-sm-10">
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

main > * {
  border: 1px solid white;
  width: 100%;
}
</style>
