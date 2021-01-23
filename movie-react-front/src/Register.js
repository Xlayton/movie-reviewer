import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

//Self contained, should have a setter for the parent for when user auths
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }

        // this.authenticateUser = this.authenticateUser.bind(this);
    }

    //TODO - This is just a copy from login - needs to be fleshed out later
    handleUsername = evt => {
        this.setState({username: evt.target.value});
    }

    handleFirstName = evt => {
        this.setState({fname: evt.target.value});
    }

    handleLastName = evt => {
        this.setState({lname: evt.target.value});
    }

    handleStreet = evt => {
        this.setState({street: evt.target.value});
    }

    handleCity = evt => {
        this.setState({city: evt.target.value});
    }

    handleState = evt => {
        this.setState({state: evt.target.value});
    }

    handleZipCode = evt => {
        this.setState({zip_code: evt.target.value});
    }

    handleEmail = evt => {
        this.setState({email: evt.target.value});
    }

    handlePassword = evt => {
        this.setState({password: evt.target.value});
    }

    handleConfirmPassword = evt => {
        this.setState({confPassword: evt.target.value})
    }

    handlePhone = evt => {
        this.setState({phone: evt.target.value});
    }

    recaptchaRef = React.createRef();

    createUser = async() => {
        fetch(`http://localhost:8080/api/recaptcha`, {
            method: "POST",
            body: new URLSearchParams({
                recaptcha_token: this.recaptchaRef.current.props.grecaptcha.getResponse()
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === false) {
                this.recaptchaRef.current.props.grecaptcha.reset();
                this.setState({recaptchaError: "Invalid Recaptcha Attempt... Please Try Again!"})
            } else {
                this.setState({recaptchaError: undefined})
                if(this.validateCredentials().length == 0){
                    let tempState = {...this.state};
                    for (let i = 0; i < Object.keys(this.state).length; i++) {
                        if(Object.keys(tempState)[i].includes("Error")){
                            tempState[Object.keys(tempState)[i]] = undefined;
                        }
                    }
                    this.setState(tempState);
        
                fetch('http://localhost:8080/api/users', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        body: new URLSearchParams({
                            username: this.state.username,
                            fname: this.state.fname,
                            lname: this.state.lname,
                            street: this.state.street,
                            city: this.state.city,
                            state: this.state.state,
                            zip_code: this.state.zip_code,                
                            email: this.state.email,
                            password: this.state.password,
                            phone: this.state.phone
                        })
                      })
                    .then(res => res.json())
                    .then(data => {
                        if(data){
                            console.log(data);
                            this.setState({
                                accountCreated: true
                            })
                        }
                    })
                } else {
                    this.recaptchaRef.current.props.grecaptcha.reset();

                    this.renderValidation(this.validateCredentials());
                }
            }
        })
        .catch(err => console.log(err))
            }

    validateCredentials = () => {
        var validations = [];
        //STREET
        let streetReg = /^[ \w]{3,}([A-Za-z]\.?)/;
        if(!streetReg.test(this.state.street)){
            validations.push({field: "street", message: "The Street is invalid"})
        }

        //STATE
        let stateReg = /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/;
        if(!stateReg.test(this.state.state)){
            validations.push({field: "state", message: "The State is invalid"})
        }

        //ZIP CODE
        let zipCodeReg = /^\d{5}$/;
        if(!zipCodeReg.test(this.state.zip_code)){
            validations.push({field: "zip_code", message: "The Zip Code is invalid"})
        }
        //PHONE
        let phoneReg = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
        if(!phoneReg.test(this.state.phone)){
            validations.push({field: "phone", message: "The Phone number is invalid"})
        }
        //EMAIL
        let emailReg = /^(?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~])(?:\.?[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+)+\@(?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+(?=\.))(?:\.?[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~])+/;
        if(!emailReg.test(this.state.email)){
            validations.push({field: "email", message: "The Email is invalid"})
        }

        if(this.state.password != this.state.confPassword){
            validations.push({field: "password", message: "Passwords do not match"})
        }

        return validations;
    }

    renderValidation = valArr => {
        let tempState = {...this.state};
            for (let i = 0; i < Object.keys(this.state).length; i++) {
                if(Object.keys(tempState)[i].includes("Error")){
                    tempState[Object.keys(tempState)[i]] = undefined;
                }
            }
        this.setState(tempState);

        for (let i = 0; i < valArr.length; i++) {
            let newState = {};
            newState[`${valArr[i].field}Error`] = valArr[i].message;
            this.setState(newState);
        }
    }

    //TODO - Validation for form fields

    render() {
        return (
            <div className="content">
                <h1>Register</h1>
                <label>Username: </label>
                <input type="text" value={this.state.username} onChange={this.handleUsername} />
                <br/>
                <br/>
                <label>First Name: </label>
                <input type="text" value={this.state.fname} onChange={this.handleFirstName} />
                <br/>
                <br/>
                <label>Last Name: </label>
                <input type="text" value={this.state.lname} onChange={this.handleLastName} />
                <br/>
                <br/>
                {this.state.streetError ? <p style={{color: "#ED4337"}}>{this.state.streetError}</p> : undefined}
                <label>Street: </label>
                <input type="text" value={this.state.street} onChange={this.handleStreet} />
                <br/>
                <br/>
                <label>City: </label>
                <input type="text" value={this.state.city} onChange={this.handleCity} />
                <br/>
                <br/>
                {this.state.stateError ? <p style={{color: "#ED4337"}}>{this.state.stateError}</p> : undefined}
                <label>State: </label>
                <input type="text" value={this.state.state} onChange={this.handleState} />
                <br/>
                <br/>
                {this.state.zip_codeError ? <p style={{color: "#ED4337"}}>{this.state.zip_codeError}</p> : undefined}
                <label>Zip Code: </label>
                <input type="number" value={this.state.zip_code} onChange={this.handleZipCode} />
                <br/>
                <br/>
                {this.state.phoneError ? <p style={{color: "#ED4337"}}>{this.state.phoneError}</p> : undefined}
                <label>Phone: </label>
                <input type="text" value={this.state.phone} onChange={this.handlePhone} />
                <br/>
                <br/>
                {this.state.emailError ? <p style={{color: "#ED4337"}}>{this.state.emailError}</p> : undefined}
                <label>Email: </label>
                <input type="text" value={this.state.email} onChange={this.handleEmail} />
                <br/>
                <br/>
                {this.state.passwordError ? <p style={{color: "#ED4337"}}>{this.state.passwordError}</p> : undefined}
                <label>Password: </label>
                <input type="password" value={this.state.password} onChange={this.handlePassword} />
                <br/>
                <br/>
                <label>Confirm Password: </label>
                <input type="password" value={this.state.confPassword} onChange={this.handleConfirmPassword} />
                <br/>
                <br/>
                {/* <input type="submit" value="Submit"/> */}
                {this.state.recaptchaError ? <p style={{color: "#ED4337"}}>{this.state.recaptchaError}</p> : undefined}
                <ReCAPTCHA ref={this.recaptchaRef} sitekey="6LcrQjgaAAAAAKfTtfCgsyCTKIdXra4rnkVIz91R" />
                <button onClick={this.createUser}>Submit</button>
                {this.state.accountCreated ? (
                <div>
                    <h3>Account successfully created!</h3>
                    <p className="email">Please <a href="/login">click here</a> to login in...</p>
                </div>
                ) : undefined}
            </div>
        )
    }
}