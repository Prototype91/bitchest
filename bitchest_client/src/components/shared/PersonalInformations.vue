<template>
  <div>
		<div>
  		<h1>Vos informations personnelles :</h1>
			<button>Modifier</button>
		</div>
		<div class="informations-ctn">
			<label for="name">Nom : </label>
			<input name="name" type="text">

			<label for="nickname">Prénom : </label>
			<input name="nickname" type="text">

			<label for="adress">Adresse : </label>
			<input name="adress" type="text">

			<label for="tel">Téléphone : </label>
			<input name="tel" type="tel">

			<label for="mail">Mail : </label>
			<input name="mail" type="mail">

			<label for="password">Mot de passe : </label>
			<input name="password" type="password">

			<label for="photo">Modifier votre photo : </label>
			<input name="photo" type="file">
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>