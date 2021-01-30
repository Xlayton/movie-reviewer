<template>
  <div className="content">
    <h2>Provide your email to reset your password</h2>
    <br />
    <label>Email: </label>
    <input v-model="email" class="email" />
    <br />
    <br />
    <button v-on:click="sendEmail">Send Email</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    sendEmail() {
      fetch("http://localhost:8080/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          email: this.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    },
  },
};
</script>

<style>
</style>