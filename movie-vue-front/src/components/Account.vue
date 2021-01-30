<template>
  <div>
    <div>
      <p v-if="emailError" class="error-text">{{ this.emailError }}</p>
      <label><span class="required-marker">*</span>Email: </label>
      <input type="email" v-model="email" />
    </div>
    <div>
      <label><span class="required-marker">*</span>Username: </label>
      <input type="text" v-model="username" />
    </div>
    <div>
      <label><span class="required-marker">*</span>First Name: </label>
      <input type="text" v-model="fname" />
    </div>
    <div>
      <label><span class="required-marker">*</span>Last Name: </label>
      <input type="text" v-model="lname" />
    </div>
    <div>
      <p v-if="streetError" class="error-text">{{ this.streetError }}</p>
      <label><span class="required-marker">*</span>Street: </label>
      <input type="text" v-model="street" />
    </div>
    <div>
      <label><span class="required-marker">*</span>City: </label>
      <input type="text" v-model="city" />
    </div>
    <div>
      <p v-if="stateError" class="error-text">{{ this.stateError }}</p>
      <label><span class="required-marker">*</span>State: </label>
      <input type="text" v-model="state" />
    </div>
    <div>
      <p v-if="zip_codeError" class="error-text">
        {{ this.zip_codeError }}
      </p>
      <label><span class="required-marker">*</span>Zip Code: </label>
      <input type="text" v-model="zip_code" />
    </div>
    <div>
      <p v-if="phoneError" class="error-text">{{ this.phoneError }}</p>
      <label><span class="required-marker">*</span>Phone: </label>
      <input type="phone" v-model="phone" />
    </div>
    <div>
      <label><span class="required-marker">*</span>Current Password: </label>
      <input type="password" v-model="old_password" />
    </div>
    <div>
      <label>New Password: </label>
      <input type="password" v-model="new_password" />
    </div>
    <button v-on:click="onUpdateUser">Update</button>

    <!-- <ReviewList
      editReview="{this.editReview}"
      handleRating="{this.handleRating}"
      handleReview="{this.handleReview}"
      reviews="{this.state.user_reviews}"
      user_review_id="{this.state.user_data.user_id}"
      refreshReviews="{this.refreshReviews}"
    /> -->
  </div>
</template>

<script>
export default {
  name: "account",
  props: ["user_id"],
  data() {
    return {
      email: "",
      username: "",
      fname: "",
      lname: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      phone: "",
      old_password: "",
      new_password: "",
      emailError: "",
      streetError: "",
      stateError: "",
      phoneError: "",
      zip_codeError: "",
    };
  },
  methods: {
    onUpdateUser() {
      const errors = this.validateCredentials();
      if (errors.length === 0) {
        this.renderValidation(errors);
        let body = new URLSearchParams({
          user_id: this.user_id,
          email: this.email,
          username: this.username,
          fname: this.fname,
          lname: this.fname,
          street: this.street,
          city: this.city,
          state: this.state,
          zip_code: this.zip_code,
          phone: this.phone,
          old_password: this.old_password,
          new_password: this.new_password,
        });
        console.log(body.toString());
        fetch(`http://localhost:8080/api/users`, {
          method: "PUT",
          body: body,
        })
          .then((res) => {
            if (!res.ok) throw res;
            res.json();
          })
          .then((data) => console.log(data))
          .catch((err) => {
            err.text().then((txt) => console.log(txt));
          });
      } else {
        this.renderValidation(errors);
      }
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
      console.log(this.email);
      if (!emailReg.test(this.email)) {
        validations.push({ field: "email", message: "The Email is invalid" });
      }

      return validations;
    },
    renderValidation(valArr) {
      console.log(this);
      for (let i = 0; i < Object.keys(this).length; i++) {
        if (Object.keys(this)[i].includes("Error")) {
          this[Object.keys(this)[i]] = undefined;
        }
      }

      for (let i = 0; i < valArr.length; i++) {
        this[`${valArr[i].field}Error`] = valArr[i].message;
      }
    },
  },
  created() {
    console.log(this);
    fetch(`http://localhost:8080/api/users?user_id=${this.user_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.username = data[0][1];
        this.fname = data[0][2];
        this.lname = data[0][3];
        this.street = data[0][4];
        this.city = data[0][5];
        this.state = data[0][6];
        this.zip_code = data[0][7];
        this.email = data[0][8];
        this.phone = data[0][10];
        this.old_password = "";
        this.new_password = "";
      });
  },
};
</script>

<style>
.error-text {
  color: #ed4337;
}

.required-marker {
  color: #f00;
}
</style>