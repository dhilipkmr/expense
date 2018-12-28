import React, {Component} from 'react';
import {new_expense} from '../apiCalls/ApiCalls';
import {MONTHSNAMESHORT, TODAY, YESTERDAY} from '../constants/constants';
// import {commaFormatted} from '../utils/utils';

export default class NewExpense extends Component {
  constructor(props) {
    super(props);
    this.selectType = this.selectType.bind(this);
    this.submitNewExpense = this.submitNewExpense.bind(this);
    
    this.state = {
      type: 'expense',
      amount: '',
      category: '',
      day: '', 
      month: '',
      year: '',
      error: {}
    }
  }

  selectType(type) {
    this.setState({type: type});
  }

  changeAmount(val){
    if (val && this.state.error.amount) {
      this.setState({amount: val, error:{}});
    } else {
      this.setState({amount: val});
    }
  }

  changeCategory(val) {
    if (val && this.state.error.category) {
      this.setState({category: val, error:{}});
    } else {
      this.setState({category: val});
    }
  }

  removeDateError() {
    const {day, month, year} = this.state;
    if (!(new Date(parseInt(year), parseInt(month), parseInt(day)) > new Date())) {
      this.setState({error:{}});
    }
  }

  changeDate(val) {
    if (val === TODAY) {
      const date = new Date();
      this.setState({ todayTap:true, yesterdayTap: false, day: date.getDate(), month: date.getMonth(), year: date.getFullYear()}, () => {
        this.removeDateError();
      });
    } else if (val == YESTERDAY) {
      let currDate = new Date();
      let date = new Date(currDate.setDate(currDate.getDate() - 1));
      this.setState({ todayTap: false, yesterdayTap: true, day: date.getDate(), month: date.getMonth(), year: date.getFullYear()}, () => {
        this.removeDateError();
      });
    } else {
      this.setState({...val}, () => {
        this.removeDateError();
      });
    }
  }

  isValidDate() {
    const {day, month, year} = this.state;
    const dateReg = /^\d{1,2}$/;
    const dateRegYear = /^\d{4}$/;
    if (!dateReg.test(day) || !dateReg.test(month) || !dateRegYear.test(year)) {
      this.setState({error: {date: 'Please provide a Valid Date!'}});
      return false;
    } else if (new Date(parseInt(year), parseInt(month), parseInt(day)) > new Date()) {
      this.setState({error: {date: 'Please do not Provide Future Date!'}});
      return false;
    } else {
      this.date = new Date(parseInt(year), parseInt(month), parseInt(day));
      return true;
    }
  }
  validateParams() {
    var reg = /^\d+$/;
    const {amount, category} = this.state;
    if (!amount || !reg.test(amount)) {
      this.setState({error: {amount: 'Please provide a Valid Amount'}});
      return false;
    }
    if (!category) {
      this.setState({error: {category: 'Please provide a Valid Category'}});
      return false;
    }
    if (!this.isValidDate()) {
      return false;
    }
    return true;
  }
  submitNewExpense() {
    const {amount, day, month, year, type, category} = this.state;
    const isValidationSuccess = this.validateParams();
    if (isValidationSuccess) {
      const params = { amount, type, date: this.date, category};
      new_expense(params).then((response) => {
        this.props.newExpense(false, true);
      }, (err) => {
        console.log('Unable to create new Expense',err);
        this.props.newExpense(false, false);
      });
    }
  }

  renderOptions(type) {
    const options = [];
    if (type === 'day') {
      options.push(<option>DD</option>);
      for(let i = 1; i < 32 ; i++) {
        options.push(<option value={i}>{i}</option>);
      }
    } else if (type === 'month') {
      options.push(<option>MM</option>);
      for(let i = 0; i < 12 ; i++) {
        options.push(<option value={i}>{MONTHSNAMESHORT[i]}</option>);
      }
    } else if (type === 'year') {
      options.push(<option>YY</option>);
      for(let i = 2020; i > 2000 ; i--) {
        options.push(<option value={i}>{i}</option>);
      }
    }
    return options;
  }

  render() {
    const {type, amount, day, month, year, category, error} = this.state;

    return (
      <div className="newExpenseContainer zi2">
        <div className="expIncBtns textCenter mT25">
          <span className={'newBtn ' + (type === 'expense' ? 'selectedType' : '')}  onClick={() => this.selectType('expense')}>Expense</span>
          <span className={'newBtn ' + (type === 'income' ? 'selectedType' : '')} onClick={() => this.selectType('income')}>Income</span>
        </div>
        <div className="amountInput mT25 ">
        <span>₹</span>
          <input className={'padL10 ' + (error.amount ? 'redBrdrBtm' : '')} type="text" id="newExpAmt" placeholder="Amount" onChange={(e) => this.changeAmount(e.target.value)} value={amount}/>
          {error.amount ? <div className="errorDiv">{error.amount}</div> : null}
        </div>
        <div  className="categoryInput mT25 ">
          <input className={'padL10 ' + (error.category ? 'redBrdrBtm' : '')} type="text" id="newCategAmt" placeholder="Category" onChange={(e) => this.changeCategory(e.target.value)} value={category}/>
          {error.category ? <div className="errorDiv">{error.category}</div> : null}
        </div>
        <div className="spentDay mT25 ">
          {/* <input ref="day" className="dayIp" type="number" maxLength="2" placeholder="DD" onChange={(e) => this.changeDate({day: e.target.value}, 'day', 'month')} value={day}/>
          <input ref="month" className="dayIp" type="number" maxLength="2" placeholder="MM" onChange={(e) => this.changeDate({month: e.target.value}, 'month', 'year')} value={month}/>
          <input ref="year" className="dayIp" type="number" maxLength="2" placeholder="YY" onChange={(e) => this.changeDate({year: e.target.value}, 'year')} value={year}/> */}
          <select ref="day" onChange={(e) => this.changeDate({day: e.target.value})} value={this.state.day}>{this.renderOptions('day')}</select>
          <select ref="month" onChange={(e) => this.changeDate({month: e.target.value})} value={this.state.month}>{this.renderOptions('month')}</select>
          <select ref="year" onChange={(e) => this.changeDate({year: e.target.value})} value={this.state.year}>{this.renderOptions('year')}</select>
          <div className="mt20">
            <span className={'m10 ' + (this.state.todayTap ? 'activeTapOption themeBg': 'tapOption themeBrdr')} onClick={() => this.changeDate(TODAY)}>Today</span>
            <span className={'m10 ' + (this.state.yesterdayTap ? 'activeTapOption themeBg': 'tapOption themeBrdr')}  onClick={() => this.changeDate(YESTERDAY)}>Yesterday</span>
          </div>
          {error.date ? <div className="mt10 errorDiv">{error.date}</div> : null}
        </div>
        <div className="textCenter">
          <div className="submitBtn themeBg" onClick={this.submitNewExpense}>Done</div>
        </div>
      </div>
    );
  }
}