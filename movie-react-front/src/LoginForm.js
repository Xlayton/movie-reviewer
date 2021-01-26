import React from 'react';

//Self contained, should have a setter for the parent for when user auths
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.authenticateUser = this.authenticateUser.bind(this);
    }

    handleEmail = evt => {
        this.setState({email: evt.target.value});
    }

    handlePassword = evt => {
        this.setState({password: evt.target.value});
    }

    resetPassword = () => {
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
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.movie_id}?api_key=77c34d76c76368a57135c21fcb3db278`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                movie: data,
            })
        })
    }

    async authenticateUser() {
        console.log('authenticating......');
        console.log(this.state.email);
        console.log(this.state.password);
        await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
                email: this.state.email,
                password: this.state.password
            })
          })
        .then(res => res.json())
        .then(data => {
            if(data){
                // this.refreshReviews()
                //SET SESSION 
                console.log(data)
                window.sessionStorage.setItem("currentUser", data.email);
                this.props.setUserID(data.id);
                window.sessionStorage.setItem("isLoggedIn", true);
                window.sessionStorage.setItem("userID", data.userId)
                window.sessionStorage.setItem("isAdmin", data.isAdmin)
                this.setState({
                    renderReview: true,
                    user_id: data.userId
                })
            }
        })
        await window.location.reload(false);
    }
    
    render() {
        return (
            <div className="content">
                <h1>Login</h1>
                <p>john.preston@tbeatty.com</p>
                <p>dominique.chaney@tbeatty.com</p>
                <label>Email: </label>
                <input type="text" value={this.state.email} onChange={this.handleEmail} />
                <br/>
                <br/>
                <p>ImwH@qxz56t9</p>
                <p>AZfpb+gt61Cm8</p>
                <label>Password: </label>
                <input type="password" value={this.state.password} onChange={this.handlePassword} />
                <br/>
                <br/>
                <button onClick={this.authenticateUser}>Submit</button>
                {/* <input type="submit" value="Submit"/> */}
                <br/>
                <br/>
                <a href="/resetpassword">Forgot your Password?</a>
            </div>
        )
    }
}