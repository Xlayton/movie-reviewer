<template>
    <nav class="navbar">
        <router-link id="heading" class="heading" to="/">Movie Reviewer</router-link>
        <div class="loginElements">
            <router-link class="email" v-bind:to="'/account?user_id='+user_id">{{this.email}}</router-link>
            <router-link v-if="isAdmin === '1'" to='/admin'>Admin Tools</router-link>
            <router-link v-if="isLoggedIn" to='/logout'>Logout</router-link>
            <router-link v-if="!isLoggedIn" to='/login'>Login/Register</router-link>
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
        'email'
    ],
    data() {
        return {
            // isLoggedIn: ""
        }
    },
    created(){
        // console.log("Created")
        // console.log(this.isLoggedIn,  window.sessionStorage.getItem("isLoggedIn"))
        }

}
</script>

<style>
.navbar {
    background-color: #333;
    padding: 20px;
}

.navbar a {
    color: #fff;
    font-size: .75em;
    padding-right: 10px;
    text-decoration: none;
}

.loginElements {
    padding-top: 5px;
    display: flex;
    float: right;
    flex-direction: row;
}

.email {
    font-size: 14pt;
    padding-right: 10px;
    margin: 0;
    color: rgb(0, 162, 255);
}

.home a {
    color: rgb(0, 162, 255);
}

.email a {
    color: rgb(0, 162, 255);
}

#heading {
    color: rgb(0, 162, 255);
    font-size: 16pt;
}

@media only screen and (max-width: 600px) {
    .navbar {
        display: flex;
        flex-direction: column;
    }
}

</style>