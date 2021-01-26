import React from 'react';

//Self contained, should have a setter for the parent for when user auths
export default class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    handlePassword = evt => {
        this.setState({password: evt.target.value});
    }
    
    render() {
        return (
            <div className="content">
                <h1>Reset Your Password</h1>
                <label>Password: </label>
                <input type="password" value={this.state.password} onChange={this.handlePassword} />
                <br/>
                <br/>
                {/* <button onClick={this.ResetPassword}>Reset Password</button> */}
                {/* <input type="submit" value="Submit"/> */}
                <br/>
                <br/>
            </div>
        )
    }
}