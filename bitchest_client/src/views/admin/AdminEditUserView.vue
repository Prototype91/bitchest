<template>
  <main>
    <Navigation />
    <Loader :isLoading="!userData" />
    <div>
      <h1>Modification de l'utilisateur</h1>
      <EditUserForm
        v-if="userData"
        :currentUserData="userData"
        :displayRadios="true"
        :updatePassword="false"
        routePath="/admin"
      />
    </div>
  </main>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
import EditUserForm from "../../components/shared/EditUserForm.vue";
import usersService from "../../services/users/users.service";
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
    // gets the user ID
    const userId = this.$route.params.id;

    // Gets all the user's data
    usersService.getUser(userId)
      .then((response) => {
        this.userData = response.data;
      })
      .catch((error) => {
        console.error(error);
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>