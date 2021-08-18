<template>
  <nav>
    <div class="logo-ctn">
      <router-link class="link-menu" to="/">
        <svg
          width="77"
          height="84"
          viewBox="0 0 77 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.8903 4.39471L71.9299 21.5L37.9386 39.2631L4.16675 22.5964L36.8903 4.39471Z"
            fill="white"
            stroke="#131517"
            stroke-width="7"
            stroke-linejoin="round"
          />
          <path
            d="M3.50879 63.6053V23.0351L38.1579 40.579V81.1491L3.50879 63.6053Z"
            fill="white"
            stroke="#131517"
            stroke-width="7"
            stroke-linejoin="round"
          />
          <path
            d="M38.158 81.1491V40.7982L72.5878 22.1579V62.5088L38.158 81.1491Z"
            fill="white"
            stroke="#131517"
            stroke-width="7"
            stroke-linejoin="round"
          />
          <path
            d="M4.82446 41.9693L37.0613 58.8553"
            stroke="#131517"
            stroke-width="7"
          />
          <path
            d="M71.4912 40.4342L39.2544 59.0746"
            stroke="#131517"
            stroke-width="7"
          />
        </svg>
      </router-link>
    </div>
    <ul id="menu">
      <li>
        <router-link class="link-menu" to="/">
          <i class="fas fa-coins"></i>
        </router-link>
      </li>
      <li>
        <router-link class="link-menu" to="/">
          <i class="fas fa-chart-line"></i>
        </router-link>
      </li>
      <li>
        <router-link class="link-menu" to="/"
          ><i class="far fa-user-circle"></i
        ></router-link>
      </li>
      <li>
        <router-link class="link-menu" to="/">
          <i class="fas fa-sign-out-alt"></i>
        </router-link>
      </li>
    </ul>
    <Burger />
  </nav>
</template>

<script>
import Burger from "./Burger.vue";

export default {
  components: { Burger },
  name: "Navigation",
};
</script>

<style scoped>
nav {
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);;
  height: 100%;
}

#menu {
  height: calc(100% - 90px);
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

#menu > li,
.logo-ctn {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#menu > li:last-of-type {
  margin-top: auto;
}

.link-menu {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.link-menu:hover {
  background-color: #1e1f23;
  transition: 0.4s linear;
}

.link-menu > * {
  width: 30% !important;
  height: 30% !important;
  color: white;
}

@media screen and (max-width: 768px) {
  nav {
    padding: 7.5px;
    border-radius: 10px;
    background-color: #2f4f4f;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-ctn {
    width: 70px;
    height: 70px;
  }

  #menu.menu-smartphone {
    width: auto;
    display: flex;
    flex-direction: column;
    top: 70px;
    z-index: 999999999;
    right: 5px;
    position: absolute;
    background-color: #2f4f4f;
    height: auto;
  }

  #menu.menu-smartphone li {
    padding: 10px 10px;
  }

  #menu {
      flex-direction: row;
    }

    #menu > li {
      width: 55px;
      height: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #menu > li:last-of-type {
      margin: 0;
      /* margin-left: auto; */
    }

  #menu {
    display: none;
  }

  .link-menu > * {
  width: 50% !important;
  height: 50% !important;
  color: white;
  }
}
</style>
