<template>
  <UsersTable :users="users"/>
</template>

<script>
import UsersTable from "./UsersTable.vue";
import UsersService from "../../services/users/users.service";
export default {
  name: "ManageUsers",
  components: {
    UsersTable,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    UsersService.getUsers()
      .then((response) => {
        console.log(response);
        this.users = response.data.users;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style></style>
