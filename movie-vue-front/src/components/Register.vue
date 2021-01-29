<template>
    <div className="content">
        <h1>Register</h1>
        <label>Username: </label>
        <input type="text" v-model="username" />
        <br/>
        <br/>
        <label>First Name: </label>
        <input type="text" v-model="fname" />
        <br/>
        <br/>
        <label>Last Name: </label>
        <input type="text" v-model="lname" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <!-- {this.state.streetError ? <p style={{color: "#ED4337"}}>{this.state.streetError}</p> : undefined} -->
        <label>Street: </label>
        <input type="text" v-model="street" />
        <br/>
        <br/>
        <label>City: </label>
        <input type="text" v-model="city" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <!-- {this.state.stateError ? <p style={{color: "#ED4337"}}>{this.state.stateError}</p> : undefined} -->
        <label>State: </label>
        <input type="text" v-model="state" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <!-- {this.state.zip_codeError ? <p style={{color: "#ED4337"}}>{this.state.zip_codeError}</p> : undefined} -->
        <label>Zip Code: </label>
        <input type="number" v-model="zip_code" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <!-- {this.state.phoneError ? <p style={{color: "#ED4337"}}>{this.state.phoneError}</p> : undefined} -->
        <label>Phone: </label>
        <input type="text" v-model="phone" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <!-- {this.state.emailError ? <p style={{color: "#ED4337"}}>{this.state.emailError}</p> : undefined} -->
        <label>Email: </label>
        <input type="text" v-model="email" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <!-- {this.state.passwordError ? <p style={{color: "#ED4337"}}>{this.state.passwordError}</p> : undefined} -->
        <label>Password: </label>
        <input type="password" v-model="password" />
        <br/>
        <br/>
        <label>Confirm Password: </label>
        <input type="password" v-model="confPassword" />
        <br/>
        <br/>
        <!-- {this.state.recaptchaError ? <p style={{color: "#ED4337"}}>{this.state.recaptchaError}</p> : undefined} -->
        <!-- <ReCAPTCHA ref={this.recaptchaRef} sitekey="6LcrQjgaAAAAAKfTtfCgsyCTKIdXra4rnkVIz91R" /> -->
        <button onClick={this.createUser}>Submit</button>
        <!-- {this.state.accountCreated ? (
        <div>
            <h3>Account successfully created!</h3>
            <p className="email">Please <a href="/login">click here</a> to login in...</p>
        </div>
        ) : undefined} -->
    </div>  
</template>

<script>
export default {
    name: "register",
    data() {
        return{
            username: '',
            fname: '',
            lname: '',
            street: '',
            city: '',
            state: '',
            zip_code: '',                
            email: '',
            password: '',
            confPassword: '',
            phone: '',
            accountCreated: false
        };
    },
    methods: {
    }
}
</script>

<style>

</style>