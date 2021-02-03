<template>
  <div>
    <div class="content">
      <h1>Login</h1>
      <div>
        <label>Email: </label>
        <input v-model="email" />
      </div>
      <div>
      <label>Password: </label>
      <input v-model="password" type="password" />
      </div>
      <button v-on:click="authenticateUser" class="button">Submit</button>
      <a href="/register">Don't have an account?&nbsp;<span>Register!</span></a>
      <a href="/emailconfirmation">Forgot your Password?&nbsp;<span>Reset it here!</span></a>
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
      //   console.log(this.password);
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
            window.location.href = "/";
          }
        });
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
input {
  border: none;
  border-bottom: 1px solid #000;
}
input:focus {
  background-color: #efefef;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content > div {
  margin: 7px 0;
}

a {
  color: #000;
}

a span {
  color: #44f;
}

.button {
  color: rgb(0, 162, 255);
  background-color: #fff;
  border: solid 3px;
  border-color: rgb(0, 162, 255);
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 14px;
}

.button:hover {
  background-color: rgb(0, 162, 255);
  color: #eee;
  cursor: pointer;
}
</style>