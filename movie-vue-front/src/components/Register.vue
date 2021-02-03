<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer></script> 
<template>
  <div class="content">
    <!-- <script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer></script>  -->
    <h1>Register</h1>
    <div>
      <label>Username: </label>
      <input type="text" v-model="username" />
    </div>
    <div>
      <label>First Name: </label>
      <input type="text" v-model="fname" />
    </div>
    <div>
      <label>Last Name: </label>
      <input type="text" v-model="lname" />
    </div>
    <div>
      <label>Street: </label>
      <input type="text" v-model="street" />
      <p v-if="streetError" class="error">{{ this.streetError }}</p>
    </div>
    <div>
      <label>City: </label>
      <input type="text" v-model="city" />
    </div>
    <div>
    <label>State: </label>
    <input type="text" v-model="state" />
    <p v-if="stateError" class="error">{{ this.stateError }}</p>
    </div>
    <div>
    <label>Zip Code: </label>
    <input type="number" v-model="zip_code" />
    <p v-if="zip_codeError" class="error">{{ this.zip_codeError }}</p>
    </div>
    <div>
    <label>Phone: </label>
    <input type="text" v-model="phone" />
    <p v-if="phoneError" class="error">{{ this.phoneError }}</p>
    </div>
    <div>
    <label>Email: </label>
    <input type="text" v-model="email" />
    <p v-if="emailError" class="error">{{ this.emailError }}</p>
    </div>
    <div>
    <label>Password: </label>
    <input type="password" v-model="password" />
    <p v-if="passwordError" class="error">{{ this.passwordError }}</p>
    </div>
    <div>
    <label>Confirm Password: </label>
    <input type="password" v-model="confPassword" />
    </div>
    <p v-if="recaptchaError" class="error">{{ this.recaptchaError }}</p>
    <vue-recaptcha
      :loadRecaptchaScript="true"
      @verify="markRecaptchaAsVerified"
      sitekey="6LcrQjgaAAAAAKfTtfCgsyCTKIdXra4rnkVIz91R"
    ></vue-recaptcha>
    <button v-on:click="createUser" class='button'>Submit</button>
    <a href="/login">Already have an account?&nbsp;<span>Login!</span></a>
    <div v-if="accountCreated">
      <h3>Account successfully created!</h3>
      <p className="email">
        Please <a href="/login">click here</a> to login in...
      </p>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "register",
  data() {
    return {
      username: "",
      fname: "",
      lname: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      email: "",
      password: "",
      confPassword: "",
      phone: "",
      streetError: "",
      stateError: "",
      zip_codeError: "",
      phoneError: "",
      emailError: "",
      passwordError: "",
      recaptchaError: "",
      accountCreated: false,
      recaptchaVerified: false,
    };
  },
  components: { VueRecaptcha },
  methods: {
    createUser() {
      if (this.recaptchaVerified === false) {
        // this.recaptchaRef.current.props.grecaptcha.reset();
        // this.setState({recaptchaError: "Invalid Recaptcha Attempt... Please Try Again!"})
      } else {
        // this.setState({recaptchaError: undefined})
        console.log(this.validateCredentials());
        if (this.validateCredentials().length == 0) {
          console.log(this.recaptchaVerified);
          for (let i = 0; i < Object.keys(this).length; i++) {
            if (Object.keys(this)[i].includes("Error")) {
              this[Object.keys(this)[i]] = "";
            }
          }

          fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
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
              phone: this.phone,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                console.log(data);
                this.accountCreated = true;
              }
            });
        } else {
          // this.recaptchaRef.current.props.grecaptcha.reset();

          this.renderValidation(this.validateCredentials());
        }
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
      if (!streetReg.test(this.street)) {
        validations.push({ field: "street", message: "The Street is invalid" });
      }

      //STATE
      let stateReg = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;
      if (!stateReg.test(this.state)) {
        validations.push({ field: "state", message: "The State is invalid" });
      }

      //ZIP CODE
      let zipCodeReg = /^\d{5}$/;
      if (!zipCodeReg.test(this.zip_code)) {
        validations.push({
          field: "zip_code",
          message: "The Zip Code is invalid",
        });
      }
      //PHONE
      let phoneReg = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
      if (!phoneReg.test(this.phone)) {
        validations.push({
          field: "phone",
          message: "The Phone number is invalid",
        });
      }
      //EMAIL
      let emailReg = /^(?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~])(?:\.?[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+)+@(?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+(?=\.))(?:\.?[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~])+/;
      if (!emailReg.test(this.email)) {
        validations.push({ field: "email", message: "The Email is invalid" });
      }

      if (this.password != this.confPassword) {
        validations.push({
          field: "password",
          message: "Passwords do not match",
        });
      }

      return validations;
    },

    renderValidation(valArr) {
      for (let i = 0; i < Object.keys(this).length; i++) {
        if (Object.keys(this)[i].includes("Error")) {
          this[Object.keys(this)[i]] = "";
        }
      }

      for (let i = 0; i < valArr.length; i++) {
        console.log(this);
        this[`${valArr[i].field}Error`] = valArr[i].message;
      }
    },

    markRecaptchaAsVerified(response) {
      this.recaptchaVerified = true;
      console.log(this.recaptchaVerified);
    },
    checkIfRecaptchaVerified() {
      return this.recaptchaVerified;
    },
  },
};
</script>

<style>
.error {
  color: #ed4337;
  margin:0;
  position: absolute;
  left: 100%;
  width: 100%;
}
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
  display: flex; 
  position: relative;

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