<template>
  <main >
    <Navigation/>
    <section>
      <Loader :isLoading="!userData" />
      <div class="ctn" v-if="userData">
        <h1>Bonjour <span>{{ userData.firstname }}</span>, voici vos informations personnelles :</h1>
        <EditUserForm :currentUserData="userData" />
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

    this.userData = sessionStorageData;
  },
};
</script>

<style scoped>
section {
  width: 100%;
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