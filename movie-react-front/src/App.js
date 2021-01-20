import {BrowserRouter, Link, Route} from 'react-router-dom';
import React from 'react';
import './Style.css';
import Homepage from './Homepage';
import LoginForm from './LoginForm';
import NavigationBar from './NavigationBar';
import Register from './Register';
import Movie from './Movie';


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userData: '',
      userID: undefined,
      isAuthenticated: false
    }
  }

  componentDidMount(){
    this.setState({
      userData: window.sessionStorage.getItem("currentUser"),
      userID: window.sessionStorage.getItem("userID"),
      isAuthenticated: window.sessionStorage.getItem("isLoggedIn")
    })
    console.log(this.state.userData, this.state.userID);
  }

  setUserID = (userID) => {
    console.log(userID)
    this.setState({userID: userID})
  }

  render() {
    const isAuthenticated = this.state.isAuthenticated;
    return (
      <div className="App">
        <BrowserRouter>
          <NavigationBar isLoggedIn={isAuthenticated} />
          <section className="content">
            <Route exact path="/">
              <Homepage userID={this.state.userID} />
            </Route>
            <Route exact path="/login">
              <LoginForm setUserID={this.setUserID}/>
            </Route>
            <Route exact path="/movie" component={Movie}/>
            <Route exact path="/logout"/>
            <Route exact path="/register" component={Register}/>
          </section>
        </BrowserRouter>
      </div>
    );
  }
}