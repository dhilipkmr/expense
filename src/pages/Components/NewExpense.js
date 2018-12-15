import React, {Component} from 'react';
import {new_expense} from '../apiCalls/ApiCalls';
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
    this.setState({amount: val})
  }

  changeDate(val, current, next) {
    this.setState({...val});
    if (current && val[current].length === 2 && next) {
      this.refs[next].focus();
    }
  }

  isValidDate() {
    const {day, month, year} = this.state;
    var dateReg = /^[0-9][0-9]$/;
    if (!dateReg.test(day) || !dateReg.test(month) || !dateReg.test(year)) {
      return false;
    } else {
      this.date = new Date(2000 + parseInt(year), parseInt(month)-1, parseInt(day));
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
      this.setState({error: {date: 'Please provide a Valid Date'}});
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
        this.props.newExpense(false);
      }, (err) => {
        console.log('Unable to create new Expense',err);
      });
    }
  }

  render() {
    const {type, amount, day, month, year, category, error} = this.state;

    return (
      <div className="newExpenseContainer zi2">
        <div className="expIncBtns textCenter">
          <span className={'newBtn ' + (type === 'expense' ? 'selectedType' : '')}  onClick={() => this.selectType('expense')}>Expense</span>
          <span className={'newBtn ' + (type === 'income' ? 'selectedType' : '')} onClick={() => this.selectType('income')}>Income</span>
        </div>
        <div className="amountInput">
        <span>₹</span>
          <input type="text" placeholder="Amount" onChange={(e) => this.changeAmount(e.target.value)} value={amount}/>
          {error.amount ? <div className="errorDiv">{error.amount}</div> : null}
        </div>
        <div  className="categoryInput">
          <input type="text" placeholder="Category" onChange={(e) => this.setState({category: e.target.value})} value={category}/>
          {error.category ? <div className="errorDiv">{error.category}</div> : null}
        </div>
        <div className="spentDay">
          <input ref="day" className="dayIp" type="number" maxLength="2" placeholder="DD" onChange={(e) => this.changeDate({day: e.target.value}, 'day', 'month')} value={day}/>
          <input ref="month" className="dayIp" type="number" maxLength="2" placeholder="MM" onChange={(e) => this.changeDate({month: e.target.value}, 'month', 'year')} value={month}/>
          <input ref="year" className="dayIp" type="number" maxLength="2" placeholder="YY" onChange={(e) => this.changeDate({year: e.target.value}, 'year')} value={year}/>
          {error.date ? <div className="errorDiv">{error.date}</div> : null}
        </div>
        <div className="textCenter">
          <div className="submitBtn" onClick={this.submitNewExpense}>Done</div>
        </div>
      </div>
    );
  }
}