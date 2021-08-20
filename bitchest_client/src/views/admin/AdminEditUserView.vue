<template>
  <section>
    <Loader :isLoading="!userData" />
    <div>
      <EditUserForm v-if="userData" :currentUserData="userData" />
    </div>
  </section>
</template>

<script>
import EditUserForm from "../../components/shared/EditUserForm.vue";
import UsersService from "../../services/users/users.service";
import Loader from "../../components/shared/Loader.vue";

export default {
  name: "AdminEditUserView",
  components: { EditUserForm, Loader },
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