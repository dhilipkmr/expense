import 'babel-polyfill';
import env from './config/config';
import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';
var session = require('express-session');

import App from '../src/app'
import mongoose1 from './db/mongoose';
import mongoose from 'mongoose';
import Users from './models/userModel';
import Expenses from './models/expenseModel';
import { MONTH, YEAR, WEEK } from '../src/pages/constants/constants';

const app = express();
const port = process.env.PORT;

app.use(session({
    secret: 'dhilipLocal',
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('build/public'));
app.use('/styles', express.static('src/pages/styles'));
app.use(express.static('src/pages/static'));

app.post('/signup', (request, response) => {
    // Users.deleteMany({});
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
                request.session._userId = doc._id;
                response.send({ error: false, msg: 'Saved Successfully' });
            }, (e) => {
                response.status(500).send(e);
            });
        }
    }, (e) => {
        response.send(e);
        console.log(e);
    });
});

app.post('/signin', (request, response) => {
    const { username = '', password = '', emailId = '' } = request.body;
    console.log(request.session.user);
    Users.find({ username: username, password: password }).then((res) => {
        if (res.length > 0) {
            request.session._userId = res[0]._id;
            response.send({ error: false, msg: 'success' });
        } else {
            response.send({ error: true, msg: 'No user account found' });
        }
    }, (e) => {
        response.send(e);
        console.log(e);
    });
});

app.post('/new_expense', (request, response) => {
    let { amount, category, date, type } = request.body;
    amount = parseInt(amount);
    date = new Date(date);
    const ww = Math.ceil(date.getDate() / 7);
    const dow = date.getDay() + 1;
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();
    const newExpense = { amount, category, date, type, ww, dow, mm, yy };
    var newExpenseInstance = new Expenses({
        user_id: mongoose.Types.ObjectId("5c1630ad7669ea2c9bb04616"),
        ...newExpense
    });
    newExpenseInstance.save().then((doc) => {
        // request.session.user = doc.username;
        console.log(' doc.username', doc);
        response.send(doc);
    }, (err) => {
        console.log('Failed to save new Expense', err);
        response.status(500).send(err);
    });

    // Users.findOneAndUpdate(
    //     { username: 'dhilipk13'},
    //     { $push: {expense: newExpense}},
    //     function (err, document) {
    //         if (err) {
    //             console.log('Failed to save new Expense', err);
    //         } else {
    //             const lastIndex = document._doc.expense.length - 1;
    //             response.send({error: false,...document._doc.expense[lastIndex]._doc});
    //         }
    //     });
});

app.post('/get_expense_data', (request, response) => {
    function expenseDateResponder(err, data) {
        if (err) {
            respond.send(500).send(err);
        } else {
            response.send({ ...data });
        }
    }

    const { tab, ww, mm, yy, dow } = request.body;
    if (tab === YEAR) {
        Expenses.aggregate([
            { $match: { user_id: mongoose.Types.ObjectId("5c1630ad7669ea2c9bb04616") } },
            { $match: { yy: parseInt(yy) } },
            {
                $group: {
                    _id: { type: '$type', category: '$category' },
                    amount: { $sum: '$amount' }
                }
            }
        ]).allowDiskUse(true).exec(expenseDateResponder);
    } else if (tab === MONTH) {
        Expenses.aggregate([
            { $match: { user_id: mongoose.Types.ObjectId("5c1630ad7669ea2c9bb04616") } },
            { $match: { yy: parseInt(yy) } },
            { $match: { mm: parseInt(mm) } },
            {
                $group: {
                    _id: { type: '$type', category: '$category' },
                    amount: { $sum: '$amount' },
                    type: '$type',
                    category: '$category'
                }
            }
        ]).allowDiskUse(true).exec(expenseDateResponder);
    } else if (tab === WEEK) {
        Expenses.aggregate([
            { $match: { user_id: mongoose.Types.ObjectId("5c1630ad7669ea2c9bb04616") } },
            { $match: { yy: parseInt(yy) } },
            { $match: { mm: parseInt(mm) } },
            { $match: { ww: parseInt(mm) } },
            {
                $group: {
                    _id: { type: '$type', category: '$category' },
                    amount: { $sum: '$amount' }
                }
            }
        ]).allowDiskUse(true).exec(expenseDateResponder);
    }
});

const loadHtml = (content) => {
    const helmet = Helmet.renderStatic();
    return (`
        <html>
            <head>
                ${helmet.meta.toString()}
                ${helmet.title.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js">
                <link rel="stylesheet" type="text/css" href="/styles/common.css">
                <link rel="stylesheet" type="text/css" href="/styles/home.css">
                <link rel="stylesheet" type="text/css" href="/styles/new_expense.css">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="client_bundle.js"></script>
            </body>
        </html>`);
};

app.get('*', (req, res) => {
    const context = {};
    const content = ReactDOMServer.renderToString(
        <StaticRouter>
            <App location={req.url} context={context} />
        </StaticRouter>
    );
    const template = loadHtml(content);
    res.send(template);
});

app.listen(port, () => {
    console.log('process.env', port);
    console.log('Server Started on Port: ', port);
});