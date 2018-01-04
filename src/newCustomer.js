import React,{ Component } from 'react';
import { Table, Button, Row, AutoComplete, Modal, message,Input } from 'antd';

class componentName extends Component{
    render(){
        return(
            <div>
                <Row>
                    <Row>
                        <span style={{color:"red",fontSize:8}}>*</span>
                        <span style={{fontSize:12}}>供应商名称</span>
                        <Input placeholder="请输入产品名称" style={{maxWidth:120,marginLeft:10}} />
                    </Row>
                    <Row>
                        
                    </Row>
                </Row>
            </div>
        )
    }

}
export default componentName;