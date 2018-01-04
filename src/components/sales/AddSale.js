import React, { Component } from 'react';
import { Row, Col, Table, Input, DatePicker, Select, Upload, Button, Icon, Checkbox, Modal, InputNumber } from 'antd';
import { observer, inject } from 'mobx-react';
import { action, runInAction, toJS } from 'mobx';
import { Link } from 'react-router-dom';
import Addmodal from './Addmodal';
import './sale.css';


const Option = Select.Option;
@inject("store")
@observer
class componentName extends Component {

    constructor(props){
        super(props);
        this.state = {
            status:"执行中",
            sname:"",
            num:1,  //数量
            shippay:"", //运费
            theSum:0.0,  //合计
            cnameid:'', //客户对应的编号
        }
    }
    componentDidMount() {
        this.props.store.neworder.getData();
        
    }
    
    onChange = (type,value) =>{
        if(type === "starttime"){
            console.log(value)
        }
    }
    addProducts = () =>{
        runInAction(() => {
            this.props.store.neworder.addvisible = true;
        })      
    }
    deleteSales = (id) =>{
        console.log(id)
    }
    handleChange = (info) => {
        let fileList = info.fileList;
        fileList = fileList.slice(-2);
        fileList = fileList.map((file) => {
          if (file.response) {
            file.url = file.response.url;
          }
          return file;
        });
        fileList = fileList.filter((file) => {
          if (file.response) {
            return file.response.status === 'success';
          }
          return true;
        });
    
        this.setState({ fileList });
      }
      
    render() {  
        const columns = [{
            title: '图片',
            dataIndex: 'img',
            className:"fontSize",
            key: '图片',
            render:(text,record) => {
                return(
                    <img src={text} style={{ width:50, height:50 }} />
                )
            }
        }, {
            title: 'SKU',
            dataIndex: 'sku',
            className:"fontSize",
            key: 'SKU',
        }, {
            title: '产品名称',
            dataIndex: 'skuname',
            className:"fontSize",
            key: '产品名称',
        }, {
            title: '品牌',
            dataIndex: 'brand',
            className:"fontSize",
            key: '品牌',
        }, {
            title: '规格',
            dataIndex: 'size',
            className:"fontSize",
            key: '规格',
        }, {
            title: '分类',
            dataIndex: 'name',
            className:"fontSize",
            key: '分类',
        },{
            title: '销售价格',
            dataIndex: 'price',
            className:"fontSize",
            key: '销售价格',
            render:(text,record,i) =>{
                return(
                    <Input 
                        value={text} 
                        style={{ width:120 }}
                        onChange={action((e)=>{
                            this.props.store.neworder.seleData[i].price=e.target.value;
                        })}
                    />   
                )
            }
        }, {
            title: '数量',
            dataIndex:'realNum',
            className:"fontSize",
            key: '数量',
            render:(text,record,i) => {
                return(
                    <InputNumber 
                        min={1}
                        value={text}
                        style={{ width:80 }}
                        onChange={
                            action((e) => {
                                this.props.store.neworder.seleData[i].realNum = e;
                            })
                        }
                    /> 
                )
            }
        },{
            title: '小计',
            dataIndex: 'realSum',
            className:"fontSize",
            key: '小计',
            render:(record,text,i)=>{
                let sum = "";
                sum = ((this.props.store.neworder.seleData[i].realNum)*(this.props.store.neworder.seleData[i].price)).toFixed(2);
                runInAction(() => { 
                    this.props.store.neworder.seleData[i].realSum = sum;          
                })     
                return(
                    <span>{sum}</span>
                )      
            }
        },{
            title: '操作',
            key: 'id',
            className:"fontSize",
            render:(text,record) => {
                return(
                    <span
                        style={{ cursor:"pointer" }}
                        onClick={()=>{
                            this.deleteSales(record.id)
                        }}
                    >
                    删除
                    </span>
                )
            }
        }];
  
        const prop = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange: this.handleChange,
            multiple: true,
        };     
        let sum = 0.0;
        toJS(this.props.store.neworder.seleData).map((Item,index) => {
            sum += Number(Item.realSum);
        })
        return (
            <div className="addStyle">
                <Row>
                    <Row style={{ fontSize: 18, color:"#333333" }}>新建合同</Row>
                    <Row className="rowType">
                        <Col span={6}>
                            <Row>合同编号：</Row>
                            <Input
                                style={{ width:150, marginTop:6, color:"#333333" }}
                                value={this.props.store.neworder.value.dlkey}
                                disabled
                            />
                        </Col>
                       <Col span={6}>
                            <Row>合同类型：</Row>
                            <Select
                                style={{ width:150, marginTop:6 }}
                            >
                            {this.props.store.neworder.type.map((Item,index) => {
                                return(
                                    <Option key={Item.id} value={Item.id}>{Item.name}</Option>
                                )
                            })}                            
                            </Select>
                            <Link style={{ marginLeft:8 }} to='/nest/app/sales/addSale'>新增</Link>
                        </Col>
                         <Col span={6}>
                            <Row>客户：</Row>
                            <Select
                                style={{ width:150, marginTop:6 }}
                                onChange={(value)=>{
                                    this.state.cnameid = value;
                                    this.setState({ cnameid:value })
                                }}
                            >
                            {this.props.store.neworder.cnameData.map((Item,index) => {
                                return(
                                    <Option key={Item.id} value={Item.id}>{Item.name}</Option>
                                )         
                            })}
                            </Select>
                            <Link style={{ marginLeft:8 }} to='/nest/app/sales/addSale'>新增</Link>
                        </Col>
                        <Col span={6}>
                            <Row>收货地址：</Row>
                            <Select
                                style={{ width:150, marginTop:6 }}
                            >
                           {
                                // toJS(this.props.store.neworder.caddress).map((Item,index) => {
                                //     if(Item.id === this.state.cnameid){
                                //         console.log(2222)
                                //     }
                                //     else{
                                //          console.log(111)
                                //     }
                                // })
                           }
                            </Select>
                            <Link style={{ marginLeft:8 }} to='/nest/app/sales/addSale'>新增</Link>
                        </Col>
                    </Row>
                    <Row className="rowType">
                        <Col span={6}>
                            <Row>创建时间：</Row>
                            <DatePicker
                                style={{ width:150, marginTop:6 }}
                                onChange={(value)=>{ this.onChange("starttime",value) }}

                            />
                        </Col>
                        <Col span={6}>
                            <Row>客户收货日期：</Row>
                            <DatePicker
                                style={{ width:150, marginTop:6 }}
                                onChange={(value)=>{ this.onChange("deliverytime",value) }}

                            />
                        </Col>
                        <Col span={6}>
                            <Row>合同状态：</Row>
                            <Select
                                value={this.state.status}
                                showSearch
                                style={{ width:150, marginTop:6, height:28 }}
                                allowClear
                                onChange={(value) => {this.setState({ status:value })}}
                            >
                                <Option key={"1"} value={"1"}>执行中</Option>
                                <Option key={"2"} value={"2"}>意外终止</Option>
                                <Option key={"3"} value={"3"}>终止</Option>
                                <Option key={"4"} value={"4"}>已完成</Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <Row>负责人：</Row>
                            <Select
                                value={this.props.store.neworder.sname}
                                showSearch
                                style={{ width:150, marginTop:6, height:28 }}
                                allowClear
                                onChange={(value) => {this.setState({ sname:value })}}
                            >
                            </Select>
                        </Col>
                    </Row>
                    <Row className="rowType">
                        <Col span={6}>
                            <Row>合同文件：</Row>
                            <Upload 
                                {...prop}    
                            >
                                <Button  style={{ width:120, height:28, marginTop:6 }}>
                                    <Icon type="upload" /> 上传合同
                                </Button>
                            </Upload>
                        </Col>
                        <Col span={6}>
                            <Row>发票信息：</Row>
                            <Checkbox style={{ width:5, height:5, marginTop:10 }} />
                            <span style={{ marginLeft:15, marginTop:10 }}>是否含税</span>
                        </Col>
                        <Col span={12}>
                            <Row>备注：</Row>
                            <Input style={{ width:417, marginTop:6 }} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop:50 }}>
                        <span style={{ marginLeft:500 }}>合同清单</span>
                    </Row>
                    <Row>
                        <Button 
                            type="primary"
                            style={{ marginTop:25, fontSize:14 }}
                            onClick={this.addProducts}
                        >添加商品</Button>
                    </Row>  
                    <Row>
                        <Table 
                            rowKey={x=>{return x.id}}
                            columns={columns}
                            style={{ marginTop:20 }}
                            pagination={false}
                            dataSource={toJS(this.props.store.neworder.seleData)}
                            footer={() => {
                            return(
                                <span style={{ float:"right", fontSize:14 }}>
                                    <span>运费：</span>
                                    <Input 
                                        placeholder="请输入运费" 
                                        style={{ width:120 }} 
                                        value={this.state.shippay} 
                                        onChange={(text)=>{
                                            this.setState({ shippay:text.target.value })
                                        }}
                                    />
                                    <span style={{ marginRight: 10, marginLeft:10 }}>合计:
                                        {(Number(sum)+Number(this.state.shippay)).toFixed(2)}
                                    </span>
                                </span>
                            )
                        }}
                        />
                    </Row>
                    <Row style={{ float:"right",marginRight:10, marginTop:35 }}>
                        <Button type="primary" style={{ width:65, height:30 }}>保存</Button>
                        <Button style={{ background:"#F5F5F5", marginLeft:10, width:65, height:30 }}>取消</Button>
                    </Row>
                </Row>
                <Modal
                    className="onAddmodal"
                    visible={this.props.store.neworder.addvisible}
                    title="添加商品"
                    onCancel={this.props.store.neworder.hideModal}
                    onOk={this.props.store.neworder.confirm}
                >
                <Addmodal />
                </Modal>
            </div>
        );
    }
}

export default componentName;