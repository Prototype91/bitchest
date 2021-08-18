<template>
  <div>
    <div>
      <h1>Vos informations personnelles :</h1>
      <button>Modifier</button>
    </div>
    <div class="informations-ctn">
      <label for="name">Nom : </label>
      <input name="name" v-model="name" type="text" />

      <label for="nickname">Prénom : </label>
      <input name="nickname" v-model="nickname" type="text" />

      <label for="adress">Adresse : </label>
      <input name="adress" v-model="adress" type="text" />

      <label for="tel">Téléphone : </label>
      <input name="tel" v-model="tel" type="tel" />

      <label for="mail">Mail : </label>
      <input name="mail" v-model="mail" type="mail" />

      <label for="password">Mot de passe : </label>
      <input name="password" v-model="password" type="password" />

      <label for="photo">Modifier votre photo : </label>
      <input name="photo" type="file" />
    </div>
  </div>
</template>

<script>
export default {
	name: "PersonalInformations",
	data(){
    return {
      name: 'Dylan',
      nickname: 'Bob',
      adress: null,
			tel: null,
			mail: "bobdylan@gmail.com",
			password: "password",
			photo: null
    }
  },
};
</script>

<style scoped>
</style>