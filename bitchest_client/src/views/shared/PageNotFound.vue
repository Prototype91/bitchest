<template>
  <main>
    <h1>Page not found ...</h1>
    <button class="btn btn-primary" @click="retour()">Retour</button>
  </main>
</template>

<script>
export default {
  name: "PageNotFound",
  methods: {
    retour() {
      history.back();
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}
</style>