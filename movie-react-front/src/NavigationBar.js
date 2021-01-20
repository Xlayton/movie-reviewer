import React from 'react'
import { Link } from 'react-router-dom'


class NavigationBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        isLoggedIn: this.props.isLoggedIn
    }
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <div className="loginElements">
                <p className="email">{window.sessionStorage.getItem("currentUser")}</p>
                {isLoggedIn && (<Link to='/logout'>Logout</Link>)}
                {!isLoggedIn && (<Link to='/login'>Login</Link>)}
                {!isLoggedIn && (<Link to='/register'>Register</Link>)}
                {/* <Link to="/login">Login</Link> */}
            </div>
        </nav>
    )
  }
}

export default NavigationBar