<template>
    <nav class="navbar">
        <router-link to="/">Home</router-link>
        <div class="loginElements">
            <!-- <p class="email"><router-link to='/account'>{{window.sessionStorage.getItem("currentUser")}}</router-link></p> -->
            <router-link v-if="isAdmin === 1" to='/admin'>Admin Tools</router-link>
            <router-link v-if="isLoggedIn" to='/logout'>Logout</router-link>
            <router-link v-if="!isLoggedIn" to='/login'>Login</router-link>
            <router-link v-if="!isLoggedIn" to='/register'>Register</router-link>
            <!-- {{ v-if:"isAdmin" === "1" ? (<router-link to='/admin'>Admin Tools</router-link>) : ""}}
            {{ v-if:"isLoggedIn" && (<router-link to='/logout'>Logout</router-link>)}}
            {{ v-if:!"isLoggedIn" && (<router-link to='/login'>Login</router-link>)}}
            {{ v-if:!"isLoggedIn" && (<router-link to='/register'>Register</router-link>)}} -->
            <!-- <router-link to="/login">Login</router-link> -->
        </div>
    </nav>
</template>

<script>
export default {
    name: "navigationbar",
    props:[
        'isLoggedIn',
        'isAdmin',
        'user_id',
    ],
    data() {
        return {
            // isLoggedIn: ""
        }
    },
    created(){
        console.log("Created")
        console.log(this.isLoggedIn,  window.sessionStorage.getItem("isLoggedIn"))
        }

}
</script>

<style>
/* .navbar {
    background-color: #333;
    padding: 15px;
}

.navbar a {
    color: #fff;
    font-size: 14pt;
    padding-right: 10px;
    text-decoration: none;
}

.loginElements {
    display: flex;
    float: right;
    flex-direction: row;
}

.email {
    font-size: 14pt;
    padding-right: 10px;
    margin: 0;
}

.email a {
    color: rgb(0, 162, 255);
} */

</style>