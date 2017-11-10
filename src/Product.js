import React, { Component } from 'react';
import { Button, Table, Input } from 'antd';
import {action} from 'mobx';
import loginimage from '../src/asset/loginbackground.png';
class componentName extends Component{  
    constructor(props){
        super(props);
        this.state={
            prodata:[]
        }
    }
    componentWillMount() {
        const that=this
        fetch("/home/product/getAlertProduct",{ 
            method: 'get',
            credentials: 'include',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
         }).then(x => x.json()).then(function(data){
            if(data.status == 1){
                that.setState({prodata:data.data})
                console.log(data.data)
            }
            
        }).catch(err => console.error(err))
    }   
    render(){
        const columns = [{
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            render:(text,record) => (
                <span><img src={record.img ? record.img : loginimage } style={{height:50,width:50}} /></span>
            )       
          }, {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
          }, {
            title: '商品名称',
            dataIndex: 'skuname',
            key: 'skuname',
          }, {
            title: '规格',
            dataIndex: 'size',
            key: 'size',   
          },{
            title: '当前库存',
            dataIndex: 'num',
            key: 'num', 
            render:(text,record) => (
                <span style={{color:record.num<record.safe_num?"red":""}}>{record.num}</span>
            )
          },{
            title: '安全库存',
            dataIndex: 'safe_num',
            key: 'safe_num',   
          }];
        return(
        <div style={{paddingTop:50}}>
           <span style={{fontSize:18,marginTop:50,marginLeft:40}}>库存预警</span>
           <Table columns={columns} dataSource={this.state.prodata} style={{width:"auto",marginRight:40,textAlign:"center",marginLeft:40,marginTop:8}}/>
        </div>
        )
    }
}
export default componentName;