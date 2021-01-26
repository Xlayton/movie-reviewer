import React from 'react';

//Self contained, should have a setter for the parent for when user auths
export default class EmailConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordConfirm: ''
        }
    }

    handlePassword = evt => {
        this.setState({password: evt.target.value});
    }

    handlePasswordConfirm = evt => {
        this.setState({passwordConfirm: evt.target.value});
    }

    resetPassword = () => {
        console.log(window.location.pathname)
        if(this.state.password === this.state.passwordConfirm) {
            fetch(`http://localhost:8080${window.location.pathname}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: new URLSearchParams({
                    password: this.state.password,
                })
              })
            .then(res => res.json())
            .then(data => console.log(data));
        }
    }
    
    render() {
        return (
            <div className="content">
                <h2>Provide your email to reset your password</h2>
                <br/>
                <label>Email: </label>
                <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="New Password..."/>
                <input type="password" value={this.state.passwordConfirm} onChange={this.handlePasswordConfirm} placeholder="Confirm New Password..."/>
                <br/>
                <br/>
                {/* <input type="submit" value="Submit"/> */}
                <button onClick={this.resetPassword}>Reset Password</button>
            </div>
        )
    }
}