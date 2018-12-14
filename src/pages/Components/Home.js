import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.leftMenuClick = this.leftMenuClick.bind(this);
    this.state = {
      showWeek: true,
      showMonth: false,
      showYear: false,
    }
  }

  changeExpenseDayFormat(format) {
    if (format === 'week') {
      this.setState({showWeek: true, showMonth: false, showYear: false});
    } else if (format === 'month') {
      this.setState({showWeek: false, showMonth: true, showYear: false});
    } else if (format === 'year') {
      this.setState({showWeek: false, showMonth: false, showYear: true});
    }
  }

  leftMenuClick() {
    this.refs.backDrop.classList.toggle('backDrop');
    this.refs.popup.classList.toggle('right0');
    this.refs.firstHalfLandingTxt.classList.toggle('scale90');
    this.refs.otherHalfLandingTxt.classList.toggle('scale90');
  }

  renderLeftMenuBar() {
    return(
      <div className="menuBar">
        <div ref="backDrop" className="transition2a zi1 ">
        </div>
        <div ref="popup"className="popup zi2 " onClick={this.leftMenuClick}>
          <div className="sideBar in-bl fl">
            <div className="menu-option">Settings</div>
            <div className="menu-option">Sign In</div>
            <div className="menu-option">About Me</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {showWeek, showMonth, showYear} = this.state;
    return (
      <div className="">
        {this.renderLeftMenuBar()}
        <div ref="mainContent" className="mainContent">
          <div className="first-half-landing">
            <div ref="firstHalfLandingTxt" className="firstHalfTxt">
              <div className="standing">
                <span className="left-menu-container" onClick={this.leftMenuClick}><img className="left-menu" src="/img/menu.svg"/></span>
                <span></span>
                {/* <span className="right-menu-container" onClick={() => {this.setState({visibleRightMenu: true})}}><img className="right-menu" src="/img/menu.svg"/></span> */}
              </div>
              <div className="heading">Expense Home</div>
              <div className="expenseDaysBtn">
                <span className={'dayTypeBtn ' + (showWeek ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat('week')}}>Week</span>
                <span className={'dayTypeBtn ' + (showMonth ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat('month')}}>Month</span>
                <span className={'dayTypeBtn ' + (showYear ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat('year')}}>Year</span>
              </div>
            </div>
          </div>
          <div className="other-half-landing">
            <div ref="otherHalfLandingTxt">
              <div className="newContainer">
                <div className="new">
                  <span className="newBtn">Add New</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
