<template>
  <div class="admin-ctn">
    <Loader :isLoading="isLoading" />
    <div>
      <h1>Modifier cet Utilisateur :</h1>
      <form>
        <div>
          <label for="lastname">Nom :</label> <br />
          <input
            type="text"
            name="lastname"
            v-model="user.firstname"
            :value="currentUserData.firstname"
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
            :value="currentUserData.lastname"
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
            :value="currentUserData.email"
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
            :value="currentUserData.address"
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
            :value="currentUserData.phone"
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
            :value="currentUserData.password"
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
        <button
          @click="editUser($event, currentUserData.id)"
          class="btn btn-primary"
          type="submit"
        >
          Modifier l'utilisateur
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditUserForm",
  props: {
    currentUserData: {
      type: Object,
      required: true,
    },
  },
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
      isLoading: false,
    };
  },
  mounted() {
    const userId = this.$route.params.id;
    console.log(userId);
  },
};
</script>

<style scoped>
</style>
