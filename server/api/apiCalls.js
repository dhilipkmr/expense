import mongoose from 'mongoose';
import app from '../server'
import Expenses from '../models/expenseModel';
import Users from '../models/userModel';
import { MONTH, YEAR, WEEK } from '../../src/pages/constants/constants';

export const signUp = (request, response) => {
    const { username = '', password = '', emailId = '' } = request.body;
    var user = new Users({
        _id: mongoose.Types.ObjectId(),
        username: username,
        password: password,
        emailId: emailId
    });
    Users.find({ username: username }).then((res) => {
        if (res.length > 0) {
            response.send({ error: true, msg: 'Username already Exists' });
        } else {
            user.save().then((doc) => {
                request.session._userId = doc.id;
                response.send({ error: false, msg: 'Saved Successfully' });
            }, (e) => {
                response.status(500).send(e);
            });
        }
    }, (e) => {
        response.send(e);
        console.log(e);
    });
};

export const signIn = (request, response) => {
    const { username = '', password = '', emailId = '' } = request.body;
    console.log(request.session.user);
    Users.findOne({ username: username, password: password }).then((res) => {
        if (res) {
            request.session._userId = res.id;
            response.send({ error: false, msg: 'success' });
        } else {
            response.send({ error: true, msg: 'No user account found' });
        }
    }, (e) => {
        response.send(e);
        console.log(e);
    });
};

export const logout = (request, response) => {
    request.session._userId = null;
    response.send({ error: false, msg: 'success' });
};

export const getUserInfo = (request, response) => {
    if (request.session._userId) {
        const id = mongoose.Types.ObjectId(request.session._userId);
        Users.findOne({ _id :id}).then((res) => {
            if (res) {
                const username = res.username;
                response.send({ userInfo: {username: username} });
            } else {
                response.send({ error: true, msg: 'No user account found' });
            }
        }, (e) => {
            response.send(e);
            console.log(e);
        });
    } else  {
        response.send(200).send({error: true});
    }
   
};


export const newExpense = (request, response) => {
    let { amount, date } = request.body;
    const {  ww, dow, mm, yy, dd, type, category } = request.body;
    amount = parseInt(amount);
    date = new Date(date);
    const newExpense = { amount, category, date, type, ww, dow, mm, yy, dd };
    var newExpenseInstance = new Expenses({
        user_id: mongoose.Types.ObjectId(request.session._userId),
        ...newExpense
    });
    newExpenseInstance.save().then((doc) => {
        response.send(doc);
    }, (err) => {
        console.log('Failed to save new Expense', err);
        response.status(500).send(err);
    });
};

export const getExpenseData = (request, response) => {
    const userId = request.session._userId ? mongoose.Types.ObjectId(request.session._userId) : mongoose.Types.ObjectId("5c10ba234f8b6296c08e5818");
    const {activeFilter} = request.body;
    function expenseDateResponder(err, data) {
        if (err) {
            respond.send(500).send(err);
        } else {
            let expenseList = {}, incomeList={};
            Object.keys(data).map((key) => {
                if (data[key].type === 'expense') {
                    expenseList = data[key];
                } else if (data[key].type === 'income') {
                    incomeList = data[key];
                }
            });
            let spent, standing;
            if (expenseList && expenseList.transactionList) {
                expenseList.transactionList.map((transaction) => {
                    let percent = transaction.amount / (expenseList.amount / 100);
                    transaction.percent = Math.round(percent * 100) / 100;
                });
                spent = expenseList.amount;
            } else  {
                spent = 0;
            }
            if (incomeList && incomeList.transactionList) {
                incomeList.transactionList.map((transaction) => {
                    let percent = transaction.amount / (incomeList.amount / 100);
                    transaction.percent = Math.round(percent * 100) / 100;
                });
                standing = incomeList.amount - spent;
            } else {
                standing = 0 - spent;
            }
            const { yy, mm, ww, dd} = request.body
            response.send({ dd:dd, mm: mm, yy: yy, ww: ww, expenseList: expenseList, incomeList: incomeList, spent: spent, standing: standing });
        }
    }

    // Queries start
    const group1 = {
        $group: {
            _id: { category: '$category', type: '$type' },
            type: { '$first': '$type' },
            category: { '$first': '$category' },
            date: { '$first': '$date' },
            amount: { $sum: '$amount' }
        }
    };
    const group2 = {
        $group: {
            _id: { type: '$type' },
            amount: { $sum: '$amount' },
            type: { '$first': '$type' },
            transactionList: { $push: { category: '$category', amount: '$amount', date: '$date', id: '$_id' } }
        }
    };
    const unwind = { $unwind: '$transactionList' };
    let sort = {};
    if (activeFilter === 'spentRate') {
        sort = { $sort: { 'transactionList.amount': -1 } };
    } else {
        sort = { $sort: { 'transactionList.date': -1 } };
    }
    const reGroup = {
        $group: {
            _id: { type: '$type' },
            amount: { '$first': '$amount' },
            type: { '$first': '$type' },
            transactionList: { $push: '$transactionList' }
        }
    };
    // Queries end

    const { tab, ww, mm, yy, dow } = request.body;
    if (tab === YEAR) {
        Expenses.aggregate([
            { $match: { user_id: userId} },
            { $match: { yy: parseInt(yy) } },
            {...group1 },{ ...group2 },
            { ...unwind },{ ...sort },{ ...reGroup },
            { $project: { _id: 0, amount: 1, type: 1, transactionList: 1 } }
        ]).allowDiskUse(true).exec(expenseDateResponder);
    } else if (tab === MONTH) {
        Expenses.aggregate([
            { $match: { user_id: userId } },
            { $match: { yy: parseInt(yy) } },{ $match: { mm: parseInt(mm) } },
            {...group1 },{ ...group2 },
            { ...unwind },{ ...sort },{ ...reGroup },
            { $project: { _id: 0, amount: 1, type: 1, transactionList: 1 } }
        ]).allowDiskUse(true).exec(expenseDateResponder);
    } else if (tab === WEEK) {
        Expenses.aggregate([
            { $match: { user_id: userId } },
            { $match: { yy: parseInt(yy) } },{ $match: { mm: parseInt(mm) } },{ $match: { ww: parseInt(ww) } },
            {...group1 },{ ...group2 },
            { ...unwind },{ ...sort },{ ...reGroup },
            { $project: { _id: 0, amount: 1, type: 1, transactionList: 1 } }
        ]).allowDiskUse(true).exec(expenseDateResponder);
    }
};

export const getExpenseSummary = (request, response) => {
    function execSummaryQuery(err, data) {
        if (err) {
            respond.send(500).send(err);
        } else {
            if (data && data[0] && data[0].perDivisionData) {
                let maxAmount = Number.MIN_SAFE_INTEGER;
                data[0].perDivisionData.forEach(entry => {
                    if (maxAmount < entry.amount) {
                        maxAmount = entry.amount
                    }
                });
                data[0].maxAmount = maxAmount;
                response.send({...data[0]});
            } else {
                response.send({});
            }
        }
    };
    const userId = request.session._userId ? mongoose.Types.ObjectId(request.session._userId) : mongoose.Types.ObjectId("5c10ba234f8b6296c08e5818");
    const {tab, yy, mm, ww} = request.body;
    if (tab === YEAR) {
        Expenses.aggregate([
            {$match: { user_id: userId }},
            {$match: { yy: yy}},
            {$match: { type: 'expense'}},
            {$group: { _id: { mm: '$mm'}, amount: {$sum: '$amount'}, month: {'$first': '$mm'}}},
            {$sort: { month: 1 }},
            {$group: {_id: null, totalAmount: {'$sum': '$amount'}, perDivisionData: {$push : { amount: '$amount', division: '$month'}}}},
            {$project: {_id: 0}}
            ]).allowDiskUse(true).exec(execSummaryQuery);
    } else if (tab === MONTH) {
        Expenses.aggregate([
            {$match: { user_id: userId }},
            {$match: { yy: yy}},
            {$match: { mm: mm}},
            {$match: { type: 'expense'}},
            {$group: { _id: {dd: '$dd'}, amount: {'$sum': '$amount'}, dd: {'$first': '$dd'} }},
            {$sort: {dd: 1}},
            {$group: {_id: null, totalAmount: {'$sum': '$amount'}, perDivisionData: {$push: {amount: '$amount', division: '$dd'}}}},
            {$project: {_id:0}}
            ]).allowDiskUse(true).exec(execSummaryQuery);
    } else if (tab === WEEK) {
        Expenses.aggregate([
            {$match: { user_id: userId }},
            {$match: { yy: yy}},
            {$match: { mm: mm}},
            {$match: { ww: ww}},
            {$match: { type: 'expense'}},
            {$group: { _id: {dow: '$dow'}, amount: {$sum: '$amount'}, dow: {'$first': '$dow'}}},
            {$sort: { dow: 1}},
            {$group: { _id: null, totalAmount: {$sum: '$amount'},  perDivisionData: {$push: {amount: '$amount', division: '$dow'}}}},
            {$project: {_id: 0}}
            ]).allowDiskUse(true).exec(execSummaryQuery);
    }
}

export const deleteExpenseDate = (request, response) => {
    const {id} = request.body;
    Expenses.findOneAndRemove({_id: id}).then((doc) => {
        response.send(doc);
    });
}

export const editExpense = (request, response) => {
    let {amount, date} = request.body;
    const {  id, ww, dow, mm, yy, dd, type, category } = request.body;
    amount = parseInt(amount);
    date = new Date(date);
    const newExpense = { amount, category, date, type, ww, dow, mm, yy, dd };
    Expenses.findOneAndUpdate(
        {_id: id},
        {$set: {'amount': amount, 'category': category, 'date': date, 'type': type, 'ww': ww, 'dd': dd, 'mm': mm, 'yy': yy, 'dow': dow } },
        {upsert:true, returnNewDocument : true}
    ).then((doc) => {
        response.send(doc);
    });
}
