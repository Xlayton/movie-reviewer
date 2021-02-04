<template>
  <div class="userList">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>User/Admin</th>
          <th>Toggle Admin</th>
          <th>Delete Account</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user[0]">
          <td>{{ user[0] }})</td>
          <td>{{ user[1] }}</td>
          <td>{{ user[2] }}</td>
          <td>{{ user[3] }}</td>
          <td>{{ user[8] }}</td>
          <td class="phone">{{ user[10] }}</td>
          <td v-if="user[11] === 1">Admin</td>
          <td v-if="user[11] !== 1">User</td>
          <td>
            <button
              class="button black"
              v-if="currentId !== user[0]"
              :id="user[0]"
              v-on:click="makeAdmin(user[0], user[11])"
            >
              Toggle Admin
            </button>
          </td>
          <td>
            <button
              class="button black"
              v-if="currentId !== user[0]"
              :id="user[0]"
              v-on:click="deleteUser(user[0])"
            >
              Delete User
            </button>
          </td>
        </tr>
        <br/>
        <br/>
      </tbody>
    </table>
    <!-- <div class="userRow" v-for="user in users" :key="user[0]">
      <div>
        <p className="userAttribute"></p>
      </div>
      <div class="username">
        <p className="userAttribute">{{ user[1] }}</p>
      </div>
      <div class="firstName">
        <p className="userAttribute">{{ user[2] }}</p>
      </div>
      <div class="lastName">
        <p className="userAttribute">{{ user[3] }}</p>
      </div>
      <div class="email">
        <p className="userAttribute">{{ user[8] }}</p>
      </div>
      <div class="phone">
        <p className="userAttribute">{{ user[10] }}</p>
      </div>
      <p className="userAttribute" v-if="user[11] === 1">Admin</p>
      <p className="userAttribute" v-if="user[11] !== 1">User</p> -->
      <!-- {user[11] === 1 ? (<p className="userAttribute">Admin</p>) : (<p className="userAttribute">User</p>)} -->
      <!-- {/* Ignore user one because this is the common test user */} -->
      <!-- <button
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
    </div> -->
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

<style scoped>
.userList {
  width: 90%;
}

.userList p {
  margin: 10px;
}

.username {
  width: 100px;
  text-align: left;
  margin-right: 25px;
}

table {
  border-spacing: 10px;
}

thead th {
  border-bottom: 2px solid black;
}

td {
  width: auto;
  text-align: center;
}

.underline {
  width: 90%;
}

.userAttribute {
  width: 12%;
  padding-right: 100px;
}

.userRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-end;
  text-align: left;
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

.large {
  padding: 15px 30px;
  border-radius: 2px;
  font-size: 18px;
  text-transform: uppercase;
}

.black{
  color: rgb(41, 41, 41);
  background-color: #fff;
  border: solid 3px;
  border-color: rgb(41, 41, 41);
  padding: 5px 10px;
  font-size: 12pt;
}

.black:hover {
  background-color: rgb(41, 41, 41);
  color: #eee;
  cursor: pointer;
}

</style>