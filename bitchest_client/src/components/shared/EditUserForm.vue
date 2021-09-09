<template>
  <div class="admin-ctn">
    <Loader :isLoading="isLoading" />
    <ModalError :error="error" v-if="errorDisplayed" />
    <form autocomplete="off" @submit.prevent="editUser(currentUserData.id, this.user)">
      <div>
        <label for="lastname">Nom :</label> <br />
        <input
          type="text"
          v-model="user.lastname"
          class="form-control"
          id="lastname"
          placeholder="Nom"
          @blur="v$.$touch"
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
          @blur="v$.$touch"
        />
        <div class="error" v-if="v$.user.firstname.$error">
          {{ v$.user.firstname.$errors[0].$message }}
        </div>
      </div>
      <div>
        <label for="mail">Mail : </label>
        <input
          class="form-control"
          v-model="user.email"
          id="mail"
          type="mail"
          placeholder="Adresse mail"
          @blur="v$.$touch"
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
          @blur="v$.$touch"
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
          placeholder="Mobile"
          @blur="v$.$touch"
        />
        <div class="error" v-if="v$.user.phone.$error">
          {{ v$.user.phone.$errors[0].$message }}
        </div>
      </div>
      <div v-if="updatePassword == true">
        <label for="password">Mot de passe : </label>
        <input
          class="form-control"
          v-model="user.password"
          type="password"
          id="password"
          placeholder="Mot de passe"
          autocomplete="off"
          @blur="v$.$touch"
        />
        <div class="error" v-if="v$.user.password.$error">
          {{ v$.user.password.$errors[0].$message }}
        </div>
      </div>
      <div v-if="updatePassword == true">
        <label for="password-confirm">Confirmer le mot de passe : </label>
        <input
          class="form-control"
          v-model="user.password_confirmation"
          type="password"
          id="password-confirm"
          placeholder="Confirmation du mot de passe"
          autocomplete="off"
          @blur="v$.$touch"
        />
        <div class="error" v-if="v$.user.password_confirmation.$error">
          {{ v$.user.password_confirmation.$errors[0].$message }}
        </div>
      </div>
      <div class="radio-ctn" v-if="displayRadios == true">
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
      <button class="btn btn-primary" type="submit">Modifier</button>
    </form>
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
import ModalError from './ModalError.vue';

export default {
  name: "EditUserForm",
  components: { Loader, ModalError },
  props: {
    currentUserData: {
      type: Object,
      required: true,
    },
    displayRadios: {
      type: Boolean,
      default: false,
    },
    updatePassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: {
        firstname: this.currentUserData.firstname,
        lastname: this.currentUserData.lastname,
        email: this.currentUserData.email,
        phone: this.currentUserData.phone,
        address: this.currentUserData.address,
        password: this.currentUserData.password,
        password_confirmation: this.currentUserData.password,
        elevation: this.currentUserData.elevation,
      },
      isLoading: false,
      error: "",
      errorDisplayed: false
    };
  },
  validations() {
    return {
      user: {
        firstname: { required, minLength: minLength(2) },
        lastname: { required, minLength: minLength(2) },
        email: { required, email },
        password: { minLength: minLength(8), alphaNum },
        password_confirmation: { sameAs: sameAs(this.user.password) },
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
    editUser(id, user) {
      this.v$.$validate();

      if (this.v$.$error) {
        return false;
      }

      this.isLoading = true;
      usersService.updateUser(id, user, this.updatePassword)
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$router.push("/admin");
        })
        .catch((error) => {
          this.isLoading = false;
          
          this.error = "Cette adresse mail est déjà utilisée";
          this.errorDisplayed = true;

          // Hide 
          setTimeout(() => {
            this.errorDisplayed = false;
            this.error = "";
          }, 3000);

          console.error(error);
        });
    },
  },
};
</script>

<style>
.admin-ctn {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.admin-ctn .error {
  color: red;
  padding: 7.5px 0px;
}

.admin-ctn h1 {
  font-size: 2rem;
  padding-bottom: 35px;
}

.admin-ctn form > div {
  padding-bottom: 12px;
  min-width: 300px;
}

.admin-ctn form > div.radio-ctn {
  height: 40px;
  display: flex;
  align-items: center;
}

.admin-ctn form label {
  padding-bottom: 2px;
  margin-right: 10px;
}
</style>
