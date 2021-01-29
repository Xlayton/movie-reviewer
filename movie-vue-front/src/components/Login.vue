<template>
  <div>
    <div className="content">
      <h1>Login</h1>
      <p>john.preston@tbeatty.com</p>
      <p>dominique.chaney@tbeatty.com</p>
      <label>Email: </label>
      <input v-model="email" class="email" />
      <br />
      <br />
      <p>ImwH@qxz56t9</p>
      <p>AZfpb+gt61Cm8</p>
      <label>Password: </label>
      <input v-model="password" class="password" type="password" />
      <br />
      <br />
      <button v-on:click="authenticateUser" >Submit</button>
      <br />
      <br />
      <a href="/emailconfirmation">Forgot your Password?</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async authenticateUser() {
      console.log("authenticating......");
      console.log(this.email);
      console.log(this.password);
      await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          email: this.email,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // this.refreshReviews()
            //SET SESSION
            console.log(data);
            window.sessionStorage.setItem("currentUser", data.email);
            // this.props.setUserID(data.id);
            window.sessionStorage.setItem("isLoggedIn", true);
            window.sessionStorage.setItem("userID", data.userId);
            window.sessionStorage.setItem("isAdmin", data.isAdmin);
            // this.setState({
            //   renderReview: true,
            //   user_id: data.userId,
            // });
            window.location.href = "/"
          }
        });
      
    },
  },
};
</script>

<style>
</style>