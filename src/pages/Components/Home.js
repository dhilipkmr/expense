import React, {Component} from 'react';
import Helmet from 'react-helmet';
import NewExpense from './NewExpense';
import {get_expense_data, get_expense_summary, getUserInfo, logoutUser} from '../apiCalls/ApiCalls';
import {MONTH, YEAR, WEEK, MONTHSNAME, MONTHSNAMESHORT} from '../constants/constants';
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
    this.userInfo();
  }
  componentDidMount() {
    this.getExpense();
    this.getExpenseSummary();
    this.updateTogglerContent();
  }

  updateTogglerContent() {
    const {activeTab} = this.state;
    if (activeTab === WEEK) {
      return this.state.weekData;
    } else if (activeTab === MONTH) {
      return this.state.monthData;
    } else if (activeTab === YEAR) {
      return this.state.yearData;
    }
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

  getParams(toggleVal) {
    const tab = this.state.activeTab;
    let {dd, mm, yy, ww} = this.currentTabData();

    const currDate = (yy && typeof(mm) !== 'undefined' && dd) ? new Date(yy, mm, dd) : new Date();
    let month = currDate.getMonth();
    let dow = currDate.getDay();
    let date = currDate.getDate();
    let year = currDate.getFullYear();

    if (!ww) {
      const firstDayofMonth = new Date(year, month, 1).getDay();
      ww = Math.ceil((firstDayofMonth + currDate.getDate()) / 7);
    }
    
    if (toggleVal) {
      if (tab === YEAR) {
        year = toggleVal === 'previous' ? year - 1 : year + 1;
      } else if (tab === MONTH) {
        month = toggleVal === 'previous' ? month - 1 : month + 1;
      } else if (tab === WEEK) {
        ww = toggleVal === 'previous' ? ww - 1: ww + 1;
      }
    }
    const params = {tab, mm: month, dow, ww, yy:year, dd:date};
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

  getExpenseSummary(loadNewSummaryData, toggleVal) {
    const params = this.getParams(toggleVal);
    const activeTabData = this.findCurrentDataProp();

    if (Object.keys(this.state[activeTabData]).length === 0 || loadNewSummaryData) {
      get_expense_summary(params).then((resp) => {
        this.setState({[activeTabData] : {...this.state[activeTabData], plotData: {...resp.data}}});
      }, (err) => {
        console.log('Unable to Get Expense Summary Details', err);
      });
    }
  }

  getExpense(loadNewExpenseData, toggleVal) {
    const params = this.getParams(toggleVal);
    const activeTabData = this.findCurrentDataProp();
    
    if (Object.keys(this.state[activeTabData]).length === 0 || loadNewExpenseData) {
      get_expense_data(params).then((resp) => {
        const {expenseList, incomeList, standing, spent, ww, yy, mm, dd} = resp.data;
        this.setState({[activeTabData] : {...this.state[activeTabData], expenseList, incomeList, standing, spent, ww, yy, mm,dd}});
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
    this.refs.addBtnContainer.classList.toggle('dn');
    
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

  renderInnerTransactioncard(hasListDefined) {
    if (!hasListDefined) {
      const loader = [];
      for(let i = 0; i < 2; i++){
        loader.push(
          <div key={'transaction_type_' + i} className="transactedCardInner">
            <div className="cardInnerheading">
              <span className="cat_percent progressBar fl m0 mt10"></span>
            </div>
            <div className="progressBar bl textCenter mt30" >
            </div>
          </div>
        );
      }
      return loader;
    }

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
    // const hasNoData = currentTabData.expenseList && Object.keys(currentTabData.expenseList).length === 0;
    const hasListDefined = currentTabData.expenseList; // To determine if the call is completed
      return (
        <div>
          {/* <div>
            <span>Date</span>
            <span>Percentage</span>
          </div> */}
          <div ref="transactedCard" className={'transactedCard transition1a ' + (viewMore ? 'showAllTransaction' : '')}>
            <div>
              <div className="transactScroller">
              {typeof(hasListDefined) !== 'undefined' && Object.keys(hasListDefined).length === 0?
                <div className="textCenter padT20 mh10p">
                  <div>Add Transaction </div>
                  {!userInfo && <div className="padT10 padB20"><a href="/login"><span>Sign In</span></a> for Past Transactions</div>}
                </div>:
                <div>
                   {activeTab === WEEK ? this.renderInnerTransactioncard(hasListDefined) : null}
                  {activeTab === MONTH ? this.renderInnerTransactioncard(hasListDefined) : null}
                  {activeTab === YEAR ? this.renderInnerTransactioncard(hasListDefined) : null}
                </div> 
              }
              </div>
            </div>
          </div>
          <div className="viewMoreArrow" onClick={() => this.clickViewMore()}>
            <svg className={viewMore ? 'rotateViewMore' : ''} ref="svgViewMore" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
            </svg>
          </div>
          <div className="posRel">
            <div ref="addBtnContainer" className={'addBtnContainer '}>
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
  getTogglerHeader() {
    const {activeTab} = this.state;
    const {mm, yy , ww} = this.currentTabData();
    let togglerHeader = '';
    let isPrevDisabled = false;
    let isNextDisabled = false;

    if (activeTab === MONTH) {
      togglerHeader =  typeof(mm) !== 'undefined' ? MONTHSNAME[mm] : '----';
      isPrevDisabled = mm === 0 ? true : false;
      isNextDisabled = mm === 11 ? true : false;
    } else if (activeTab === WEEK) {
      togglerHeader =  ww ? ('Week ' +  ww) : '----';
      isPrevDisabled = ww === 1 ? true : false;
      isNextDisabled = ww === 5 ? true : false;
    } else {
      togglerHeader = yy ? yy : '----';
      isNextDisabled = yy === 2018 ? true : false;
    }

    return {togglerHeader, isPrevDisabled, isNextDisabled}
  }

  toggleType(val) {
    this.getExpense(true, val);
    this.getExpenseSummary(true, val);
  }

  render() {
    const {activeTab, showNewExpense, viewMore = false} = this.state;
    const {standing = undefined, spent = undefined, plotData = undefined, incomeList = undefined} = this.currentTabData();
    const {togglerHeader, isPrevDisabled, isNextDisabled} = this.getTogglerHeader();
    // if (!this.state.userInfo) {
    //   return (
    //     <div className='loginRedirect'>
    //       <div>Please wait... </div>
    //       <div>Redirecting to login...</div>
    //     </div>);
    // }
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
                <div className="expenseDaysBtn">
                  <span className={'prevNextBtn ' + (isPrevDisabled ? 'disabled' : '')} onClick={() => {this.toggleType('previous')}}>{'<'}</span>
                  <span className={'white mp5'}>{togglerHeader}</span>
                  <span className={'prevNextBtn ' + (isNextDisabled ? 'disabled' : '')} onClick={() => {this.toggleType('next')}}>{'>'}</span>
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
                <div ref="otherHalfLandingTxt" className="expenseCard transition0_5 ">
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
