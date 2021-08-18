import { createRouter, createWebHistory } from 'vue-router'
import AdminHome from '../views/admin/AdminHome.vue'
import Login from '../views/Login.vue'
import ClientHome from '../views/public/ClientHome.vue'
import PersonalsInfo from '../views/public/PersonalsInfo.vue'
import Create from '../views/admin/Create.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/client',
    name: 'ClientHome',
    component: ClientHome
  },
  {
    path: '/client/informations',
    name: 'ClientPersonals',
    component: PersonalsInfo
  },
  {
    path: '/admin/informations',
    name: 'AdminPersonals',
    component: PersonalsInfo
  },
  {
    path: '/admin/create',
    name: 'AdminCreate',
    component: Create
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
