import React, {Component} from 'react';
import Helmet from 'react-helmet';
import NewExpense from './NewExpense';
import {get_expense_data} from '../apiCalls/ApiCalls';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.leftMenuClick = this.leftMenuClick.bind(this);
    this.newExpense = this.newExpense.bind(this);
    this.state = {
      showWeek: true,
      showMonth: false,
      showYear: false,
      showNewExpense: false
    }
  }
  componentDidMount() {
    get_expense_data().then((resp) => {
      console.log(resp.data);
      this.setState({...resp.data});
    }, (err) => {
      console.log('Unable to Get Expense Details', err);
    });
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

  newExpense(val) {
    this.setState({showNewExpense: val});
    this.refs.backDrop.classList.toggle('backDrop');
  }

  clickViewMore(e) {
    this.refs.svgViewMore.classList.toggle('rotateViewMore');
    this.refs.transactedCard.classList.toggle('showAllTransaction');
  }

  render() {
    const {showWeek, showMonth, showYear, showNewExpense, standing = 100, spent = 50} = this.state;
    return (
      <div className="">
        <div>
          <div ref="backDrop" className="transition2a zi1 " onClick={() => this.newExpense(false)}>
          </div>
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
                {standing ? <div className="subHeading">{'Standing : ₹' + standing}</div> : null}
                <div className="expenseDaysBtn">
                  <span className={'dayTypeBtn ' + (showWeek ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat('week')}}>Week</span>
                  <span className={'dayTypeBtn ' + (showMonth ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat('month')}}>Month</span>
                  <span className={'dayTypeBtn ' + (showYear ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat('year')}}>Year</span>
                </div>
                <div>
                  {spent ? <div className="subHeading">{'Spent : ₹' + spent}</div> : null}
                </div>
                <div>
                  <div ref="transactedCard" className="transactedCard transition2a ">
                    <div className="transactScroller">
                      <div className="transactedCardInner">
                        <div className="cardInnerheading">
                          <span className="cat_name">Food</span>
                          <span className="cat_percent">75%</span>
                        </div>
                        <div className="progressBar progressBar1 bl textCenter">
                          75%
                        </div>
                      </div>
                      <div className="transactedCardInner">
                      </div>
                      <div className="transactedCardInner">
                      </div>
                      <div className="transactedCardInner">
                      </div>
                      <div className="transactedCardInner">
                      </div>
                      <div className="transactedCardInner">
                      </div>
                    </div>
                  </div>
                  <div className="viewMoreArrow" onClick={() => this.clickViewMore()}>
                    <svg ref="svgViewMore" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="other-half-landing">
              <div ref="otherHalfLandingTxt">
                <div className="newContainer">
                  <div className="new">
                    <span className="newBtn" onClick={() => this.newExpense(true)}>Add New</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showNewExpense ? 
          <div>
             <NewExpense newExpense={this.newExpense}/>
          </div> : null}
      </div>
    );
  }
}
