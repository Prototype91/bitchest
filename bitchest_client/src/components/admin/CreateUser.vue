<template>
  <div class="admin-ctn">
    <Loader :isLoading="isLoading" />
    <div>
      <h1>Ajouter un utilisateur :</h1>
      <form @submit.prevent="addUser">
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
            <input type="radio"
            v-model="user.elevation"
            name="elevation" value="admin"> Admin
          </label>
          <label>
            <input type="radio"
            v-model="user.elevation"
            name="elevation" value="user"> Client
          </label>
        </div>
        <button class="btn btn-primary" type="submit">
          Ajouter l'utilisateur
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import UsersService from "../../services/users/users.service";
import Loader from "../shared/Loader.vue";
export default {
  name: "CreateUser",
  components: { Loader },
  data() {
    return {
      user: {
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        address: null,
        password: null,
        elevation: null,
      },
      isLoading: false
    };
  },
  methods: {
    addUser() {
      this.isLoading = true;
      UsersService
        .addUser(this.user)
        .then((response) => {
          this.isLoading = false;
          this.$router.push('/admin');
          console.log(response);
        })
        .catch((err) => {
          this.isLoading = false;
          console.error(err);
        });
    },
  },
};
</script>

<style>
</style>