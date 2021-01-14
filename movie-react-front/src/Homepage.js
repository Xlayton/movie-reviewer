import React from 'react'

export default class Homepage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: '',
            password: ''
        }

        this.authenticateUser = this.authenticateUser.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleEmail = evt => {
        this.setState({email: evt.target.value});
    }

    handlePassword = evt => {
        this.setState({password: evt.target.value});
    }
    
    authenticateUser = () => {
        fetch(`localhost:8080/api/user/${this.state.email}/${this.state.password}`)
        .then(res => res.json())
        .then(data => {
            if(data){
                console.log(true);
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <br/>
                <br/>
                <form onSubmit={()=> this.authenticateUser}>
                    <label>Email: </label>
                    <input type="text" value={this.state.email} onChange={this.handleEmail} />
                    <br/>
                    <br/>
                    <label>Password: </label>
                    <input type="text" value={this.state.password} onChange={this.handlePassword} />
                    <br/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}