import React, {Component} from 'react';
import Helmet from 'react-helmet';
import NewExpense from './NewExpense';
import {get_expense_data, get_expense_summary} from '../apiCalls/ApiCalls';
import {MONTH, YEAR, WEEK} from '../constants/constants';
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
      standing: undefined,
      spent: undefined,
      expenseList: {},
      incomeList: {},
      viewMore: false
    }
    this.viewedMore = {};
  }
  componentDidMount() {
    this.getExpense();
    this.getExpenseSummary();
  }

  getExpenseSummary() {
    const tab = this.state.activeTab;
    const mm = new Date().getMonth() + 1;
    const dow = new Date().getDay();
    const ww = Math.ceil(new Date().getDate() / 7);
    const yy = new Date().getFullYear();
    const params = {tab, mm, dow, ww, yy};
    get_expense_summary(params).then((resp) => {
      this.setState({plotData: {...resp.data}});
    }, (err) => {
      console.log('Unable to Get Expense Summary Details', err);
    });
  }

  getExpense() {
    let expenseList = {}, incomeList = {}, standing ='';
    const tab = this.state.activeTab;
    const mm = new Date().getMonth() + 1;
    const dow = new Date().getDay();
    const ww = Math.ceil(new Date().getDate() / 7);
    const yy = new Date().getFullYear();
    const params = {tab, mm, dow, ww, yy};
    get_expense_data(params).then((resp) => {
     const {expenseList, incomeList, standing, spent} = resp.data;
      this.setState({expenseList, incomeList, standing, spent});
    }, (err) => {
      console.log('Unable to Get Expense Details', err);
    });
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

  renderInnerTransactioncard() {
    if (this.state.expenseList && Object.keys(this.state.expenseList).length > 0) {
      return (
        this.state.expenseList.transactionList.map((transaction, index) => {
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
    } else {
      return null;
    }
  }

  getTransactionCard() {
    const {activeTab, viewMore = false} = this.state;
    return (
      <div>
        <div ref="transactedCard" className={'transactedCard transition1a ' + (viewMore ? 'showAllTransaction' : '')}>
          <div className="transactScroller">
            {activeTab === WEEK ? this.renderInnerTransactioncard() : null}
            {activeTab === MONTH ? this.renderInnerTransactioncard() : null}
            {activeTab === YEAR ? this.renderInnerTransactioncard() : null}
          </div>
        </div>
        <div className="viewMoreArrow" onClick={() => this.clickViewMore()}>
          <svg className={viewMore ? 'rotateViewMore' : ''} ref="svgViewMore" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
          </svg>
        </div>
      </div>
    );
  }

  render() {
    const {activeTab, showNewExpense, standing = undefined, spent = undefined, viewMore = false, plotData} = this.state;
    return (
      <div className="">
        <div>
          <div ref="backDrop" className={'transition2a zi1 ' + (showNewExpense ? 'backDrop' : '')} onClick={() => this.newExpense(false)}>
          </div>
          {this.renderLeftMenuBar()}
          <div ref="mainContent" className="mainContent">
            <div className="first-half-landing">
              <div ref="firstHalfLandingTxt" className="transition0_5 ">
                <div className="standing">
                  <span className="left-menu-container" onClick={this.leftMenuClick}><img className="left-menu" src="/img/menu.svg"/></span>
                  <span></span>
                  {/* <span className="right-menu-container" onClick={() => {this.setState({visibleRightMenu: true})}}><img className="right-menu" src="/img/menu.svg"/></span> */}
                </div>
                <div className="heading">Expense Home</div>
                <div className="subHeading">{'Standing : ₹' + (typeof(standing) !== 'undefined' ? standing : '0')}</div>
                <div className="expenseDaysBtn">
                  <span className={'dayTypeBtn ' + (activeTab === WEEK ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat(WEEK)}}>Week</span>
                  <span className={'dayTypeBtn ' + (activeTab === MONTH ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat(MONTH)}}>Month</span>
                  <span className={'dayTypeBtn ' + (activeTab === YEAR ? 'dayTypeBtn-active' : '')} onClick={() => {this.changeExpenseDayFormat(YEAR)}}>Year</span>
                </div>
                <div>
                  <div className="subHeading">{'Spent : ₹' + (typeof(spent) !== 'undefined'? spent: '0')}</div>
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
                  <div className="newContainer">
                    <div className="new">
                      <span className="newBtn" onClick={() => this.newExpense(true)}>Add New</span>
                    </div>
                  </div>
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
