import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Admin from './components/admin';
import Login from './components/login';
import Description from './components/sales/SaleDescription';
import Ordermanage from './components/sales/OrderManage';

let user = JSON.parse(sessionStorage.getItem("user")) || {};
class APP extends Component{
    render(){
        return(
            <Switch>
                <Route path="/nest/app" component={Admin} />
                <Route path="/nest/login" exact component={Login} />
                {/* <Route path="/nest/app/sales/SaleDescription" exact component={Description} />
                <Route path="/nest/app/sales/OrderManage" exact component={Ordermanage} /> */}
                {/* 重定向路由 */}
                <Redirect from="/nest" to={user.roleid ? "/nest/app":"/nest/login"}  />
            </Switch>
        );
    }
}

class RouteComponent extends Component{
    render(){
        return(
            <Router>
                <div>
                    <Switch>
                        <Route path="/nest" component={APP} />
                        {/* 重定向路由 */}
                        {<Redirect from="/" to="/nest" />}  
                    </Switch>      
                </div> 
            </Router>
        );
    }
}
export default RouteComponent;