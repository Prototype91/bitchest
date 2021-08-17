<template>
  <nav class="col-md-2 col-lg-1 col-sm-2 navbar-dark">
    <ul class="menu">
      <li>
        <router-link to="/">
          <svg width="77" height="84" viewBox="0 0 77 84" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.8903 4.39471L71.9299 21.5L37.9386 39.2631L4.16675 22.5964L36.8903 4.39471Z" fill="white" stroke="#131517" stroke-width="7" stroke-linejoin="round"/>
            <path d="M3.50879 63.6053V23.0351L38.1579 40.579V81.1491L3.50879 63.6053Z" fill="white" stroke="#131517" stroke-width="7" stroke-linejoin="round"/>
            <path d="M38.158 81.1491V40.7982L72.5878 22.1579V62.5088L38.158 81.1491Z" fill="white" stroke="#131517" stroke-width="7" stroke-linejoin="round"/>
            <path d="M4.82446 41.9693L37.0613 58.8553" stroke="#131517" stroke-width="7"/>
            <path d="M71.4912 40.4342L39.2544 59.0746" stroke="#131517" stroke-width="7"/>
          </svg>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <i class="fas fa-coins"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <i class="fas fa-chart-line"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/"><i class="far fa-user-circle"></i></router-link>
      </li>
      <li>
        <router-link to="/">
          <i class="fas fa-sign-out-alt"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  components: {  },
  name: "NavBar",
};
</script>

<style>
  nav {
    padding: 15px;
    border-radius: 10px;
    background-color: #2F4F4F;
    height: 100%;
  }

  ul.menu {
    height: 100%;
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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul.menu > li:last-of-type {
    margin-top: auto;
  }

  ul.menu > li > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul.menu > li > a:hover {
    background-color: #1E1F23;
    transition: 0.4s linear;
  }

  ul.menu > li > a > * {
    width: 40% !important;
    height: 40% !important;
    color: white;
  }

</style>
