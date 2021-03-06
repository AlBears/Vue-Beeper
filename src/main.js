// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './routes'
import VueResource from 'vue-resource'
import Auth from './plugins/Auth'
import store from 'src/store'

Vue.use(VueResource);
Vue.use(Auth);

/* Alertify position global */
alertify.defaults.notifier.position = 'top-right';

/* Set global URL with interceptors */
Vue.http.interceptors.push((request, next) => {
  if (request.url[0] === '/') {
    request.url = `${process.env.API}${request.url}`;

    let token = Vue.auth.getToken();
    if (token)
      request.headers.set('Authorization', `Bearer ${token}`);
  }
  next((res) => {
    if (res.status == 422){
      res.body.errors.forEach((e) => alertify.error(e)
    )}
  });
});

/* Configure route guards */
Router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => {
    return record.meta.requiresGuest
  }) && Vue.auth.loggedIn())
  {
    next({
      path: '/newsfeed'
    });
  } else if (to.matched.some((record) => {
    return record.meta.requiresAuth
  }) && ! Vue.auth.loggedIn()){
    next({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store,
  template: '<App/>',
  components: { App }

})
