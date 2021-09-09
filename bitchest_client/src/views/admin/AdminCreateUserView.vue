<template>
  <main>
    <Navigation />
    <CreateUser />
  </main>
</template>

<script>
import CreateUser from "../../components/admin/CreateUser.vue";
import Navigation from "../../components/shared/Navigation.vue";

export default {
  name: 'AdminCreateUserView',
  components: { CreateUser, Navigation },
};
</script>