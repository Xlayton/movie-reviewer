<template>
  <div id="app">
    <NavigationBar :isLoggedIn="isAuthenticated" :isAdmin="isAdmin" :user_id="userID" :email="userData" />
    <router-view></router-view>
  </div>
</template>

<script>
import "./assets/Style.css"
import NavigationBar from "./components/NavigationBar"
export default {
  name: 'App',
  data() {
    return {
      userData: '',
      userID: undefined,
      isAuthenticated: false,
      isAdmin: false,
    }
  },
  components: {NavigationBar},
  created() {
    this.userData = window.sessionStorage.getItem("currentUser");
    this.userID = window.sessionStorage.getItem("userID");
    this.isAuthenticated = window.sessionStorage.getItem("isLoggedIn");
    this.isAdmin = window.sessionStorage.getItem("isAdmin");
  },
};
</script>

<style>
/* @import './assets/Style.css'; */
</style>
