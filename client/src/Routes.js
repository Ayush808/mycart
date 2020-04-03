import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './cores/Home'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './cores/Shop'
import Product from './cores/Product'
import Cart from './cores/Cart'
import Orders from './admin/Orders'
import Profile from './user/Profile'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/' exact component={Home} />
                    <Route path='/shop' exact component={Shop} />
                    <Route path="/product/:productId" exact component={Product} />
                    <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
                    <PrivateRoute path='/cart' exact component={Cart} />
                    <PrivateRoute path='/profile/:userId' exact component={Profile} />
                    <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                    <AdminRoute path='/create/category' exact component={AddCategory} />
                    <AdminRoute path='/create/product' exact component={AddProduct} />
                    <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct} />
                    <AdminRoute path='/admin/orders' exact component={Orders} />
                    <AdminRoute path='/admin/products' exact component={ManageProducts} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes