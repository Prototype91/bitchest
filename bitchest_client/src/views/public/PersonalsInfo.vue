<template>
  <main>
    <Navigation />
    <PersonalInformations />
  </main>
</template>

<script>
import PersonalInformations from "../../components/shared/PersonalInformations.vue";
import Navigation from "../../components/shared/Navigation.vue";

export default {
  components: { PersonalInformations, Navigation },
};
</script>

<style>
</style>