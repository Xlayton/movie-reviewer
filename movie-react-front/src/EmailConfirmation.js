import React from 'react';

//Self contained, should have a setter for the parent for when user auths
export default class EmailConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    handleEmail = evt => {
        this.setState({email: evt.target.value});
    }

    sendEmail = () => {
        fetch('http://localhost:8080/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
                email: this.state.email,
            })
          })
        .then(res => res.json())
        .then(data => console.log(data));
    }
    
    render() {
        return (
            <div className="content">
                <h2>Provide your email to reset your password</h2>
                <br/>
                <label>Email: </label>
                <input type="text" value={this.state.email} onChange={this.handleEmail} />
                <br/>
                <br/>
                {/* <input type="submit" value="Submit"/> */}
                <button onClick={this.sendEmail}>Send Email</button>
            </div>
        )
    }
}