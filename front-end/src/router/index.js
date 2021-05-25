import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Dashboard from '../views/dashboard.vue'

Vue.use(VueRouter)

let token = localStorage.getItem("token")

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Sign UP',
    component: SignUp,
    beforeEnter: (to, from, next) => {
      if(!token) {
        next();
      } else {
        next('/dashboard');
      }
    }
  },
  {
    path: '/login',
    name: 'Log IN',
    component: LogIn,
    beforeEnter: (to, from, next) => {
      if(!token) {
        next();
      } else {
        next('/dashboard');
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if(!token) {
        next('login');
      } else {
        next();
      }
    }
  }
]
export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})