<template>
  <div className="content">
    <br />
    <label>Password: </label>
    <input v-model="password" class="password" type="password" />
    <label>Confirm Password: </label>
    <input v-model="passwordConfirm" class="password" type="password" />
    <br />
    <br />
    <button v-on:click="resetPassword" id="resetButton">Reset Password</button>
    <img id="loadingIcon" class="hidden loadingIcon" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    resetPassword() {
    //   console.log(window.location.pathname);
      if (this.password === this.passwordConfirm) {
        document.getElementById("resetButton").classList = "hidden"
        document.getElementById("loadingIcon").classList = "loadingIcon"
        fetch(`http://localhost:8080${window.location.pathname}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams({
            password: this.password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            //TODO Give user prompt that password was changed
            window.location.href = "/"
          });
      }
    },
  },
};
</script>

<style>
.hidden{
    display: none;
}
.loadingIcon{
    width: 30px;
}
</style>