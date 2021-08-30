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

export default {
  name: 'ProfileView',
  components: { EditUserForm, Navigation, Loader },
  data() {
    return {
      userData: null,
    };
  },
  mounted() {
    let dataToGet = sessionStorage.getItem("token");
    const sessionStorageData = JSON.parse(dataToGet);

    console.log(sessionStorageData);

    this.userData = sessionStorageData
  },
};
</script>

<style>
</style>