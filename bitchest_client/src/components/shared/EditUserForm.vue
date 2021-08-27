<template>
  <div class="admin-ctn">
    <Loader :isLoading="isLoading" />
    <div>
      <h1>Modifier cet Utilisateur :</h1>
      <form @submit.prevent="editUser(currentUserData.id, this.user)">
        <div>
          <label for="lastname">Nom :</label> <br />
          <input
            type="text"
            name="lastname"
            v-model="user.lastname"
            class="form-control"
            id="lastname"
            placeholder="Nom"
            required
          />
        </div>
        <div>
          <label for="firstname">Prénom : </label>
          <input
            name="firstname"
            class="form-control"
            v-model="user.firstname"
            type="text"
            id="firstname"
            placeholder="Prénom"
            required
          />
        </div>
        <div>
          <label for="mail">Mail : </label>
          <input
            name="mail"
            class="form-control"
            required
            v-model="user.email"
            id="mail"
            type="mail"
            placeholder="Adresse mail"
          />
        </div>
        <div>
          <label for="address">Adresse : </label>
          <input
            name="address"
            class="form-control"
            v-model="user.address"
            type="text"
            id="address"
            placeholder="Lieu de résidence"
            required
          />
        </div>
        <div>
          <label for="phone">Téléphone : </label>
          <input
            name="phone"
            class="form-control"
            id="phone"
            v-model="user.phone"
            type="tel"
            placeholder="Mobile"
          />
        </div>
        <div>
          <label for="password">Mot de passe : </label>
          <input
            name="password"
            class="form-control"
            v-model="user.password"
            type="password"
            id="password"
            placeholder="Mot de passe"
            required
          />
        </div>
        <div>
          <label for="password-confirm">Confirmer le mot de passe : </label>
          <input
            name="password-confirm"
            class="form-control"
            type="password"
            id="password-confirm"
            placeholder="Confirmation du mot de passe"
            required
          />
        </div>
        <div>
          <label>
            <input
              type="radio"
              v-model="user.elevation"
              name="elevation"
              value="admin"
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              v-model="user.elevation"
              name="elevation"
              value="user"
            />
            Client
          </label>
        </div>
        <button class="btn btn-primary" type="submit">
          Modifier l'utilisateur
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import UsersService from "../../services/users/users.service";
import Loader from "../shared/Loader.vue";

export default {
  name: "EditUserForm",
  components: { Loader },
  props: {
    currentUserData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {
        firstname: this.currentUserData.firstname,
        lastname: this.currentUserData.lastname,
        email: this.currentUserData.email,
        phone: this.currentUserData.phone,
        address: this.currentUserData.address,
        password: null,
        elevation: this.currentUserData.elevation,
      },
      isLoading: false,
    };
  },
  methods: {
    editUser(id, user) {
      this.isLoading = true;
      UsersService.updateUser(id, user)
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$router.push("/admin");
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
</style>
