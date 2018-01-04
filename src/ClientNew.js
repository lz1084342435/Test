import React, { Component } from 'react';
import { Row, AutoComplete, Button, Table, Modal, message, Input } from 'antd';
import { action, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';

class componentName extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            obj:{
                customer:"",
                no:"",
                c:"",

            }
        }
    }
   
    render(){
        return(
            <div>
                <Row>客户名称 ：</Row><Input style={{ maxWidth:120 }} value={this.state.obj.customer}/>
                <Row>省份 ：</Row><Input style={{ maxWidth:120 }} value={this.state.obj.customer}/>
                <Row>详细地址 ：</Row><Input style={{ maxWidth:120 }} value={this.state.obj.customer}/>
                <Row>电话 ：</Row><Input style={{ maxWidth:120 }} value={this.state.obj.customer}/>
                <Row>备注 ：</Row><Input style={{ maxWidth:120 }} value={this.state.obj.customer}/>
            </div>
        )
    }
}
export default componentName;