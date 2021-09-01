<template>
  <div class="manage-users-ctn">
    <Loader :isLoading="isLoading" />
    <div v-if="users.length" class="user-table">
      <h1>Liste des utilisateurs</h1>
      <button class="btn btn-success link-inside"><router-link to="/admin/create">Ajouter un utilisateur</router-link></button>
      <UsersTable :users="users" @user-deleted="onUserDeleted" />
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
  methods: {
    onUserDeleted() {
      this.loadUsers();
    },
    loadUsers() {
      this.isLoading = true;
      UsersService.getUsers()
        .then((response) => {
          this.users = response.data.users;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
        });
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style scoped>

h1 {
  text-align: center;
  font-size: 30px;
}

button {
  margin: 20px;
  margin-left: auto;
  display: flex;
}
</style>
