import React from 'react';

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
            passwordMatch: false
        }

        // this.authenticateUser = this.authenticateUser.bind(this);
        this.renderPasswordMatch = this.renderPasswordMatch.bind(this);
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
        this.setState({confPassword: evt.target.value});

        if(this.state.confPassword != this.state.password){
            this.setState({
                passwordMatch: false
            })
        } else {
            this.setState({
                passwordMatch: true
            })
        }
    }

    handlePhone = evt => {
        this.setState({phone: evt.target.value});
    }

    createUser = async() => {
        await fetch('http://localhost:8080/api/users', {
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
                console.log(data)
            }
        })
        // await window.location.reload(false);
    }

    renderPasswordMatch = () => {
        console.log(this.state.passwordMatch);
        if(this.state.passwordMatch){
            return (
                <>
                </>
            )
        } else {
            return (
                <p style={{color: "#ED4337"}}>Passwords do not match...</p>
            )
        }
    }

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
                <label>Street: </label>
                <input type="text" value={this.state.street} onChange={this.handleStreet} />
                <br/>
                <br/>
                <label>City: </label>
                <input type="text" value={this.state.city} onChange={this.handleCity} />
                <br/>
                <br/>
                <label>State: </label>
                <input type="text" value={this.state.state} onChange={this.handleState} />
                <br/>
                <br/>
                <label>Zip Code: </label>
                <input type="number" value={this.state.zip_code} onChange={this.handleZipCode} />
                <br/>
                <br/>
                <label>Phone: </label>
                <input type="text" value={this.state.phone} onChange={this.handlePhone} />
                <br/>
                <br/>
                <label>Email: </label>
                <input type="text" value={this.state.email} onChange={this.handleEmail} />
                <br/>
                <br/>
                <label>Password: </label>
                <input type="password" value={this.state.password} onChange={this.handlePassword} />
                <br/>
                <br/>
                {this.renderPasswordMatch}
                <label>Confirm Password: </label>
                <input type="password" value={this.state.confPassword} onChange={this.handleConfirmPassword} />
                <br/>
                <br/>
                {/* <input type="submit" value="Submit"/> */}
                <button onClick={this.createUser}>Submit</button>
            </div>
        )
    }
}