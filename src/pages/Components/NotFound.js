import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {NavLink} from 'react-router-dom';

class NotFound extends Component {
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
        <div className="notfoundContainer">
          <h5 className="notFoundText fb textCenter">Sorry, this page does not exist!</h5>
        </div>
        <div>
          <ul className="notfoundUL textCenter">
            <li>
              <div className="blueBtn">
              <NavLink to='/login' className="white"> Login </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default NotFound;