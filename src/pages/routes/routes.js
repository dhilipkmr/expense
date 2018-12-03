import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';

import Login from '../Components/Login';
import NotFound from '../Components/NotFound'
import Home from '../HomeComponent';

export default () => {
    return (
        <Switch>
            <Route path='/' exact render={(props) => <Login {...props}/>}/>
            <Route path='/login' exact render={(props) => <Login {...props}/>}/>
            <Route render={(props) => <NotFound {...props}/>}/>
        </Switch>
    );
}