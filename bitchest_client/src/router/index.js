import { createRouter, createWebHistory } from 'vue-router';
import LocalStorageService from '../services/localStorage/localStorage.service';
import AdminCreateUserView from '../views/admin/AdminCreateUserView.vue';
import AdminEditUserView from "../views/admin/AdminEditUserView";
import AdminHomeView from '../views/admin/AdminHomeView.vue';
import Login from '../views/shared/Login.vue';
import CryptoCurrenciesPricesView from '../views/admin/CryptoCurrenciesPricesView.vue'
import PageNotFound from '../views/shared/PageNotFound.vue';
import ProfileView from '../views/shared/ProfileView.vue';
import ClientHome from '../views/public/ClientHome.vue';
import Details from "../views/public/Details.vue";
import MarketPlace from '../views/public/MarketPlace.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/client',
    name: 'ClientHome',
    component: ClientHome,
    meta: { userOnly: true }
  },
  {
    path: '/client/profile',
    name: 'ClientProfile',
    component: ProfileView,
    meta: { userOnly: true }
  },
  {
    path: '/client/market',
    name: 'MarketPlace',
    component: MarketPlace,
    meta: { userOnly: true }
  },
  {
    path: '/client/details/:id',
    name: 'Details',
    component: Details,
    meta: { userOnly: true }
  },
  {
    path: '/admin',
    name: 'AdminHomeView',
    component: AdminHomeView,
    meta: { adminOnly: true }
  },
  {
    path: '/admin/profile',
    name: 'AdminProfile',
    component: ProfileView,
    meta: { adminOnly: true }
  },
  {
    path: '/admin/crypto-prices',
    name: 'CryptoPrices',
    component: CryptoCurrenciesPricesView,
    meta: { adminOnly: true }
  },
  {
    path: '/admin/create',
    name: 'AdminCreateUserView',
    component: AdminCreateUserView,
    meta: { adminOnly: true }
  },
  {
    path: '/admin/update/:id',
    name: 'AdminUpdate',
    component: AdminEditUserView,
    meta: { adminOnly: true }
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'PageNotfound',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const isLoggedIn = () => {
  const localStorageData = LocalStorageService.getUserLocalStorage();
  return !!localStorageData?.token;
}

const isClient = () => {
  const localStorageData = LocalStorageService.getUserLocalStorage();
  return localStorageData?.elevation == 'user';
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.adminOnly)) {
    if (isLoggedIn() && isClient()) {
      next("/client");
      return;
    }
    if (!isLoggedIn()) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guestOnly)) {
    if (isLoggedIn()) {
      isClient() ? next("/client") : next("/admin");
      return;
    }
    next();
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.userOnly)) {
    if (isLoggedIn() && !isClient()) {
      next('/admin');
      return;
    }
    if (!isLoggedIn()) {
      next('/');
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
