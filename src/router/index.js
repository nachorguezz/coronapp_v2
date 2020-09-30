import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import TravelMap from "@/components/TravelMap";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
    {
      path: '/map',
      name: 'Map',
      component: TravelMap
    }
]

const router = new VueRouter({
  routes
})

export default router
