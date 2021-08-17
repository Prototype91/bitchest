<template>
  <nav class="col-md-2 col-lg-1 col-sm-2 navbar-dark">
    <Avatar :name="toto" />
    <span class="sepa"></span>
    <ul class="menu">
      <li>
        <router-link to="/"
          ><span class="navbar-brand mb-0 h1">Link</span></router-link
        >
      </li>
      <li>
        <router-link to="/"
          ><span class="navbar-brand mb-0 h1">Link</span></router-link
        >
      </li>
      <li>
        <router-link to="/"><span class="navbar-brand mb-0 h1">Link</span></router-link>
      </li>
      <li>
        <router-link to="/">
          <span class="navbar-brand mb-0 h1">Link</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import Avatar from './Avatar.vue';

export default {
  components: { Avatar },
  name: "NavBar",
};
</script>

<style>
  nav {
    padding: 15px;
    border-radius: 10px;
    background-color: #2F4F4F;
    height: 95%;
    margin-top: auto;
    margin-bottom: auto;
  }

  ul.menu {
    height: calc(100% - 111px); /* 90px de hauteur avatar + 1px span sepa + 20px de padding */
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  ul.menu > li {
    width: 90px;
    height: 90px;
  }

  ul.menu >li:last-of-type {
    margin-top: auto;
  }

</style>
