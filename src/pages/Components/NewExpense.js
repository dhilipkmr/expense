import React, {Component} from 'react';

export default class NewExpense extends Component {
  constructor(props) {
    super(props);
    this.selectType = this.selectType.bind(this);
    // this.addNewExpense = this.addNewExpense.bind(this);
    this.state = {
      type: '',
      amount: ''
    }
  }

  selectType(type) {
    this.setState({type: type});
  }
  changeAmount(val){
    this.setState({amount: val})
  }

  render() {
    const {type, amount} = this.state;
    return (
      <div className="newExpenseContainer zi2">
        <div className="expIncBtns textCenter">
          <span className={'newBtn ' + (type === 'expense' ? 'selectedType' : '')}  onClick={() => this.selectType('expense')}>Expense</span>
          <span className={'newBtn ' + (type === 'income' ? 'selectedType' : '')} onClick={() => this.selectType('income')}>Income</span>
        </div>
        <div className="amountInput">
        <span>₹</span>
          <input type="text" placeholder="Amount" onChange={() => this.changeAmount(this.value)} value={amount}/>
        </div>
        <div  className="categoryInput">
          <input type="text" placeholder="Category"/>
        </div>
        <div className="spentDay">
          <input className="dayIp" type="text" maxLength="2" placeholder="dd"/>
          <input className="dayIp" type="text" maxLength="2" placeholder="mm"/>
          <input className="dayIp" type="text" maxLength="2" placeholder="yy"/>
        </div>
        <div className="textCenter">
          <div className="submitBtn">Done</div>
        </div>
      </div>
    );
  }
}