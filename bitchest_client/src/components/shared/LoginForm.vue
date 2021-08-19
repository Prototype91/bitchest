<template>
  <div class="login-ctn">
    <Loading
      :active="isLoading"
      :is-full-page="fullPage"
      :loader="loader"
      :background-color="backgroundColor"
      :color="color"
    />
    <h2>Login</h2>
    <form>
      <div class="user-data">
        <input type="email" name="email" required v-model="email" />
        <label>Mail</label>
      </div>
      <div class="user-data">
        <input type="password" name="password" required v-model="password" />
        <label>Password</label>
      </div>
      <input @click="login" class="submit" type="submit" value="SUBMIT" />
    </form>
    <p v-if='error' class="error">Email ou mot de passe incorrect ...</p>
  </div>
</template>

<script>
import AuthService from "../../services/authentication/auth.service";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "LoginForm",
  components: {
    Loading,
  },
  data() {
    return {
      email: null,
      password: null,
      error: false,
      isLoading: false,
      fullPage: true,
      loader: "dots",
      backgroundColor: "black",
      color: "white",
      opacity: 1,
    };
  },
  methods: {
    login(event) {
      event.preventDefault();

      this.isLoading = true;

      AuthService.login(this.email, this.password)
        .then((response) => {
          const user = response.data.user;

          this.$root.$emit("login", true);

          const dataToPush= {
            token: response.data.token,
            elevation: user.elevation
          }

          const sessionStorageData = JSON.stringify(dataToPush);
          
          sessionStorage.setItem("token", sessionStorageData);

          this.isLoading = false;

          if (user.elevation === "admin") {
            this.$router.push("/admin");
          } else {
            this.$router.push("/client");
          }
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

.login-ctn .user-data {
  position: relative;
}

.login-ctn .user-data input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: white;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  background: transparent;
}
.login-ctn .user-data label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: white;
  pointer-events: none;
  transition: 0.5s;
}

.login-ctn .user-data input:focus ~ label,
.login-ctn .user-data input:valid ~ label {
  top: -20px;
  left: 0;
  font-size: 12px;
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
