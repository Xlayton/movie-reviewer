import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import Homepage from './components/Homepage.vue';
import Register from './components/Register.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "homepage",
      component: Homepage
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
