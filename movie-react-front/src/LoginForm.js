import React from 'react';

//Self contained, should have a setter for the parent for when user auths
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmail = evt => {
        this.setState({email: evt.target.value});
    }

    handlePassword = evt => {
        this.setState({password: evt.target.value});
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

    authenticateUser = () => {
        console.log('authenticating......');
        console.log(this.state.email);
        console.log(this.state.password);
        fetch('http://localhost:8080/login', {
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
                console.log(data);
                // this.refreshReviews()
                //SET SESSION 
                window.sessionStorage.setItem("currentUser", data);
                this.setState({
                    renderReview: true,
                    user_id: data.userId
                })
            }
        })
    }
    
    render() {
        return (
            <div className="content">
                <p>john.preston@tbeatty.com</p>
                <label>Email: </label>
                <input type="text" value={this.state.email} onChange={this.handleEmail} />
                <br/>
                <br/>
                <p>ImwH@qxz56t9</p>
                <label>Password: </label>
                <input type="password" value={this.state.password} onChange={this.handlePassword} />
                <br/>
                <br/>
                {/* <input type="submit" value="Submit"/> */}
                <button onClick={this.authenticateUser}>Submit</button>
            </div>
        )
    }
}