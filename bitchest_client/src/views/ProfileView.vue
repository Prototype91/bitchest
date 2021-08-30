<template>
  <main >
    <Navigation/>
    <section>
      <Loader :isLoading="!userData" />
      <div>
        <EditUserForm v-if="userData" :currentUserData="userData" />
      </div>
    </section>
  </main>
</template>

<script>
import EditUserForm from "../components/shared/EditUserForm.vue";
import Navigation from "../components/shared/Navigation.vue";
import Loader from '../components/shared/Loader.vue';
import UsersService from '../services/users/users.service';
import SessionStorageService from '../services/sessionStorage/sessionStorage.service';

export default {
  name: 'ProfileView',
  components: { EditUserForm, Navigation, Loader },
  data() {
    return {
      userData: null,
    };
  },
  mounted() {
    const sessionStorageData = SessionStorageService.getSessionStorage();
    const userId = sessionStorageData.id;

    console.log(sessionStorageData);

    UsersService.getUser(userId).then((response) => {
      console.log(response.data);
      this.userData = response.data;
    });
  },
};
</script>

<style>
</style>