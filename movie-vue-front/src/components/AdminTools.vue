<template>
  <div class="userList">
    <div class="userRow" v-for="user in users" :key="user[0]">
      <p className="userAttribute">{{ user[0] }}</p>
      <p className="userAttribute">{{ user[1] }}</p>
      <p className="userAttribute">{{ user[2] }}</p>
      <p className="userAttribute">{{ user[3] }}</p>
      <p className="userAttribute">{{ user[8] }}</p>
      <p className="userAttribute">{{ user[10] }}</p>
      <p className="userAttribute" v-if="user[11] === 1">Admin</p>
      <p className="userAttribute" v-if="user[11] !== 1">User</p>
      <!-- {user[11] === 1 ? (<p className="userAttribute">Admin</p>) : (<p className="userAttribute">User</p>)} -->
      <!-- {/* Ignore user one because this is the common test user */} -->
      <button
        v-if="currentId !== user[0] && user[0] !== 1"
        :id="user[0]"
        v-on:click="makeAdmin(user[0], user[11])"
      >
        Toggle Admin
      </button>
      <button
        v-if="currentId !== user[0] && user[0] !== 1"
        :id="user[0]"
        v-on:click="deleteUser(user[0])"
      >
        Delete User
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      currentId: NaN,
      confirmDelete: false,
    };
  },
  created() {
    this.currentId = parseInt(window.sessionStorage.getItem("userID"));
    // console.log(currentId)
    this.getUsers();
  },
  methods: {
    getUsers() {
      fetch("http://localhost:8080/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data.length);
            this.users = data;
          }
        });
    },
    deleteUser(id) {
      // console.log(this.state.confirmDelete)
      if (this.confirmDelete) {
        document.getElementById(id).innerHTML = "Deleted";
        this.confirmDelete = false;
        console.log(id);
        fetch("http://localhost:8080/api/users", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams({
            id: id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              // console.log(data);
              this.getUsers();
            }
          });
      } else {
        document.getElementById(id).innerHTML = "Confirm Delete";
        document.getElementById(id).style.backgroundColor = "red";
        document.getElementById(id).style.color = "white";
        this.confirmDelete = true;
        setTimeout(() => {
          if (document.getElementById(id)) {
            this.confirmDelete = false;
            document.getElementById(id).innerHTML = "Delete User";
            document.getElementById(id).style.backgroundColor = "";
            document.getElementById(id).style.color = "";
          }
        }, 3000);
      }
    },
    makeAdmin(id, isAdmin) {
      console.log(id, isAdmin);
      fetch("http://localhost:8080/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          id: id,
          isAdmin: isAdmin===1,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data);
            this.getUsers();
          }
        });
    },
  },
};
</script>

<style>
.userList {
  width: 70%;
}
.userAttribute {
  width: 12%;
  padding-left: 10px;
}
.userRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>