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
    meta: { authOnly: true }
  },
  {
    path: '/client/informations',
    name: 'ClientPersonals',
    component: PersonalsInfo,
    meta: { authOnly: true }
  },
  {
    path: '/client/details/:id',
    name: 'Details',
    component: Details,
    meta: { authOnly: true }
  },
  {
    path: '/admin',
    name: 'AdminHomeView',
    component: AdminHomeView,
    meta: { authOnly: true }
  },
  {
    path: '/admin/informations',
    name: 'AdminPersonals',
    component: PersonalsInfo,
    meta: { authOnly: true }
  },
  {
    path: '/admin/create',
    name: 'AdminCreateUserView',
    component: AdminCreateUserView,
    meta: { authOnly: true }
  },
  {
    path: '/admin/update/:id',
    name: 'AdminUpdate',
    component: AdminEditUserView,
    meta: { authOnly: true }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // if you are not logged in, you will be redirected
    if (!isLoggedIn()) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // if you are logged in, you have the access
    if (isLoggedIn()) {
      next({
        path: "/client",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
