import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import ReactDOM from 'react-dom';

import Login from '../components/Login';
import NotFound from '../components/NotFound'
import Home from '../components/Home';

export default () => {
    return (
        <Switch>
            <Route path='/' exact render={(props) => <Login {...props}/>}/>
            <Route path='/login' exact render={(props) => <Login {...props}/>}/>
            <Route path='/home' exact render={(props) => <Home {...props}/>}/>
            {/* <Route path='/' exact render={(props) => <Home {...props}/>}/> */}
            <Route path='*' render={(props) => <NotFound {...props}/>}/>
        </Switch>
    );
}