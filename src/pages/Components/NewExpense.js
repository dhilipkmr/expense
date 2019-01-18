import React, {Component} from 'react';
import {new_expense, edit_expense} from '../apiCalls/ApiCalls';
import {MONTHSNAMESHORT, TODAY, YESTERDAY} from '../constants/constants';
import {renderOptions} from '../utils/utils';

export default class NewExpense extends Component {
  constructor(props) {
    super(props);
    this.selectType = this.selectType.bind(this);
    this.submitNewExpense = this.submitNewExpense.bind(this);
    let  amount = '';
    let  category = '';
    let  day = '';
    let  month = '';
    let  year = '';
    if (props.editTransactionObj) {
      amount = props.editTransactionObj.amount;
      category = props.editTransactionObj.category;
      var date = new Date(props.editTransactionObj.date)
      day = date.getDate();
      month = date.getMonth();
      year = date.getFullYear();
    }
    this.state = {
      type: 'expense',
      amount: amount,
      category: category,
      day: day, 
      month: month,
      year: year,
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
    }
    else if (new Date(parseInt(year), parseInt(month), parseInt(day)) > new Date()) {
      this.setState({error: {date: 'Please do not Provide Future Date!'}});
      return false;
    }
    else {
      this.date = new Date(parseInt(year), parseInt(month), parseInt(day));
      return true;
    }
  }
  validateParams() {
    var reg = /^\d+$/;
    const {amount, category} = this.state;
    if (!amount || amount <= 0) {
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
    this.setState({disableSubmit: true});
    const isValidationSuccess = this.validateParams();
    if (isValidationSuccess) {
      const date = this.date;
      const mm = date.getMonth();
      const yy = date.getFullYear();
      const firstDayofMonth = new Date(yy, mm, 1).getDay();
      const ww = Math.ceil((firstDayofMonth + date.getDate()) / 7);
      const dow = date.getDay();
      const dd = date.getDate();
      const params = { amount, type, date, mm, yy, ww, dow, dd, category};
      if (this.props.editTransactionObj) {
        params.id = this.props.editTransactionObj.id;
        edit_expense(params).then((resp) => {
          this.props.newExpense(false, true, false);
        }, (err) => {
          console.log('Unable to Edit Expense',err);
          this.props.newExpense(false, false, false);
        });
      } else {
        new_expense(params).then((response) => {
          this.props.newExpense(false, true);
        }, (err) => {
          console.log('Unable to create new Expense',err);
          this.props.newExpense(false, false);
        });
      }
    }
  }

  render() {
    const {type, amount, day, month, year, category, error, disableSubmit} = this.state;
    return (
      <div className="newExpenseContainer zi2">
        <div className="expIncBtns textCenter mT25">
          <span className={'newBtn ' + (type === 'expense' ? 'selectedType' : '')}  onClick={() => this.selectType('expense')}>Expense</span>
          <span className={'newBtn ' + (type === 'income' ? 'selectedType' : '')} onClick={() => this.selectType('income')}>Income</span>
        </div>
        <div className="amountInput mT25 ">
          <span>₹</span>
          <input className={'padL10 w75 ' + (error.amount ? 'redBrdrBtm' : '')} auto-complete="off" type="text" id="newExpAmt" placeholder="Amount" onChange={(e) => this.changeAmount(e.target.value)} value={amount}/>
          <span className="requiredAshterix"> * </span>
          {error.amount ? <div className="errorDiv">{error.amount}</div> : null}
        </div>
        <div  className="categoryInput mT25 ">
          <input className={'padL10 w75 ' + (error.category ? 'redBrdrBtm' : '')} auto-complete="off"  type="text" id="newCategAmt" placeholder="Category" onChange={(e) => this.changeCategory(e.target.value)} value={category}/>
          <span className="requiredAshterix"> * </span>
          {error.category ? <div className="errorDiv">{error.category}</div> : null}
        </div>
        <div className="spentDay mT25 ">
          <select ref="day" className="w20 " onChange={(e) => this.changeDate({day: e.target.value})} value={this.state.day}>{renderOptions('day')}</select>
          <select ref="month" className="w25 " onChange={(e) => this.changeDate({month: e.target.value})} value={this.state.month}>{renderOptions('month')}</select>
          <select ref="year" className="w20 " onChange={(e) => this.changeDate({year: e.target.value})} value={this.state.year}>{renderOptions('year')}</select>
          <div className="mt20">
            <span className={'m10 ' + (this.state.todayTap ? 'activeTapOption themeBg': 'tapOption themeBrdr')} onClick={() => this.changeDate(TODAY)}>Today</span>
            <span className={'m10 ' + (this.state.yesterdayTap ? 'activeTapOption themeBg': 'tapOption themeBrdr')}  onClick={() => this.changeDate(YESTERDAY)}>Yesterday</span>
          </div>
          {error.date ? <div className="mt10 errorDiv">{error.date}</div> : null}
        </div>
        <div className="textCenter">
          <div className={'submitBtn themeBg ' + (disableSubmit ? 'disableBtn' : '')} onClick={this.submitNewExpense}>{disableSubmit ? 'Adding...' : 'Done'}</div>
        </div>
      </div>
    );
  }
}