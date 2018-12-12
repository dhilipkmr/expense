import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {signup, signin} from '../apiCalls/ApiCalls';

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
    signup({username: this.state.username, password: this.state.password});
  }

  signIn() {
    signin({username: this.state.username, password: this.state.password}).then((resp) => {
      if (resp.data && !resp.data.error) {
        console.log(this);
        this.props.history.push('/home', {});
      } else {
        console.log('Failed to SignIn', resp);
      }
    }).catch((err) => {
      console.log('Failed to SignIn', err);
    });
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