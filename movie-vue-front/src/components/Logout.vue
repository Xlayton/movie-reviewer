<template>
  <div></div>
</template>

<script>
export default {
  async created() {
    await window.sessionStorage.removeItem("currentUser");
    await window.sessionStorage.removeItem("isLoggedIn");
    await window.sessionStorage.removeItem("isAdmin");
    window.location.href = "/";
  },
};
</script>

<style>
</style>