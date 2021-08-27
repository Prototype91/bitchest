import { createRouter, createWebHistory } from 'vue-router'
import AdminHomeView from '../views/admin/AdminHomeView.vue'
import Login from '../views/Login.vue'
import ClientHome from '../views/public/ClientHome.vue'
import PersonalsInfo from '../views/public/PersonalsInfo.vue'
import AdminCreateUserView from '../views/admin/AdminCreateUserView.vue';
import Details from "../views/public/Details.vue";
import AdminEditUserView from "../views/admin/AdminEditUserView";

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
    path: '/client/informations',
    name: 'ClientPersonals',
    component: PersonalsInfo,
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
    path: '/admin/informations',
    name: 'AdminPersonals',
    component: PersonalsInfo,
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const isLoggedIn = () => {
  let dataToGet = sessionStorage.getItem("token");
  const sessionStorageData = JSON.parse(dataToGet);

  return !!sessionStorageData?.token;
}

const isClient = () => {
  let dataToGet = sessionStorage.getItem("token");
  const sessionStorageData = JSON.parse(dataToGet);

  return sessionStorageData?.elevation == 'user';
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
