<template>
  <div class="login-centered">
    <div class="login-ctn">
      <Loader :isLoading="isLoading" />
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-ctn">
          <label>Adresse mail</label>
          <input
            type="email"
            name="email"
            class="form-control"
            required
            v-model="email"
          />
        </div>
        <div class="input-ctn">
          <label>Mot de passe</label>
          <input
            type="password"
            class="form-control"
            name="password"
            required
            v-model="password"
          />
        </div>
        <button type="submit" class="submit btn btn-primary">
          Se connecter
        </button>
      </form>
      <p v-if="error" class="error">Email ou mot de passe incorrect ...</p>
    </div>
  </div>
</template>

<script>
import AuthService from "../../services/authentication/auth.service";
import SessionStorageService from '../../services/sessionStorage/sessionStorage.service';
import Loader from "./Loader.vue";

export default {
  name: "LoginForm",
  components: {
    Loader,
  },
  data() {
    return {
      email: null,
      password: null,
      error: false,
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;

      AuthService.login(this.email, this.password)
        .then((response) => {
          const user = response.data.user;

          console.log(user);

          const dataToPush = {
            token: response.data.token,
            elevation: user.elevation,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            phone: user.phone,
            id: user.id,
            email: user.email
          };

          SessionStorageService.setSessionStorage(dataToPush);

          this.isLoading = false;

          user.elevation === "admin"
            ? this.$router.push("/admin")
            : this.$router.push("/client");
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = true;
          console.error(error.message);
        });
    },
  },
};
</script>

<style scoped>
.login-centered {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-ctn {
  width: 30%;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  margin: 0 auto;
}

.login-ctn h2 {
  margin: 0 0 30px;
  padding: 0;
  color: white;
  text-align: center;
  font-size: 20px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 4px;
}

.login-ctn form {
  display: flex;
  flex-direction: column;
}

.login-ctn form .input-ctn {
  padding-bottom: 10px;
}

.login-ctn form .input-ctn label {
  padding-bottom: 2px;
}

.login-ctn form .submit {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  letter-spacing: 4px;
  border: solid white 1px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 25px;
}

@media (max-width: 700px) {
  .login-ctn {
    width: 90%;
  }
}
</style>
