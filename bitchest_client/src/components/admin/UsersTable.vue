<template>
  <div class="table-ctn">
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in this.users" :key="index">
          <td data-label="Nom">{{ user.lastname }}</td>
          <td data-label="Prénom">{{ user.firstname }}</td>
          <td data-label="Email">{{ user.email }}</td>
          <td data-label="Rôle">{{ user.elevation }}</td>
          <td data-label="Modifier">
            <router-link :to="'/admin/update/' + user.id">Modifier</router-link>
          </td>
          <td data-label="Supprimer">
            <button @click="deleteUser(user.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserService from "../../services/users/users.service";
export default {
  name: "UsersTable",
  props: {
    users: {
      type: Array,
    },
  },
  emits: ['user-deleted'],
  methods: {
    deleteUser(id) {
      UserService.deleteUser(id)
        .then((reponse) => {
          console.log(reponse);
          this.$emit('user-deleted');
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.table-ctn {
  width: 80%;
  margin: 0 auto 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.table-ctn .state button {
  width: 100px;
}

.table-ctn a {
  padding: 0;
  outline: none;
}

.table-ctn th {
  text-align: center;
}

table {
  border-collapse: collapse;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  table-layout: fixed;
  -webkit-box-shadow: 5px 4px 11px 0px rgba(0, 0, 0, 0.49);
  box-shadow: 5px 4px 11px 0px rgba(0, 0, 0, 0.49);
  border-radius: 15px !important;
}

table tr {
  border: 1px solid rgb(228, 225, 225);
  border-radius: 15px;
  padding: 7px;
}

table th,
table td {
  padding: 10px;
  text-align: center;
}

table th {
  font-size: 15px;
  letter-spacing: 1.5px;
}

@media (max-width: 1040px) {
  table {
    border: 0;
  }

  table thead {
    border: none;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    display: block;
    margin-bottom: 10px;
  }

  table td {
    border-bottom: 1px solid rgb(228, 228, 228);
    display: block;
    font-size: 15px;
    text-align: right;
  }

  table td::before {
    content: attr(data-label);
    float: left;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
