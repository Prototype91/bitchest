<template>
  <main>
    <nav class="col-md-2 col-lg-1 col-sm-2"></nav>
    <section class="col-lg-11 col-md-10 col-sm-10"></section>
  </main>
</template>

<script>
export default {
  name: "Home",
  components: {},
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