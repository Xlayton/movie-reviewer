import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import Homepage from './components/Homepage.vue';
import Login from './components/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
    path: "/",
    name: "homepage",
    component: Homepage
  },{
    path: "/login",
    name: "login",
    component: Login
  }]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
