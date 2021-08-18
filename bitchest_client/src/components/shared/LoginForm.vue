<template>
  <div class="login-ctn">
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
      <input @click="onSubmitForm" class="submit" type="submit" value="SUBMIT">
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmitForm() {
      console.log(this.email, this.password)
    }
  }
};
</script>

<style>
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

@media (max-width: 700px) {
  .login-ctn {
    width: 90%;
  }
}
</style>
