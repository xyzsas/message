import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  routes
})

export default router
