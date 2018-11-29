import React, {Component} from 'react';
import { Switch, Route } from 'react-router';
import Home from './pages/HomeComponent';

export default class App extends Component {
    render() {
        return (
            <div>
               <Home></Home>
            </div>
        );
    }
}