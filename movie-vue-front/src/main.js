import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import Homepage from './components/Homepage.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import MovieView from './components/MovieView.vue';
import AdminTools from './components/AdminTools.vue';
import Account from './components/Account.vue';
import EmailConfirmation from './components/EmailConfirmation.vue';
import ResetPage from './components/ResetPage.vue'

Vue.use(Router);

const router = new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  routes: [{
    path: "/",
    name: "homepage",
    component: Homepage
  }, {
    path: "/login",
    name: "login",
    component: Login
  }, {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }, {
    path: "/emailconfirmation",
    name: "emailconfirmation",
    component: EmailConfirmation
  }, {
    path: "/user/:hashUsername",
    name: "passwordreset",
    component: ResetPage
  },
  {
    path: "/movie",
    name: "movieview",
    component: MovieView,
    props: route => ({ id: route.query.id, user_id: route.query.user_id })
  }, {
    path: "/admin",
    name: "admin",
    component: AdminTools
  },{
    path: "/account",
    name: "account",
    component: Account,
    props: route => ({user_id: parseInt(route.query.user_id, 10)})
  }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')