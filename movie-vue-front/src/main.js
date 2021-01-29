import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import Homepage from './components/Homepage.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import MovieView from './components/MovieView.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
    path: "/",
    name: "homepage",
    component: Homepage
  }, {
    path: "/login",
    name: "login",
    component: Login
  },{
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/movie",
    name: "movieview",
    component: MovieView,
    props: route => ({ id: route.query.id, user_id: route.query.user_id })
  }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')