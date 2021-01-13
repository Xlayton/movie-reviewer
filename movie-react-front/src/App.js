import {BrowserRouter, Link, Route} from 'react-router-dom';
import React from 'react';
import Homepage from './Homepage';
import TestPage from './TestPage';


export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/testpage">Test Page</Link>
          </nav>
          <section className="content">
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/testpage" component={TestPage}/>
          </section>
        </BrowserRouter>
      </div>
    );
  }
}