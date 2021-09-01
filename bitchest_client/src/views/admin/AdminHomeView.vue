<template>
  <main>
    <Navigation />
    <ManageUsers />
  </main>
</template>

<script>
import ManageUsers from "../../components/admin/ManageUsers.vue";
import Navigation from "../../components/shared/Navigation.vue";
export default {
  name: "AdminHomeView",
  components: { ManageUsers, Navigation },
};
</script>

<style>
</style>
