import React from 'react';

//Self contained, should have a setter for the parent for when user auths
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        // this.authenticateUser = this.authenticateUser.bind(this);
    }

    //TODO - This is just a copy from login - needs to be fleshed out later

    handleEmail = evt => {
        this.setState({email: evt.target.value});
    }

    handlePassword = evt => {
        this.setState({password: evt.target.value});
    }

    createUser = () => {

    }

    render() {
        return (
            <div className="content">
                <h1>Register</h1>
                <label>Email: </label>
                <input type="text" value={this.state.email} onChange={this.handleEmail} />
                <br/>
                <br/>
                <label>Password: </label>
                <input type="password" value={this.state.password} onChange={this.handlePassword} />
                <br/>
                <br/>
                <label>Confirm Password: </label>
                <input type="password" value={this.state.password} onChange={this.handlePassword} />
                <br/>
                <br/>
                {/* <input type="submit" value="Submit"/> */}
                <button onClick={this.createUser}>Submit</button>
            </div>
        )
    }
}