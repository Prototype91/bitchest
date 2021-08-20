<template>
  <div>
    <Loader :isLoading="isLoading" />
    <div v-if="users.length" class="user-table">
      <UsersTable  :users="users" />
      <router-link to="/admin/create">Ajouter</router-link>
    </div>
  </div>
</template>

<script>
import UsersTable from "./UsersTable.vue";
import UsersService from "../../services/users/users.service";
import Loader from "../shared/Loader.vue";

export default {
  name: "ManageUsers",
  components: {
    UsersTable,
    Loader,
  },
  data() {
    return {
      users: [],
      isLoading: false,
    };
  },
  mounted() {
    this.isLoading = true;
    UsersService.getUsers()
      .then((response) => {
        console.log(response.data.users);
        this.users = response.data.users;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        console.error(error);
      });
  },
};
</script>

<style></style>
