import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {getUserInfo} from '../ApiCalls/ApiCalls';

class Login extends Component {
  constructor(props) {
    super(props);
    this.head = this.head.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.state = {
      username: '',
      password: ''
    }
  }

  head() {
    return (
      <Helmet>
        <title>Expense Login</title>
      </Helmet>
    );
  }

  signUp() {
    console.log(this);
  }

  signIn() {
    const params = [];
    params.push(encodeURIComponent('username') + '=' + encodeURIComponent(this.state.username));
    params.push(encodeURIComponent('password') + '=' + encodeURIComponent(this.state.password));
    const parameters = params.join('&');
    console.log(this.props);
    getUserInfo(parameters);

  }

  render() {
    return (
      <div>
        {this.head()}
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <div>
            <input placeholder='username' value={this.state.username} onChange = {(e) => this.setState({username: e.target.value})} type="text"/>
            <input placeholder='password' value={this.state.password} onChange = {(e) => this.setState({password: e.target.value})} type="password"/>
          </div>
          <button onClick={this.signIn}>Sign In</button>
          <button onClick={this.signUp}>Sign Up</button>
        </div>
      </div>
    );
  }
}
export default Login;