<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer></script> 
<template>
    <div className="content">
        <!-- <script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer></script>  -->
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
        <p v-if="streetError" class="error">{{this.streetError}}</p>
        <label>Street: </label>
        <input type="text" v-model="street" />
        <br/>
        <br/>
        <label>City: </label>
        <input type="text" v-model="city" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <p v-if="stateError" class="error">{{this.stateError}}</p>
        <!-- {this.state.stateError ? <p style={{color: "#ED4337"}}>{this.state.stateError}</p> : undefined} -->
        <label>State: </label>
        <input type="text" v-model="state" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <p v-if="zip_codeError" class="error">{{this.zip_codeError}}</p>
        <!-- {this.state.zip_codeError ? <p style={{color: "#ED4337"}}>{this.state.zip_codeError}</p> : undefined} -->
        <label>Zip Code: </label>
        <input type="number" v-model="zip_code" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <p v-if="phoneError" class="error">{{this.phoneError}}</p>
        <!-- {this.state.phoneError ? <p style={{color: "#ED4337"}}>{this.state.phoneError}</p> : undefined} -->
        <label>Phone: </label>
        <input type="text" v-model="phone" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <p v-if="emailError" class="error">{{this.emailError}}</p>
        <!-- {this.state.emailError ? <p style={{color: "#ED4337"}}>{this.state.emailError}</p> : undefined} -->
        <label>Email: </label>
        <input type="text" v-model="email" />
        <br/>
        <br/>
        <!-- DISPLAY ERROR -->
        <p v-if="passwordError" class="error">{{this.passwordError}}</p>
        <!-- {this.state.passwordError ? <p style={{color: "#ED4337"}}>{this.state.passwordError}</p> : undefined} -->
        <label>Password: </label>
        <input type="password" v-model="password" />
        <br/>
        <br/>
        <label>Confirm Password: </label>
        <input type="password" v-model="confPassword" />
        <br/>
        <br/>
        <p v-if="recaptchaError" class="error">{{this.recaptchaError}}</p>
        <vue-recaptcha :loadRecaptchaScript="true" @verify="markRecaptchaAsVerified" sitekey="6LcrQjgaAAAAAKfTtfCgsyCTKIdXra4rnkVIz91R"></vue-recaptcha>
        <button v-on:click="createUser">Submit</button>
        <div v-if="accountCreated">
            <h3>Account successfully created!</h3>
            <p className="email">Please <a href="/login">click here</a> to login in...</p>
        </div>
    </div>  
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
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
            streetError: false,
            stateError: false,
            zip_codeError: false,
            phoneError: false,
            emailError: false,
            passwordError: false,
            recaptchaError: false,
            accountCreated: false,
            recaptchaVerified: false,
        };
    },
    components: { VueRecaptcha },
    methods: {
        createUser() {
            if(this.recaptchaVerified === false) {
                // this.recaptchaRef.current.props.grecaptcha.reset();
                // this.setState({recaptchaError: "Invalid Recaptcha Attempt... Please Try Again!"})
            } else {
                // this.setState({recaptchaError: undefined})
                console.log(this.validateCredentials());
                if(this.validateCredentials().length == 0){
                    console.log(this.recaptchaVerified);
                    let tempData = {...this.data};
                    for (let i = 0; i < Object.keys(this.data).length; i++) {
                        if(Object.keys(tempData)[i].includes("Error")){
                            tempData[Object.keys(tempData)[i]] = undefined;
                        }
                    }
                    this.data = tempData;
        
                    fetch('http://localhost:8080/api/users', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        body: new URLSearchParams({
                            username: this.username,
                            fname: this.fname,
                            lname: this.lname,
                            street: this.street,
                            city: this.city,
                            state: this.state,
                            zip_code: this.zip_code,                
                            email: this.email,
                            password: this.password,
                            phone: this.phone
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data){
                            console.log(data);
                            this.accountCreated = true
                        }
                    })
                } 
                // else {
                //     this.recaptchaRef.current.props.grecaptcha.reset();

                //     this.renderValidation(this.validateCredentials());
                // }
            }
            // fetch(`http://localhost:8080/api/recaptcha`, {
            //     method: "POST",
            //     body: new URLSearchParams({
            //         recaptcha_token: this.recaptchaVerified
            //     })
            // })
            // .then(res => res.json())
            // .then(data => {
            // })
            // .catch(err => console.log(err))
        },
        validateCredentials() {
            var validations = [];
            //STREET
            let streetReg = /^[ \w]{3,}([A-Za-z]\.?)/;
            if(!streetReg.test(this.street)){
                validations.push({field: "street", message: "The Street is invalid"})
            }

            //STATE
            let stateReg = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;
            if(!stateReg.test(this.state)){
                validations.push({field: "state", message: "The State is invalid"})
            }

            //ZIP CODE
            let zipCodeReg = /^\d{5}$/;
            if(!zipCodeReg.test(this.zip_code)){
                validations.push({field: "zip_code", message: "The Zip Code is invalid"})
            }
            //PHONE
            let phoneReg = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
            if(!phoneReg.test(this.phone)){
                validations.push({field: "phone", message: "The Phone number is invalid"})
            }
            //EMAIL
            let emailReg = /^(?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~])(?:\.?[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+)+@(?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+(?=\.))(?:\.?[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~])+/;
            if(!emailReg.test(this.email)){
                validations.push({field: "email", message: "The Email is invalid"})
            }

            if(this.state.password != this.confPassword){
                validations.push({field: "password", message: "Passwords do not match"})
            }

            return validations;
        },
            
        renderValidation(valArr) {
            let tempData = {...this.data};
                for (let i = 0; i < Object.keys(this.data).length; i++) {
                    if(Object.keys(tempData)[i].includes("Error")){
                        tempData[Object.keys(tempData)[i]] = undefined;
                    }
                }
            this.data = tempData;

            for (let i = 0; i < valArr.length; i++) {
                let newData = {};
                newData[`${valArr[i].field}Error`] = valArr[i].message;
                this.setState(newData);
            }
        },

        markRecaptchaAsVerified(response) {
            this.recaptchaVerified = true;
            console.log(this.recaptchaVerified);
        },
        checkIfRecaptchaVerified() {
            return this.recaptchaVerified;
        }
    }
}
</script>

<style>

</style>