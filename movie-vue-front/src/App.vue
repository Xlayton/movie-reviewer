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
/* CSS RESET */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

/* Heading */
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap');
/* Body */
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
/* HOME BUTTON */
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');

html, body {
  font-family: 'Roboto', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Merriweather', serif;
  margin: 15px 0px;
}

p {
  margin: 15px 0px;
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
  font-family: 'Abril Fatface', cursive;
}

.heading a {
  color: rgb(0, 162, 255);
}
</style>
