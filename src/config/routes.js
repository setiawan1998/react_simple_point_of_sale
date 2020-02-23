import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './privateRoute'
import Login from '../pages/login'
import Register from '../pages/register'
import Dashboard from '../pages/dashboard'
import Reports from '../pages/reports'
import Products from '../pages/products'
import Categories from '../pages/categories'
import Stocks from '../pages/stocks'
import Cashier from '../pages/cashier'

const AppRoutes = () => {
    const access = localStorage.getItem('access');
    return(
        <Switch>
            <PrivateRoute exact path="/" access="0">
                <Dashboard/>
            </PrivateRoute>
            <PrivateRoute exact path="/cashier" access="1">
                <Cashier/>
            </PrivateRoute>
            <PrivateRoute path="/reports" access="0">
                <Reports/>
            </PrivateRoute>
            <PrivateRoute path="/products" access="0">
                <Products/>
            </PrivateRoute>
            <PrivateRoute path="/categories" access="0">
                <Categories/>
            </PrivateRoute>
            <PrivateRoute path="/stocks" access="0">
                <Stocks/>
            </PrivateRoute>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/register">
                <Register/>
            </Route>
        </Switch>
    )
}
export default AppRoutes;