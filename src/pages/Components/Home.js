import React, {Component} from 'react';
import Helmet from 'react-helmet';
import NewExpense from './NewExpense';
import {get_expense_data, get_expense_summary, getUserInfo, logoutUser} from '../apiCalls/ApiCalls';
import {MONTH, YEAR, WEEK, MONTHSNAME} from '../constants/constants';
import Graph from './Graph';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.leftMenuClick = this.leftMenuClick.bind(this);
    this.newExpense = this.newExpense.bind(this);
    this.navigateToSignIn = this.navigateToSignIn.bind(this);
    this.state = {
      activeTab: MONTH,
      showNewExpense: false,
      viewMore: false,
      weekData: {},
      monthData: {},
      yearData: {}
    }
    this.viewedMore = {};
  }
  componentDidMount() {
    this.getExpense();
    this.getExpenseSummary();
    this.userInfo();
  }
  // To give the prop in the state to check availability of data
  currentTabData() {
    const {activeTab} = this.state;
    if (activeTab === WEEK) {
      return this.state.weekData;
    } else if (activeTab === MONTH) {
      return this.state.monthData;
    } else if (activeTab === YEAR) {
      return this.state.yearData;
    }
  }

  findCurrentDataProp() {
    const {activeTab} = this.state;
    if (activeTab === WEEK) {
      return 'weekData';
    } else if (activeTab === MONTH) {
      return 'monthData';
    } else if (activeTab === YEAR) {
      return 'yearData';
    }
  }

  getParams() {
    const tab = this.state.activeTab;
    const currDate = new Date();
    const mm = currDate.getMonth();
    const dow = currDate.getDay();
    const yy = currDate.getFullYear();

    const firstDayofMonth = new Date(yy, mm, 1).getDay();
    const ww = Math.ceil((firstDayofMonth + currDate.getDate()) / 7);
    
    const params = {tab, mm, dow, ww, yy};
    return params;
  }

  userInfo() {
    getUserInfo().then((res) => {
      if (res.data && res.data.userInfo) {
        this.setState({ userInfo: res.data.userInfo});
      } else {
        this.navigateToSignIn();
      }
    })
    .catch(() => {
      this.navigateToSignIn();
    });
  }

  getExpenseSummary(loadNewSummaryData) {
    const params = this.getParams();
    const activeTabData = this.findCurrentDataProp();

    if (Object.keys(this.state[activeTabData]).length === 0 || loadNewSummaryData) {
      get_expense_summary(params).then((resp) => {
        this.setState({[activeTabData] : {...this.state[activeTabData], plotData: {...resp.data}}});
      }, (err) => {
        console.log('Unable to Get Expense Summary Details', err);
      });
    }
  }

  getExpense(loadNewExpenseData) {
    const params = this.getParams();
    const activeTabData = this.findCurrentDataProp();
    
    if (Object.keys(this.state[activeTabData]).length === 0 || loadNewExpenseData) {
      get_expense_data(params).then((resp) => {
        const {expenseList, incomeList, standing, spent} = resp.data;
        this.setState({[activeTabData] : {...this.state[activeTabData], expenseList, incomeList, standing, spent}});
       }, (err) => {
         console.log('Unable to Get Expense Details', err);
       });
    }
  }

  changeExpenseDayFormat(activeTab) {
    this.setState({activeTab: activeTab, viewMore: false}, () => {
      this.getExpense();
      this.getExpenseSummary();
    });
  }

  leftMenuClick() {
    this.refs.backDrop.classList.toggle('backDrop');
    this.refs.popup.classList.toggle('right0');
    if (this.refs.otherHalfLandingTxt) {
      this.refs.firstHalfLandingTxt.classList.toggle('scale90');
      this.refs.otherHalfLandingTxt.classList.toggle('scale90');
    }
    if (this.refs.backDrop.classList.contains('backDrop')) {
      this.refs.addBtnContainer.classList.toggle('dn');
    } else {
      setTimeout(() => {
        this.refs.addBtnContainer.classList.toggle('dn');
      }, 500);
    }
  }

  navigateToSignIn() {
    if (this.state.userInfo) {
      logoutUser().then(() => {
       window.location.href = '/login';
      });
    } else  {
      window.location.href = '/login';
    }
  }

  renderLeftMenuBar() {
    const {userInfo} = this.state;
    return(
      <div className="menuBar">
        <div ref="popup"className="popup zi2 " onClick={this.leftMenuClick}>
          <div className="sideBar in-bl fl">
            <div className="menu-option">Settings</div>
            <div className="menu-option" onClick={this.navigateToSignIn}>{(!userInfo ? 'Sign In' : 'Logout')}</div>
            <div className="menu-option">About Me</div>
          </div>
        </div>
      </div>
    );
  }

  newExpense(val, saveSuccess) {
    if (saveSuccess) {
      this.setState({showNewExpense: val, weekData: {}, monthData: {}, yearData: {}}, () => {
        this.getExpense(saveSuccess);
        this.getExpenseSummary(saveSuccess);
      });
    } else {
      this.setState({showNewExpense: val});
    }
  }

  clickViewMore() {
    this.setState({viewMore: !this.state.viewMore});
    this.refs.transactedCard.scrollTop = 0;
  }

  renderInnerTransactioncard() {
    const {expenseList} = this.currentTabData();
    return (
      expenseList.transactionList.map((transaction, index) => {
        if (this.state.viewMore || this.viewedMore[this.state.activeTab] || !this.state.viewMore && index < 2) {
          if (this.state.viewMore) {
            this.viewedMore[this.state.activeTab] = true; // To not remove element from DOM on clicking view More again
          }
          return (
            <div key={'transaction_type_' + index} className="transactedCardInner">
              <div className="cardInnerheading">
                <span className="cat_name">{transaction.category}</span>
                <span className="cat_percent ">{transaction.percent + ' %'}</span>
                {/* <span className="cat_name loader"></span>
                <span className="cat_percent loader"></span> */}
              </div>
              <div className="progressBar bl textCenter marginT25" >
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
  }

  getTransactionCard() {
    const currentTabData = this.currentTabData();
    const {activeTab, viewMore = false, userInfo} = this.state;
    const hasData = currentTabData.expenseList && Object.keys(currentTabData.expenseList).length > 0;
      return (
        <div>
          <div ref="transactedCard" className={'transactedCard transition1a ' + (viewMore ? 'showAllTransaction' : '')}>
            {hasData ?
            <div>
              <div className="transactScroller">
                {activeTab === WEEK ? this.renderInnerTransactioncard() : null}
                {activeTab === MONTH ? this.renderInnerTransactioncard() : null}
                {activeTab === YEAR ? this.renderInnerTransactioncard() : null}
              </div>
            </div> : 
            <div className="textCenter padT20 mh10p">
              <div>No Transactions added </div>
              {!userInfo && <div className="padT10 padB20"><a href="/login"><span>Sign In</span></a> for Past Transactions</div>}
            </div>
            }
          </div>
          <div className="viewMoreArrow" onClick={() => this.clickViewMore()}>
            <svg className={viewMore ? 'rotateViewMore' : ''} ref="svgViewMore" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
            </svg>
          </div>
          <div className="posRel">
            <div ref="addBtnContainer" className={'addBtnContainer ' + (!hasData ? 'padT10' : '')}>
              <div className="">
                <span className="addBtn" onClick={() => this.newExpense(true)}> + </span>
              </div>
            </div>
          </div>
        </div>
      );
  }
  getCurrentDate() {
    const date = new Date();
    const currMonth = MONTHSNAME[date.getMonth()];
    const currDate = date.getDate();
    return currDate + ' ' + currMonth + ' ' + date.getFullYear();
  }

  render() {
    const {activeTab, showNewExpense, viewMore = false} = this.state;
    const {standing = undefined, spent = undefined, plotData = undefined, incomeList = undefined} = this.currentTabData();
    return (
      <div className="">
        <div>
          <div ref="backDrop" className={'transition2a zi1 ' + (showNewExpense ? 'backDrop' : '')} onClick={() => this.newExpense(false)}></div>
          {this.renderLeftMenuBar()}
          <div ref="mainContent" className="mainContent">
            <div className="">
              <div className="first-half-landing"></div>
              <div ref="firstHalfLandingTxt" className="transition0_5 ">
                <div className="standing">
                  <span className="left-menu-container" onClick={this.leftMenuClick}><img className="left-menu" src="/img/menu.svg"/></span>
                  {/* <span className="right-menu-container" onClick={() => {this.setState({visibleRightMenu: true})}}><img className="right-menu" src="/img/menu.svg"/></span> */}
                </div>
                <div className="heading">
                  <div className="fb f11">CURRENT BALANCE</div>
                  <div>
                    <span className="f18">₹ </span>
                    <span className="standingAmt">{(typeof(standing) !== 'undefined' ? standing : '0')}</span>
                  </div>
                  <div className="textCenter">
                    <div><span className="f11">{this.getCurrentDate()}</span></div>
                  </div>
                </div>
                
                <div className="expenseDaysBtn">
                  <span className={'dayTypeBtn ' + (activeTab === WEEK ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat(WEEK)}}>Week</span>
                  <span className={'dayTypeBtn ' + (activeTab === MONTH ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat(MONTH)}}>Month</span>
                  <span className={'dayTypeBtn ' + (activeTab === YEAR ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat(YEAR)}}>Year</span>
                </div>
                <div className="spentIncomeSection">
                  <div className="in-bl ">
                    <div className="fl in-bl spentIcon" >
                      <svg  width="21" height="17" viewBox="0 0 24 24"><path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-17 1h4v-8h2v8h4l-5 6-5-6z"/></svg>
                    </div>
                    <div className="subHeading in-bl">{'Spent : ₹' + (typeof(spent) !== 'undefined'? spent: '0')}</div>
                  </div>
                  
                  <div className="in-bl  ">
                    <div className="fl in-bl incomeIcon " >
                      <svg className="fl in-bl" width="21" height="17" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm17-1h-4v8h-2v-8h-4l5-6 5 6z"/></svg>
                    </div>
                    <div className="subHeading in-bl">{'Income : ₹' + (incomeList && typeof(incomeList.amount) !== 'undefined' ? incomeList.amount : '0')}</div>
                  </div>
                </div>
                {this.getTransactionCard()}
              </div>
            </div>
            {plotData && plotData.perDivisionData &&  plotData.perDivisionData.length > 0 ?
              <div className="other-half-landing">
                <div ref="otherHalfLandingTxt" className="transition0_5 ">
                  <div className="textCenter trSumaryHeading fb" >
                    <span>{'Expense Trends'}</span>
                  </div>
                  {activeTab === WEEK ?  <Graph plotData={plotData} tab={activeTab}/> : null}
                  {activeTab === MONTH ?  <Graph plotData={plotData} tab={activeTab}/> : null}
                  {activeTab === YEAR ?  <Graph plotData={plotData} tab={activeTab}/> : null}
                </div>
              </div> : null}
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
