<template>
  <div class="admin-ctn">
    <div>
      <h1>
        Bonjour <span v-if="nickname">{{ nickname }}</span
        >, voici vos informations personnelles :
      </h1>
    </div>
    <form action="" method="post" enctype="multipart/form-data">
      <div>
        <label for="name">Nom :</label> <br />
        <input
          type="text"
          name="name"
          v-model="name"
          class="form-control"
          id="name"
          placeholder="Votre nom"
        />
      </div>
      <div>
        <label for="nickname">Prénom : </label>
        <input
          name="nickname"
          class="form-control"
          v-model="nickname"
          type="text"
        />
      </div>
      <div>
        <label for="adress">Adresse : </label>
        <input
          name="adress"
          class="form-control"
          v-model="adress"
          type="text"
        />
      </div>
      <div>
        <label for="tel">Téléphone : </label>
        <input name="tel" class="form-control" v-model="tel" type="tel" />
      </div>
      <div>
        <label for="mail">Mail : </label>
        <input name="mail" class="form-control" v-model="mail" type="mail" />
      </div>
      <div>
        <label for="password">Mot de passe : </label>
        <input
          name="password"
          class="form-control"
          v-model="password"
          type="password"
        />
      </div>
      <div class="input-file">
        <label for="photo">Modifier votre photo : </label> <br />
        <input name="photo" class="file" type="file" />
      </div>
      <div v-if="photo">
        <div>
          <img width="300" :src="photo" alt="image du produit" />
        </div>
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Modifier</button>
      </div>
    </form>
    <div class="informations-ctn"></div>
  </div>
</template>

<script>
export default {
  name: "PersonalInformations",
  data() {
    return {
      name: "Dylan",
      nickname: "Bob",
      adress: null,
      tel: null,
      mail: "bobdylan@gmail.com",
      password: "password",
      photo: null,
    };
  },
};
</script>

<style scoped>
.admin-ctn {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.admin-ctn h1 {
  font-size: 2rem;
  padding-bottom: 20px;
}

.admin-ctn form > div {
  padding-bottom: 12px;
}

.admin-ctn form label {
  padding-bottom: 2px;
}
</style>