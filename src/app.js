import React, {Component} from 'react';
import { Switch, Route } from 'react-router';
import Home from './pages/Components/Login';
import Routes from './pages/routes/routes';
import {ServerRouter} from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <Routes/>
        );
    }
}