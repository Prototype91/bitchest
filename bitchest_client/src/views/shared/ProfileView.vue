<template>
  <main>
    <Navigation />
    <section>
      <Loader :isLoading="!userData" />
      <div class="ctn" v-if="userData">
        <h1>
          Bonjour <span>{{ userData.firstname }}</span
          >, voici vos informations personnelles :
        </h1>
        <EditUserForm :currentUserData="userData" :displayRadios="false" :updatePassword="true"/>
      </div>
    </section>
  </main>
</template>

<script>
import EditUserForm from "../../components/shared/EditUserForm.vue";
import Navigation from "../../components/shared/Navigation.vue";
import Loader from "../../components/shared/Loader.vue";
import UsersService from "../../services/users/users.service";
import LocalStorageService from "../../services/localStorage/localStorage.service";

export default {
  name: "ProfileView",
  components: { EditUserForm, Navigation, Loader },
  data() {
    return {
      userData: null,
    };
  },
  mounted() {
    const localStorageData = LocalStorageService.getUserLocalStorage();
    const userId = localStorageData.id;

    console.log(localStorageData);

    UsersService.getUser(userId).then((response) => {
      console.log(response.data);
      this.userData = response.data;
    });
  },
};
</script>

<style scoped>
section {
  width: calc(100% - 130px);
  margin-left: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

section h1 {
  font-size: 2rem;
  padding-bottom: 20px;
  text-align: center;
}

section > .ctn {
  width: 100%;
}
</style>