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
            <button
              class="btn btn-primary link-inside"
              :class="[user.id === this.currentUserId ? 'disabled' : '']"
            >
              <router-link :to="'/admin/update/' + user.id"
                >Modifier</router-link
              >
            </button>
          </td>
          <td data-label="Supprimer">
            <button
              class="btn btn-danger"
              :class="[user.id === this.currentUserId ? 'disabled' : '']"
              @click="updateModalStatus(user.id)"
            >
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal
      @cancel="updateModalStatus(null)"
      @confirm="onConfirm(this.userIdToDelete)"
      :modalActive="modalActive"
    >
      <div class="modal-content">
        <h1>Supprimer cet utilisateur ?</h1>
        <p>Cette action est irreversible ...</p>
      </div>
    </Modal>
  </div>
</template>

<script>
import UserService from "../../services/users/users.service";
import Modal from "../../components/shared/Modal.vue";
import { ref } from "vue";
import localStorageService from "../../services/localStorage/localStorage.service";

export default {
  name: "UsersTable",
  components: { Modal },
  props: {
    users: {
      type: Array,
    },
  },
  data() {
    return {
      userIdToDelete: null,
      currentUserId: localStorageService.getUserLocalStorage().id,
    };
  },
  emits: ["user-deleted"],
  setup(props, { emit }) {
    const modalActive = ref(false);
    return {
      modalActive,
      updateModalStatus(id) {
        this.userIdToDelete = id;
        modalActive.value = !modalActive.value;
      },
      onConfirm(id) {
        // Deletes the user
        UserService.deleteUser(id)
          .then(() => {
            emit("user-deleted");
            modalActive.value = !modalActive.value;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    };
  },
};
</script>

<style scoped>
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
