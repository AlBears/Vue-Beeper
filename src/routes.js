import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './components/Hello'
import Hello2 from './components/Hello2'

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    {
      path: '/one',
      component: Hello
    },
    {
      path: '/two',
      component: Hello2
    }
  ]
})

export default router;
