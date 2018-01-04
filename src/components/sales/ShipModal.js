import React, { Component } from 'react';
import { Row, Col, Input, Checkbox, Table, InputNumber } from 'antd';
import { observer, inject } from 'mobx-react';
import { toJS, runInAction } from 'mobx';
import './sale.css';
import image from '../../asset/package.png';
@inject("store")
@observer
class componentName extends Component {
    constructor(props){
        super(props);
        this.state = {
            express:"",
            expNo:"",
            address:"",
            note:"",
            realGet:""
        }
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                runInAction(() => {
                    this.props.store.order.selectedRowKeys = selectedRowKeys;
                    console.log(toJS(this.props.store.order.selectedRowKeys))
                })             
            },
            selectedRowKeys : this.props.store.order.selectedRowKeys,
        };
        const column = [
            {
                title: '图片',
                dataIndex: 'sku_img',
                className:"fontSize",
                key: 'sku_img',
                render:(text,record) =>{
                    return(
                        <img src={record.sku_img ? record.sku_img:image} style={{ width:50, height:50 }}/>
                    )
                }
            },{
                title: 'SKU',
                dataIndex: 'sku',
                className:"fontSize",
                key: 'sku',
            },{
                title: '产品名称',
                dataIndex: 'name',
                className:"fontSize",
                key: 'name',
            },{
                title: '规格',
                dataIndex: 'size',
                className:"fontSize",
                key: 'size',
            },{
                title: '预计发货数量',
                dataIndex: 'num',
                className:"fontSize",
                key: 'num',
            },{
                title: '实际发货数量',
                dataIndex: 'realGet',
                className:"fontSize",
                key: 'realGet',
                render:(text,record,index) => {
                    return(
                        <InputNumber 
                            min={1}
                            max={Number(record.num)}
                            value={text}
                            onChange={(number) => {
                                runInAction(() => {
                                    this.props.store.order.skulist[index].realGet = number;
                                })                        
                            }}
                        />    
                    )
                }
            },
        ];
        return (
            <div>
                <Row className="shipmentNumber">
                    <Row>发货单号:</Row>
                    <span style={{ fontSize:16 }}>{this.props.store.order.shipmentValue.dlkey}</span>
                </Row>
                <Row style={{ fontSize:14, paddingTop:10 }}>
                    <Col span={6}>
                        <Row>物流公司:</Row>
                        <Input 
                            style={{ width:150 }}
                            placeholder="请输入物流公司"
                            value={this.props.store.order.shipmentValue.express}
                            onChange={(text) => {
                                runInAction(() => {
                                    this.props.store.order.shipmentValue.express = text.target.value
                                })                             
                            }}
                        />
                    </Col>
                    <Col span={6}>
                        <Row>物流编号:</Row>
                        <Input 
                            style={{ width:150 }}
                            placeholder="请输入物流编号"
                            value={this.props.store.order.shipmentValue.expNo}
                            onChange={(text) => {
                                runInAction(() => {
                                    this.props.store.order.shipmentValue.expNo = text.target.value
                                })                             
                            }}
                        />
                    </Col>
                    <Col span={6}>
                        <Row>收货地址:</Row>
                        <Input 
                            style={{ width:150 }}
                            placeholder="请输入收货地址"
                            value={this.props.store.order.shipmentValue.address}
                            onChange={(text) => {
                                runInAction(() => {
                                    this.props.store.order.shipmentValue.address = text.target.value
                                })                             
                            }}
                        />
                    </Col>
                    <Col span={6}>
                        <Row>备注:</Row>
                        <Input 
                            style={{ width:150 }}
                            placeholder="请输入备注"
                            value={this.props.store.order.shipmentValue.note}
                            onChange={(text) => {
                                runInAction(() => {
                                    this.props.store.order.shipmentValue.note = text.target.value
                                })                             
                            }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop:15 }}>
                    <Table 
                        rowKey={x =>x.sku}
                        columns={column}
                        rowSelection={rowSelection}
                        dataSource={toJS(this.props.store.order.skulist)}
                    />
                </Row>

            </div>
        );
    }
}

export default componentName;