<template>
  <div id="smartphone-menu" @click="burgerClic">
    <div class="burger-menu"></div>
  </div>
</template>

<script>
export default {
  name: "BurgerMenu",
  methods: {
    burgerClic() {
      let smMenu = document.getElementById("smartphone-menu");
      let menu = document.getElementById("menu");
      if (getComputedStyle(menu, null).display === "none") {
        menu.classList.add("menu-smartphone");
        smMenu.classList.add("open");
        // Ferme le menu en au clic outside
        document.addEventListener("click", function (e) {
          if (
            !e.target.classList.contains("open") &&
            !e.target.classList.contains("burger-menu")
          ) {
            menu.classList.remove("menu-smartphone");
            smMenu.classList.remove("open");
            removeEventListener("click", document);
          }
        });
      } else {
        menu.classList.remove("menu-smartphone");
        smMenu.classList.remove("open");
      }
    },
  },
};
</script>

<style>
#smartphone-menu {
  width: 40px;
  height: 40px;
  padding: 0 5px;
  position: relative;
  display: none;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  color: black;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.burger-menu {
  width: 100%;
  height: 2px;
  background: white;
  border-radius: 5px;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.burger-menu::before,
.burger-menu::after {
  content: "";
  position: absolute;
  width: calc(100% - 10px);
  height: 2px;
  background: white;
  border-radius: 5px;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.burger-menu::before {
  -webkit-transform: translateY(-10px);
  -ms-transform: translateY(-10px);
  transform: translateY(-10px);
}

.burger-menu::after {
  -webkit-transform: translateY(10px);
  -ms-transform: translateY(10px);
  transform: translateY(10px);
}

#smartphone-menu.open .burger-menu {
  -webkit-transform: translateX(-50px);
  -ms-transform: translateX(-50px);
  transform: translateX(-50px);
  background: transparent;
}

#smartphone-menu.open .burger-menu::before {
  -webkit-transform: rotate(45deg) translate(35px, -35px);
  -ms-transform: rotate(45deg) translate(35px, -35px);
  transform: rotate(45deg) translate(35px, -35px);
  width: 30px;
}

#smartphone-menu.open .burger-menu::after {
  -webkit-transform: rotate(-45deg) translate(35px, 35px);
  -ms-transform: rotate(-45deg) translate(35px, 35px);
  transform: rotate(-45deg) translate(35px, 35px);
  width: 30px;
}

@media (max-width: 768px) {
  #smartphone-menu {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}
</style>