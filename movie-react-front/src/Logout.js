import React from 'react';
import { Redirect } from 'react-router-dom';

//Self contained, should have a setter for the parent for when user auths
export default class Logout extends React.Component {
    constructor(props) {
        super(props);


        // this.authenticateUser = this.authenticateUser.bind(this);
    }

    async componentDidMount(){
        await window.sessionStorage.removeItem("currentUser");
        await window.sessionStorage.removeItem("isLoggedIn");
        await window.location.reload(false);
    }

    render(){
        return(
            <Redirect to="/" />
        )
    }
}