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
      username: 'dhilip',
      password: 'dhilipdhilip'
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
        if (typeof(window) !== 'undefined') {
          window.signedIn = true;
        }
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
          <div className="loginContainer white">
            <div className="fieldsDiv">
              <div className="username">
                <input placeholder='username' value={this.state.username} onChange = {(e) => this.setState({username: e.target.value})} type="text"/>
              </div>
              <div className="password padT10">
                <input placeholder='password' value={this.state.password} onChange = {(e) => this.setState({password: e.target.value})} type="password"/>
              </div>
            </div>
            <div className="textCenter padT20">
              <div className="new di">
                <span className="newBtn"onClick={this.signIn}>Sign In</span>
              </div>
              <div className="new di">
                <span className="newBtn" onClick={this.signUp}>Sign Up</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;