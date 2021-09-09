import { createRouter, createWebHistory } from 'vue-router';
import localStorageService from '../services/localStorage/localStorage.service';
import AdminCreateUserView from '../views/admin/AdminCreateUserView.vue';
import AdminEditUserView from "../views/admin/AdminEditUserView";
import AdminHomeView from '../views/admin/AdminHomeView.vue';
import Login from '../views/shared/Login.vue';
import PageNotFound from '../views/shared/PageNotFound.vue';
import ProfileView from '../views/shared/ProfileView.vue';
import ClientHome from '../views/client/ClientHome.vue';
import Details from "../views/client/Details.vue";
import MarketPlace from '../views/client/MarketPlace.vue';
import TransactionsView from '../views/client/TransactionsView.vue';

// Routes
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
    path: '/client/transactions',
    name: 'Transactions',
    component: TransactionsView,
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

// Returns if the user is logged in
const isLoggedIn = () => {
  const localStorageData = localStorageService.getUserLocalStorage();
  return !!localStorageData?.token;
}

// Returns if the user is a simple client not admin
const isClient = () => {
  const localStorageData = localStorageService.getUserLocalStorage();
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
      next("/client");
    }
    next();
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.userOnly)) {
    if (isLoggedIn() && !isClient()) {
      next();
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
