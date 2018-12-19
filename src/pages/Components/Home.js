import React, {Component} from 'react';
import Helmet from 'react-helmet';
import NewExpense from './NewExpense';
import {get_expense_data} from '../apiCalls/ApiCalls';
import {MONTH, YEAR, WEEK} from '../constants/constants';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.leftMenuClick = this.leftMenuClick.bind(this);
    this.newExpense = this.newExpense.bind(this);
    this.navigateToSignIn = this.navigateToSignIn.bind(this);
    this.state = {
      activeTab: MONTH,
      showNewExpense: false,
      standing: undefined,
      spent: undefined,
      expenseList: {},
      incomeList: {},
      viewMore: false

    }
  }
  componentDidMount() {
    this.getExpense();
  }

  getExpense() {
    let expenseList = {}, incomeList = {}, standing ='';
    const tab = this.state.activeTab;
    const mm = new Date().getMonth() + 1;
    const dow = Math.ceil(new Date().getDate() / 7);
    const ww = new Date().getDay();
    const yy = new Date().getFullYear();
    const params = {tab, mm, dow, ww, yy};
    get_expense_data(params).then((resp) => {
      // Object.keys(resp.data).map((key) => {
      //   if (resp.data[key].type === 'expense') {
      //     expenseList = resp.data[key];
      //   } else if (resp.data[key].type === 'income') {
      //     incomeList = resp.data[key];
      //   }
      // });
      this.setState({...resp.data});
    }, (err) => {
      console.log('Unable to Get Expense Details', err);
    });
  }

  changeExpenseDayFormat(activeTab) {
    this.setState({activeTab: activeTab, viewMore: false}, () => {
      this.getExpense();
    });
  }

  leftMenuClick() {
    this.refs.backDrop.classList.toggle('backDrop');
    this.refs.popup.classList.toggle('right0');
    this.refs.firstHalfLandingTxt.classList.toggle('scale90');
    this.refs.otherHalfLandingTxt.classList.toggle('scale90');
  }

  navigateToSignIn() {
    console.log(this.props);
    this.props.history.push('/login');
  }

  renderLeftMenuBar() {
    return(
      <div className="menuBar">
        <div ref="popup"className="popup zi2 " onClick={this.leftMenuClick}>
          <div className="sideBar in-bl fl">
            <div className="menu-option">Settings</div>
            <div className="menu-option" onClick={this.navigateToSignIn}>Sign In</div>
            <div className="menu-option">About Me</div>
          </div>
        </div>
      </div>
    );
  }

  newExpense(val) {
    this.setState({showNewExpense: val});
  }

  clickViewMore() {
    this.setState({viewMore: !this.state.viewMore});
  }

  renderTransactioncard() {
    if (this.state.expenseList && Object.keys(this.state.expenseList).length > 0) {
      return (
        this.state.expenseList.transactionList.map((transaction, index) => {
          if (this.state.viewMore || !this.state.viewMore && index < 2) {
            return (
              <div key={'transaction_type_' + index} className="transactedCardInner">
                <div className="cardInnerheading">
                  <span className="cat_name">{transaction.category}</span>
                  <span className="cat_percent">{transaction.percent + ' %'}</span>
                </div>
                <div className="progressBar bl textCenter">
                  <div className="filled" style= {{maxWidth: transaction.percent + '%'}}>
                    {/* <div className="filled" ></div> */}
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })
    );
    } else {
      
      return null;
    }
  }

  render() {
    const {activeTab, showNewExpense, standing = undefined, spent = undefined, viewMore = false} = this.state;
    return (
      <div className="">
        <div>
          <div ref="backDrop" className={'transition2a zi1 ' + (showNewExpense ? 'backDrop' : '')} onClick={() => this.newExpense(false)}>
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
                  <span className={'dayTypeBtn ' + (activeTab === WEEK ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat(WEEK)}}>Week</span>
                  <span className={'dayTypeBtn ' + (activeTab === MONTH ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat(MONTH)}}>Month</span>
                  <span className={'dayTypeBtn ' + (activeTab === YEAR ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat(YEAR)}}>Year</span>
                </div>
                <div>
                  {spent ? <div className="subHeading">{'Spent : ₹' + spent}</div> : null}
                </div>
                <div>
                  <div ref="transactedCard" className={'transactedCard transition2a ' + (viewMore ? 'showAllTransaction' : '')}>
                    <div className="transactScroller">
                      {this.renderTransactioncard()}
                    </div>
                  </div>
                  <div className="viewMoreArrow" onClick={() => this.clickViewMore()}>
                    <svg className={viewMore ? 'rotateViewMore' : ''} ref="svgViewMore" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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
