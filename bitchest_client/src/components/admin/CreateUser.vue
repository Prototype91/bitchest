<template>
  <div class="admin-ctn">
    <div>
      <h1>Ajouter un utilisateur :</h1>
      <form>
        <div>
          <label for="lastname">Nom :</label> <br />
          <input
            type="text"
            name="lastname"
            v-model="user.firstname"
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
            v-model="user.lastname"
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
        <button @click="add($event)" class="btn btn-primary" type="submit">
          Ajouter l'utilisateur
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import authService from "../../services/authentication/auth.service";
export default {
  name: "CreateUser",
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
    };
  },
  methods: {
    add(e) {
      e.preventDefault();
      authService
        .addUser(this.user)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
</style>