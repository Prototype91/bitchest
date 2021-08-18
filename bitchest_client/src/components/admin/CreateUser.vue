<template>
  <div class="admin-ctn">
    <div>
      <h1>Ajouter un utilisateur :</h1>
      <form action="" method="post" enctype="multipart/form-data">
        <div>
          <label for="name">Nom :</label> <br />
          <input
            type="text"
            name="name"
            v-model="name"
            class="form-control"
            id="name"
            placeholder="Nom"
            required
          />
        </div>
        <div>
          <label for="nickname">Prénom : </label>
          <input
            name="nickname"
            class="form-control"
            v-model="nickname"
            type="text"
            id="nickname"
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
            v-model="mail"
            id="mail"
            type="mail"
            placeholder="Adresse mail"
          />
        </div>
        <div>
          <label for="adress">Adresse : </label>
          <input
            name="adress"
            class="form-control"
            v-model="adress"
            type="text"
            id="adress"
            placeholder="Lieu de résidence"
            required
          />
        </div>
        <div>
          <label for="tel">Téléphone : </label>
          <input name="tel" class="form-control" id="tel" v-model="tel" type="tel" placeholder="Mobile"/>
        </div>
        <div>
          <label for="password">Mot de passe : </label>
          <input
            name="password"
            class="form-control"
            v-model="password"
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
            v-model="password"
            type="password"
            id="password-confirm"
            placeholder="Confirmation du mot de passe"
            required
          />
        </div>
        <button class="btn btn-primary" type="submit">
          Ajouter l'utilisateur
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    name: "CreateUser"
};
</script>

<style>
</style>