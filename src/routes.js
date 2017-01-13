import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from './components/auth/Auth'
import Login from './components/auth/Login'
import Register from './components/auth/Register'


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      component: Auth,
      redirect: '/auth/login',
      children: [
        {
          path: 'login',
          component: Login
        },
        {
          path: 'register',
          component: Register
        }
      ]
    }
  ]
})

export default router;
