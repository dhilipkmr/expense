import React, {Component} from 'react';
import Helmet from 'react-helmet';
import NewExpense from './NewExpense';
import {get_expense_data, get_expense_summary, getUserInfo, logoutUser, deleteExpenseDate} from '../apiCalls/ApiCalls';
import {MONTH, YEAR, WEEK, MONTHSNAME, MONTHSNAMESHORT} from '../constants/constants';
import Graph from './Graph';
import {renderOptions, formatDate, Ripple, setLoader} from '../utils/utils';
import Popup from './Popup';
import {Prompt} from 'react-router-dom';
import PageLoader from './PageLoader';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.leftMenuClick = this.leftMenuClick.bind(this);
    this.newExpense = this.newExpense.bind(this);
    this.navigateToSignIn = this.navigateToSignIn.bind(this);
    this.cancelPopup = this.cancelPopup.bind(this);
    this.confirmPopup = this.confirmPopup.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.state = {
      activeTab: MONTH,
      showNewExpense: false,
      viewMore: false,
      weekData: {},
      monthData: {},
      yearData: {},
      selectorWW: '',
      selectorMM: '',
      selectorYY: '',
      activeFilter: 'spentRate'
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
    const {activeTab: tab, activeFilter} = this.state;
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
    
    if (this.state.selectorWW && typeof(this.state.selectorMM) !== 'undefined' && this.state.selectorYY) {
      year = parseInt(this.state.selectorYY);
      month = parseInt(this.state.selectorMM);
      ww = parseInt(this.state.selectorWW);
    }
    const params = {tab, mm: month, dow, ww, yy:year, dd:date, activeFilter};
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

    // if (Object.keys(this.state[activeTabData]).length === 0 || loadNewSummaryData) {
      get_expense_summary(params).then((resp) => {
        this.setState({[activeTabData] : {...this.state[activeTabData], plotData: {...resp.data}}, getExpenseSummarySuccess: true});
      }, (err) => {
        console.log('Unable to Get Expense Summary Details', err);
      });
    // }
  }

  getExpense(loadNewExpenseData, toggleVal) {
    const params = this.getParams(toggleVal);
    const activeTabData = this.findCurrentDataProp();
    
    // if (Object.keys(this.state[activeTabData]).length === 0 || loadNewExpenseData) {
      get_expense_data(params).then((resp) => {
        const {expenseList, incomeList, standing, spent, ww, yy, mm, dd} = resp.data;
        this.setState({[activeTabData] : {...this.state[activeTabData], expenseList, incomeList, standing, spent, ww, yy, mm,dd}, selectorMM:mm, selectorWW: ww, selectorYY: yy, getExpenseDataSuccess: true});
       }, (err) => {
         console.log('Unable to Get Expense Details', err);
       });
    // }
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
        <div ref="popup"className="popup zi9 " onClick={this.leftMenuClick}>
          <div className="sideBar in-bl fl">
            <Ripple key="logout" classes="menu-option" onClickHandler={this.navigateToSignIn}>{(!userInfo ? 'Sign In' : 'Logout')}</Ripple>
            <Ripple key="aboutMe" classes="menu-option" onClickHandler={() => window.open("https://dhilipkmr.github.io/materializedResume/")}>About Me</Ripple>
          </div>
        </div>
      </div>
    );
  }

  newExpense(val, saveSuccess, editExpenseVal) {
    if (saveSuccess) {
      this.setState({showNewExpense: val, editExpense: typeof(editExpenseVal) !== 'undefined' ? editExpenseVal : this.state.editExpense, weekData: {}, monthData: {}, yearData: {}}, () => {
        this.getExpense(saveSuccess);
        this.getExpenseSummary(saveSuccess);
      });
    } else {
      this.setState({showNewExpense: val, editExpense: editExpenseVal});
    }
  }

  cancelPopup() {
    this.setState({showPopup: false });
  }

  confirmPopup() {
    this.setState({showPopup: false});
    deleteExpenseDate({id: this.state.deleteTransactionObj.id}).then((res) => {
      if (res) {
        this.getExpense(true, true);
        this.getExpenseSummary(true, true);
      }
    });
  }

  editExpense(obj) {
    this.setState({editExpense: true, editTransactionObj:obj});
  }

  deleteExpense(obj) {
    this.setState({showPopup: true, deleteTransactionObj:obj});
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
          <div key={'transaction_type_' + i}>
            <div className="transactedCardInner">
              <div className="cardInnerheading">
                <span className="cat_percent progressBar fl m0 mt10"></span>
              </div>
              <div className="progressBar bl textCenter mt30" >
              </div>
            </div>
            <div className="cardBrdrBtm"></div>
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
            <div key={'transaction_type_' + index}>
              <div className="transactedCardInner">
                <div className="cardInnerheading">
                  <div className="cat w33 in-bl tl">{transaction.category}</div>
                  <div className="cat w33 in-bl tc">{formatDate(transaction.date)}</div>
                  <div className="cat w33 in-bl tr">
                    <svg onClick={() => this.editExpense({...transaction})} height="15px" viewBox="0 -1 450 400" width="15px">
                      <path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/>
                      <path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0"/>
                    </svg>
                  </div>
                </div>
                <div className="progressBar bl textCenter marginT25" >
                  <div className="filled" style= {{maxWidth: transaction.percent + '%'}}>
                  </div>
                </div>
                <div>
                  <div className="padR15 padL10 cat w33 in-bl tl">{'₹'+transaction.amount}
                  </div>
                  <div className="cat w33 in-bl tc">
                    {transaction.percent + ' %'}
                  </div>
                  <div className="padR7 cat w33 in-bl tr">
                  
                    <svg onClick={() => this.deleteExpense({id: transaction.id})} fill="#a20404" height="15px" viewBox="-40 0 450 400" width="15px" >
                      <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
                      <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
                      <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/>
                      <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="cardBrdrBtm"></div>
            </div>
          );
        } else {
          return null;
        }
      })
  );
  }

  changeFilter(type) {
    if (type === 'date') {
      this.setState({activeFilter: 'date'}, () => {
        this.getExpense(true, true);
        this.getExpenseSummary(true, true);
      });
    } else if (type === 'spentRate') {
      this.setState({activeFilter: 'spentRate'}, () => {
        this.getExpense(true, true);
        this.getExpenseSummary(true, true);
      });
    }
  }

  getTransactionCard() {
    const currentTabData = this.currentTabData();
    const {activeTab, viewMore = false, userInfo, activeFilter} = this.state;
    // const hasNoData = currentTabData.expenseList && Object.keys(currentTabData.expenseList).length === 0;
    const hasListDefined = currentTabData.expenseList; // To determine if the call is completed
      return (
        <div>
          {/* <div>
            <span>Date</span>
            <span>Percentage</span>
          </div> */}
          <div ref="transactedCard" className={'transactedCard transition1a ' + (viewMore ? 'showAllTransaction' : '')}>
            <div className="textCenter mt5">
              <Ripple classes={'in-bl sortType sortTypeLeft fs14 ' + (activeFilter === 'spentRate' ? ' leftActiveRight ' : '')} onClickHandler={() => this.changeFilter('spentRate')} >Spent Rate </Ripple>
              <Ripple classes={'in-bl sortType sortTypeRight fs14 ' + (activeFilter === 'spentRate' ? ' leftActiveLeft ' : 'rightActiveRight')} onClickHandler={() => this.changeFilter('date')} > Date </Ripple>
            </div>
            <div>
              <div className="transactScroller">
              {typeof(hasListDefined) !== 'undefined' && Object.keys(hasListDefined).length === 0?
                <div className="textCenter padT20 mh10p">
                  <div className="tu " onClick={() => this.newExpense(true)}>Add Transaction </div>
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
          <Ripple classes="viewMoreArrow" onClickHandler={() => this.clickViewMore()}>
            <svg className={viewMore ? 'rotateViewMore' : ''} ref="svgViewMore" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
            </svg>
          </Ripple>
          <div className="posRel">
            <div ref="addBtnContainer" className={'addBtnContainer '}>
              <div className="">
              <Ripple classes="in-bl addBtn themeBg" onClickHandler={() => this.newExpense(true)} > + </Ripple>
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

  toggleType(type, val) {
    let objToChange = {};
    if (type === WEEK) {
      objToChange = {selectorWW: val};
    } else if (type === MONTH) {
      objToChange = {selectorMM: val};
    } else if (type === YEAR) {
      objToChange = {selectorYY: val};
    }
    this.setState({...objToChange}, () => {
      this.getExpense(true, true);
      this.getExpenseSummary(true, true);
    });
  }

  render() {
    const {activeTab, showNewExpense, viewMore = false, editExpense, editTransactionObj, getExpenseSummarySuccess, getExpenseDataSuccess} = this.state;
    const {standing = undefined, spent = undefined, plotData = undefined, incomeList = undefined} = this.currentTabData();
    const {togglerHeader, isPrevDisabled, isNextDisabled} = this.getTogglerHeader();
    if (!getExpenseSummarySuccess || !getExpenseDataSuccess) {
      setLoader(true);
      return (
      <PageLoader/>
      );
    }
    setLoader(false);
    return (
      <div className="">
        <Prompt when={!showNewExpense} message={() => "Going back will Log you out."}></Prompt>
        <div>
          <div ref="backDrop" className={'transition1a zi9 ' + ((showNewExpense || editExpense) ? 'backDrop' : '')} onClick={() => this.newExpense(false)}></div>
          {this.renderLeftMenuBar()}
          <div ref="mainContent" className="mainContent ">
            <div className="">
              <div ref="firstHalfLandingTxt" className="transition0_5 first-half-landing">
                <div className="standing">
                  <Ripple classes="left-menu-container" onClickHandler={this.leftMenuClick}>
                    <img className="left-menu" src="/img/menu.svg" />
                  </Ripple>
                  {/* <span className="left-menu-container" onClick={this.leftMenuClick}></span> */}
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
                
                <div className="expenseDaysBtn w85 m10a">
                  <div className="in-bl w33">
                    <div>
                      <select key="weekSelect" onChange={(e) => this.toggleType(WEEK, e.target.value)} id="weekSelector db white" value={this.state.selectorWW}>
                        {renderOptions('week')}
                      </select>
                      <Ripple onClickHandler={() => this.changeExpenseDayFormat(WEEK)}  classes={'padB5 br10 db white padT10 mt5 ' + (activeTab === WEEK ? 'dayTypeBtn-active' : '')}>Week</Ripple>
                      {/* <label onClick={() => this.changeExpenseDayFormat(WEEK)}  className={'db white padT10 ' + (activeTab === WEEK ? 'dayTypeBtn-active' : '')} htmlFor="weekSelector">Week</label> */}
                      <div className={'typeBrdrBtm ' + (activeTab === WEEK ? 'w60': '')}></div>
                    </div>
                  </div>
                  <div className="in-bl w33">
                    <select key="monthSelect" onChange={(e) => this.toggleType(MONTH, e.target.value)} id="monthSelector db white" value={this.state.selectorMM}>
                      {renderOptions('month')}
                    </select>
                    <Ripple onClickHandler={() => this.changeExpenseDayFormat(MONTH)}  classes={'padB5 br10 db white padT10 mt5 ' + (activeTab === MONTH ? 'dayTypeBtn-active' : '')}>Month</Ripple>
                    {/* <label onClick={() => this.changeExpenseDayFormat(MONTH)}  className={'db white padT10 ' + (activeTab === MONTH ? 'dayTypeBtn-active' : '')} htmlFor="monthSelector">Month</label> */}
                    <div className={'typeBrdrBtm ' + (activeTab === MONTH ? 'w60': '')}></div>
                  </div>
                  <div className="in-bl w33">
                    <select key="yearSelect" onChange={(e) => this.toggleType(YEAR, e.target.value)} id="yearSelector db white" value={this.state.selectorYY}>
                    {renderOptions('year')}
                    </select>
                    <Ripple onClickHandler={() => this.changeExpenseDayFormat(YEAR)}  classes={'padB5 br10 db white padT10 mt5 ' + (activeTab === YEAR ? 'dayTypeBtn-active' : '')}>Year</Ripple>
                    {/* <label onClick={() => this.changeExpenseDayFormat(YEAR)} className={'db white padT10 ' + (activeTab === YEAR ? 'dayTypeBtn-active' : '')} htmlFor="yearSelector">Year</label> */}
                    <div className={'typeBrdrBtm ' + (activeTab === YEAR ? 'w60': '')}></div>
                  </div>
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
              <div className="other-half-landing mt10">
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
        {editExpense ?
          <div>
            <NewExpense newExpense={this.newExpense} editTransactionObj={editTransactionObj}/>
          </div> : null}
        {this.state.showPopup && <Popup cancelCallback={this.cancelPopup} confirmCallback={this.confirmPopup}/>}
      </div>
    );
  }
}
