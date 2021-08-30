<template>
  <main>
    <Navigation />
    <Loader :isLoading="!userData" />
    <div>
      <h1>Modification de l'utilisateur</h1>
      <EditUserForm v-if="userData" :currentUserData="userData" :displayRadios="true"/>
    </div>
  </main>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import EditUserForm from "../../components/shared/EditUserForm.vue";
import UsersService from "../../services/users/users.service";
import Loader from "../../components/shared/Loader.vue";

export default {
  name: "AdminEditUserView",
  components: { EditUserForm, Navigation, Loader },
  data() {
    return {
      userData: null,
    };
  },
  mounted() {
    const userId = this.$route.params.id;
    UsersService.getUser(userId).then((response) => {
      console.log(response.data);
      this.userData = response.data;
    });
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  text-align: center;
  padding: 30px 0px;
}

main > div {
      width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>