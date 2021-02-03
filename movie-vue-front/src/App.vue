<template>
  <div id="app">
    <!-- <div class="header">
      <h1 class="heading">Movie Reviewer</h1>
      <h3>Your one and only stop to all thing's movie reviews!</h3>
    </div> -->
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
/* Heading */
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap');
/* Body */
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

html, body {
  font-family: 'Roboto', sans-serif;
}

h1 h2 h3 h4 h5 h6 {
  font-family: 'Merriweather', serif;
}

#app {
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 42px;
}

.header{
  padding: 15px;
  background-color: #eee;
  color: #333;
  text-align: center;
}

.heading {
  color: rgb(0, 162, 255);
  text-transform: uppercase;
}

.heading a {
  color: rgb(0, 162, 255);
}
</style>
