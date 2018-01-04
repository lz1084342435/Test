import React, { Component } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';

//销售
import SaleDescription from '../sales/SaleDescription';
import Ordermanage from '../sales/OrderManage';
import AddSale from '../sales/AddSale';
class App extends Component{
    render(){
        return(
            <Router history={this.props.history}>
            <div>
                <Route path="/nest/app/sales/SaleDescription" component={SaleDescription} /> 
                <Route path="/nest/app/sales/OrderManage" component={Ordermanage} />
                <Route path="/nest/app/sales/addSale" component={AddSale} />
            </div>
            {/* 销售 */}      
            </Router>  
        );
    }
}
export default App;