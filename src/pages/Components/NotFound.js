import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {NavLink} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.head = this.head.bind(this);
  }

  head() {
    return (
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        <div>
          <h1>Sorry, the page you are expecting does not exist!</h1>
        </div>
        <div>
          <ul>
            <li onClick= {() => this.props.history.goBack()}> 
              Back
            </li>
            <li>
              <NavLink to='/'> Home </NavLink>
            </li>
            <li>
              <NavLink to='/login'> Login </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Login;