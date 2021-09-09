<template>
  <div class="admin-ctn">
    <Loader :isLoading="isLoading" />
    <ModalError :error="error" v-if="errorDisplayed" />
    <h1>Ajouter un utilisateur :</h1>
    <div>
      <form autocomplete="off" @submit.prevent="addUser">
        <div>
          <label for="lastname">Nom :</label> <br />
          <input
            type="text"
            v-model="user.lastname"
            class="form-control"
            id="lastname"
            placeholder="Nom"
          />
          <div class="error" v-if="v$.user.lastname.$error">
            {{ v$.user.lastname.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label for="firstname">Prénom : </label>
          <input
            class="form-control"
            v-model="user.firstname"
            type="text"
            id="firstname"
            placeholder="Prénom"
          />
          <div class="error" v-if="v$.user.firstname.$error">
            {{ v$.user.firstname.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label for="mail">Mail : </label>
          <input
            class="form-control"
            required
            v-model="user.email"
            id="mail"
            type="mail"
            placeholder="Adresse mail"
          />
          <div class="error" v-if="v$.user.email.$error">
            {{ v$.user.email.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label for="address">Adresse : </label>
          <input
            class="form-control"
            v-model="user.address"
            type="text"
            id="address"
            placeholder="Lieu de résidence"
          />
          <div class="error" v-if="v$.user.address.$error">
            {{ v$.user.address.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label for="phone">Téléphone : </label>
          <input
            class="form-control"
            id="phone"
            v-model="user.phone"
            type="tel"
            placeholder="0606060606"
          />
          <div class="error" v-if="v$.user.phone.$error">
            {{ v$.user.phone.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label for="password">Mot de passe : </label>
          <input
            class="form-control"
            v-model="user.password"
            type="password"
            id="password"
            placeholder="Mot de passe (8 char min.)"
            autocomplete="off"
          />
          <div class="error" v-if="v$.user.password.$error">
            {{ v$.user.password.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label for="password-confirm">Confirmer le mot de passe : </label>
          <input
            class="form-control"
            v-model="user.password_confirmation"
            type="password"
            id="password-confirm"
            placeholder="Confirmation du mot de passe (8 char min.)"
            autocomplete="off"
          />
          <div class="error" v-if="v$.user.password_confirmation.$error">
            {{ v$.user.password_confirmation.$errors[0].$message }}
          </div>
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
          <div class="error" v-if="v$.user.elevation.$error">
            {{ v$.user.elevation.$errors[0].$message }}
          </div>
        </div>
        <button class="btn btn-primary" type="submit">
          Ajouter l'utilisateur
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  numeric,
  alphaNum,
  maxLength,
  sameAs,
} from "@vuelidate/validators";
import usersService from "../../services/users/users.service";
import Loader from "../shared/Loader.vue";
import ModalError from "../shared/ModalError.vue";

export default {
  name: "CreateUser",
  components: { Loader, ModalError },
  data() {
    return {
      user: {
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        address: null,
        password: null,
        password_confirmation: null,
        elevation: null,
      },
      isLoading: false,
      error: "",
      errorDisplayed: false,
    };
  },
  validations() {
    return {
      user: {
        firstname: { required, minLength: minLength(2) },
        lastname: { required, minLength: minLength(2) },
        email: { required, email },
        password: { required, minLength: minLength(8), alphaNum },
        password_confirmation: { required, sameAs: sameAs(this.user.password) },
        phone: {
          required,
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(10),
        },
        address: { required },
        elevation: { required },
      },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    addUser() {
      // Validations
      this.v$.$validate();

      if (this.v$.$error) {
        return false;
      }

      this.isLoading = true;
      // Add a user
      usersService
        .addUser(this.user)
        .then(() => {
          this.isLoading = false;
          this.$router.push("/admin");
        })
        .catch((err) => {
          this.isLoading = false;

          this.error = "Cette adresse mail est déjà utilisée";

          this.errorDisplayed = true;

          // Hide
          setTimeout(() => {
            this.errorDisplayed = false;
            this.error = "";
          }, 3000);

          console.error(err);
        });
    },
  },
};
</script>