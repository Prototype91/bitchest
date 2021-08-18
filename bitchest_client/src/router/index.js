import { createRouter, createWebHistory } from 'vue-router'
import AdminHome from '../views/admin/AdminHome.vue'
import Login from '../views/Login.vue'
import ClientHome from '../views/public/ClientHome.vue'

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
