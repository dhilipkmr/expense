import React, {Component} from 'react';
import {new_expense, edit_expense, getFrequentCategories} from '../apiCalls/ApiCalls';
import {MONTHSNAMESHORT, TODAY, YESTERDAY} from '../constants/constants';
import {renderOptions, Ripple} from '../utils/utils';

export default class NewExpense extends Component {
  constructor(props) {
    super(props);
    this.selectType = this.selectType.bind(this);
    this.submitNewExpense = this.submitNewExpense.bind(this);
    this.renderInnerTransactioncard = this.renderInnerTransactioncard.bind(this);
    this.handleFrequentCategoriesTap = this.handleFrequentCategoriesTap.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    let  amount = '';
    let  category = '';
    let  day = '';
    let  month = '';
    let  year = '';
    let description = '';
    if (props.editTransactionObj) {
      amount = props.editTransactionObj.amount;
      category = props.editTransactionObj.category;
      description = props.editTransactionObj.description;
      var date = new Date(props.editTransactionObj.date)
      day = date.getDate();
      month = date.getMonth();
      year = date.getFullYear();

    }
    this.state = {
      type: 'expense',
      amount: amount,
      category: category,
      description: description,
      day: day, 
      month: month,
      year: year,
      error: {},
      frequentCategories: []
    }
  }

  componentDidMount() {
    getFrequentCategories().then((res) => {
      if (res.data && !res.data.err) {
        this.setState({frequentCategories: res.data.data.slice(0,5)});
      } else {
        console.log('Unable to get Frequent Categories');
      }
    });
    history.pushState('MODAL', '/new_expense');
    window.onpopstate = this.onBackPress;
  }

  onBackPress(backObj) {
    window.onpopstate = null;
    this.props.newExpense(false);
  }

  renderInnerTransactioncard() {
    return (
      <div>
        <div key="categoryLoader" className="transactedCardInner mh62">
          <div className="cardInnerheading dflex dfcenter">
            <span className="cat_percent progressBar fl m0 mt10"></span>
          </div>
          <div className="progressBar bl textCenter " >
          </div>
        </div>
      </div>
    );
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

  getDateData(val) {
    let currDate = new Date();
    if (val === YESTERDAY) {
      let date = new Date(currDate.setDate(currDate.getDate() - 1));
      currDate = date;
    }
    return { day: currDate.getDate(), month: currDate.getMonth(), year: currDate.getFullYear() };
  }

  changeDate(val) {
    if (val === TODAY) {
      const dateData = this.getDateData(TODAY);
      this.setState({ todayTap:true, yesterdayTap: false, ...dateData}, () => {
        this.removeDateError();
      });
    } else if (val == YESTERDAY) {
      const dateData = this.getDateData(YESTERDAY);
      this.setState({ todayTap: false, yesterdayTap: true, ...dateData}, () => {
        this.removeDateError();
      });
    } else {
      this.setState({...val}, () => {
        this.removeDateError();
        const dateDataToday = this.getDateData(TODAY);
        const dateDataYesterday = this.getDateData(YESTERDAY);
        const {day, month, year} = this.state;
        if (day.toString() === dateDataToday.day.toString() && month.toString() === dateDataToday.month.toString() && year.toString() === dateDataToday.year.toString()) {
          this.setState({todayTap: true, yesterdayTap: false});
        } else if (day.toString() === dateDataYesterday.day.toString() && month.toString() === dateDataYesterday.month.toString() && year.toString() === dateDataYesterday.year.toString()) {
          this.setState({todayTap: false, yesterdayTap: true});
        } else {
          this.setState({todayTap: false, yesterdayTap: false});
        }
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
    var reg = /^[1-9][0-9]*$/;
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
    const {amount, day, month, year, type, category, description} = this.state;
    const isValidationSuccess = this.validateParams();
    this.setState({disableSubmit: true});
    if (isValidationSuccess) {
      const date = this.date;
      const mm = date.getMonth();
      const yy = date.getFullYear();
      const firstDayofMonth = new Date(yy, mm, 1).getDay();
      const ww = Math.ceil((firstDayofMonth + date.getDate()) / 7);
      const dow = date.getDay();
      const dd = date.getDate();
      const params = { amount, type, date, mm, yy, ww, dow, dd, category, description};
      params.category= params.category.trim().substring(0,1).toUpperCase() + params.category.trim().substring(1);
      if (this.props.editTransactionObj) {
        params.id = this.props.editTransactionObj.id;
        edit_expense(params).then((resp) => {
          this.props.newExpense(false, true, false);
        }, (err) => {
          console.log('Unable to Edit Expense',err);
          this.setState({disableSubmit: false});
        });
      } else {
        new_expense(params).then((response) => {
          this.props.newExpense(false, true);
        }, (err) => {
          console.log('Unable to create new Expense',err);
          this.setState({disableSubmit: false});
        });
      }
    } else {
      this.setState({disableSubmit: false});
    }
  }

  handleFrequentCategoriesTap(e) {
    if (e.target.classList.contains('ripple--container')) {
      this.setState({ category: e.target.parentElement.innerText});
    }
  }

  renderFrequentCategories() {
    return (
      <div className="tapWrapper" onClick={this.handleFrequentCategoriesTap}>
        {this.state.frequentCategories.map((entry) => {
          return (
            <Ripple classes={'tapOptionMargin ' + (this.state.category.toLowerCase() === entry.category.toLowerCase() ? 'activeTapOption themeBg': 'tapOption themeBrdr')}>
              {entry.category}
            </Ripple>
          )
        })}      
      </div>
    );
  }

  render() {
    const {type, amount, day, month, year, category, error, disableSubmit} = this.state;
    return (
      <div className="newExpenseContainer zi10" id="expenseContainer">
        <div className="expIncBtns textCenter mT25">
          <Ripple classes={'in-bl newBtn ' + (type === 'expense' ? 'selectedType' : '')} onClickHandler={() => this.selectType('expense')} >Expense</Ripple>
          <Ripple classes={'in-bl newBtn ' + (type === 'income' ? 'selectedType' : '')} onClickHandler={() => this.selectType('income')} >Income</Ripple>
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
          {this.state.frequentCategories.length === 0 ? this.renderInnerTransactioncard() : this.renderFrequentCategories()}
        </div>
        <div  className="descriptionInputWrap tc m-5 mT25 ">
          <input id="newDescription" className="padL10 w75" placeholder="Description" onChange={(e) => this.setState({ description: e.target.value})} value={this.state.description}/>
        </div>
        <div className="spentDay mT25 ">
          <select ref="day" className="w20 " onChange={(e) => this.changeDate({day: e.target.value})} value={this.state.day}>{renderOptions('day')}</select>
          <select ref="month" className="w25 " onChange={(e) => this.changeDate({month: e.target.value})} value={this.state.month}>{renderOptions('month')}</select>
          <select ref="year" className="w20 " onChange={(e) => this.changeDate({year: e.target.value})} value={this.state.year}>{renderOptions('year')}</select>
          <div className="tapWrapper">
            <Ripple classes={'tapOptionMargin ' + (this.state.todayTap ? 'activeTapOption themeBg': 'tapOption themeBrdr')} onClickHandler={() => this.changeDate(TODAY)} >Today</Ripple>
            <Ripple classes={'tapOptionMargin ' + (this.state.yesterdayTap ? 'activeTapOption themeBg': 'tapOption themeBrdr')} onClickHandler={() => this.changeDate(YESTERDAY)} >Yesterday</Ripple>
          </div>
          {error.date ? <div className="mt10 errorDiv">{error.date}</div> : null}
        </div>
        <div className="textCenter">
          <Ripple classes={'submitBtn themeBg ' + (disableSubmit ? 'disableBtn' : '')} onClickHandler={this.submitNewExpense} >Done</Ripple>
        </div>
      </div>
    );
  }
}