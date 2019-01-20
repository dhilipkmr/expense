import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {signup, signin, logoutUser} from '../apiCalls/ApiCalls';
import { Ripple} from '../utils/utils';

class Login extends Component {
  constructor(props) {
    super(props);
    this.head = this.head.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signoutUser = this.signoutUser.bind(this);
    this.state = {
      username: '',
      password: '',
      signinText: 'Sign In',
      signupText: 'Sign Up',
      continueText: 'Continue with Test Login',
      load: !window.signedIn
    }
    if (window.signedIn) {
      this.signoutUser();
    }
  }

  signoutUser() {
    logoutUser().then((resp) => {
      if (!(resp.data.error)) {
        window.signedIn = false;
        console.log('Signing out success');
        window.location.reload();
        return;
      }
      console.log('unable to signout user');
      window.location.reload();
    }).catch(() => {
      console.log('unable to signout user');
      window.location.reload();
    })
  }

  head() {
    return (
      <Helmet>
        <title>Expense Login</title>
      </Helmet>
    );
  }

  successful(resp) {
    if (resp.data && !resp.data.error) {
      this.props.history.push('/home', {});
      if (typeof(window) !== 'undefined') {
        window.signedIn = true;
      }
    } else {
      this.setState({...resp.data});
    }
    if (resp.data && resp.data.error) {
      this.resetButtonText();
    }
  }

  isValid() {
    if (this.state.username.length < 5) {
      this.setState({error: true, msg: 'Username must be greater than 4 Characters'});
      return false;
    }
    if (this.state.password.length < 8) {
      this.setState({error: true, msg: 'Password must be greater than 7 Characters'});
      return false;
    }
    return true;
  }

  resetButtonText() {
    this.setState({
      signinText: 'Sign In',
      signupText: 'Sign Up',
      continueText: 'Continue with Test Login'
    });
  }

  signUp() {
    if (this.isValid()) {
      this.setState({signupText: 'Signing up...'});
      signup({username: this.state.username, password: this.state.password})
      .then((resp) => {
        this.successful(resp);
      })
      .catch((err) => {
        this.resetButtonText();
        console.log('Failed to Signup');
      });
    }
  }

  signIn(withTestCreds) {
    let {username, password} = this.state;
    if (withTestCreds) {
      username = 'dhilip';
      password = 'dhilipdhilip';
    }
    if (withTestCreds || this.isValid()) {
      // if (withTestCreds) {
      //   this.setState({continueText: 'Continuing with Test Login...'});
      // } else {
      //   this.setState({signinText: 'Signing in...'});
      // }
      signin({username: username, password: password}).then((resp) => {
        this.successful(resp);
      }).catch((err) => {
        this.resetButtonText();
        console.log('Failed to SignIn', err);
      }); 
    }
  }

  render() {
    const {signinText, signupText, continueText} = this.state;
    return (
      <div>
        {this.head()}
        {this.state.load &&
        <div>
          <div className="">
            <div className="fieldsDiv padB10">
              <div className="username">
                <input className="loginInput " id="loginUsername" placeholder='Username' value={this.state.username} onChange = {(e) => this.setState({username: e.target.value})} type="text"/>
              </div>
              <div className="password padT10">
                <input className="loginInput " id="loginPwd" placeholder='Password' value={this.state.password} onChange = {(e) => this.setState({password: e.target.value})} type="password"/>
              </div>
            </div>
            {this.state.error && <div id="errorDiv" className="textCenter red ">{this.state.msg}</div>}
            <div className="textCenter ">
              <div className="new di">
                <Ripple classes="in-bl newBtn loginBtns themeBg" onClickHandler={() => this.signIn(false)}>{signinText}</Ripple>
              </div>
              <div className="new di">
                <Ripple classes="in-bl newBtn loginBtns themeBg" onClickHandler={this.signUp}>{signupText}</Ripple>
              </div>
            </div>
            <div className="textCenter ">
              <div className="new">
                <Ripple classes="in-bl newBtn loginBtns testLogin themeBg" onClickHandler={() => this.signIn(true)}>{continueText}</Ripple>
              </div>
            </div>

          </div>
        </div>}
      </div>
    );
  }
}
export default Login;