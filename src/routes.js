import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from './components/auth/Auth'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dash from './components/dash/Dash'
import Newsfeed from './components/dash/Newsfeed'


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Dash,
      redirect: '/newsfeed',
      children: [
        {
          path: 'newsfeed',
          component: Newsfeed
        }
      ]
    },
    {
      path: '/auth',
      component: Auth,
      redirect: '/auth/login',
      children: [
        {
          path: 'login',
          component: Login,
          meta: { requiresGuest: true }
        },
        {
          path: 'register',
          component: Register,
          meta: { requiresGuest: true }
        }
      ]
    }
  ]
})

export default router;
