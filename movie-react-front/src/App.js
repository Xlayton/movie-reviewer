import {BrowserRouter, Link, Route} from 'react-router-dom';
import React from 'react';
import './Style.css';
import Homepage from './Homepage';
import LoginForm from './LoginForm';
import MoviePage from './MoviePage';


export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userData: ''
    }
  }

  componentDidMount(){
    this.setState({
      userData: window.sessionStorage.getItem("currentUser")
    })
    console.log(this.state.userData);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav className="navbar">
            <Link to="/">Home</Link>
            <div className="loginElements">
              <p>{this.state.userData.email}</p>
              <Link to="/login">Login</Link>
            </div>
          </nav>
          <section className="content">
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/movie" component={MoviePage}/>
          </section>
        </BrowserRouter>
      </div>
    );
  }
}