import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import Homepage from './components/Homepage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
    path: "/",
    name: "homepage",
    component: Homepage
  }]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
