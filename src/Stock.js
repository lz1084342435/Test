import React, { Component } from 'react';
import { Tabs,Row } from 'antd';
import Search from './Search';
import StockContent from './StockContent';

class componentName extends Component {  
    render(){
        return (
            <div>
               <Row>
                   <Search {...this.props}/>
               </Row>
               <Row>
                   <StockContent {...this.props}/>
               </Row>
            </div>
        )
    }
}
export default componentName;