import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { observer, inject } from 'mobx-react';
import Title from '../sales/DescriptionTitle';
import Content from '../sales/DescriptionContent';
import '../sales/sale.css';
@inject("store")
@observer
class Admin extends Component{
    componentDidMount(){
        this.props.store.order.getData();
    }
    render(){
        return(
            <div className="order">
                <Row className="header">
                    <Title />
                </Row>
                <Row className="content">
                    <Content />
                </Row>
                
            </div> 
        );
    }
}
export default Admin;