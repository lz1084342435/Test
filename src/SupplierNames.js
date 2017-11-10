import React, { Component } from 'react';
import { Button, Table, Row, Select, DatePicker, Col, Checkbox, Input, Pagination } from 'antd';

const Option = Select.Option;
function handleChange(value) {
    console.log(`selected ${value}`);
}
class componentName extends Component {
    constructor(props){
        super(props);
        this.state={
            startValue: null,
            endValue: null,
            data:[],
            supname:[],
            endOpen: false,
            value:{
                supname:""
            }
        }
    }
    componentDidMount() {
        fetch("/home/supplier/supplierlist",{ credentials: 'include' }).then(x =>x.json()).then(x=>{
            if(x.supplier && x.supplier.length > 0){
                let arr=[];
                x.supplier.forEach(function(x){
                    arr.push(x.value)
                },this)
                this.setState({supname:arr})
                console.log(this.state.supname)
            }
            
        }).catch(err => console.error(err))
    }
    
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
    onSupplierChange = (name,value) =>{
    this.value[name] = value;
    }
      onEndChange = (value) => {
        this.onChange('endValue', value);
      }
    
    render(){
        const { startValue, endValue, endOpen } = this.state;
        return(
            <div>
                <Row style={{paddingLeft:40,paddingTop:30}}> 
                <span style={{fontSize:14}}>供应商 ：</span>
                <Select
                    showSearch
                    style={{ width: 130 }}
                    optionFilterProp="children"
                    onChange={(value) =>{
                      this.onSupplierChange("supname",value);
                    }}      
                    placeholder="请选择供应商"           
                    value={this.state.value.supname}                  
                >
                {
                    this.state.supname.map((x,i) => {
                        return (<Option key={i} value={x}>{x}</Option>)
                    })
                }
                </Select>
                <span style={{marginLeft:5,fontSize:14}}>日期 ：</span>
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD"
                    value={startValue}
                    placeholder="开始时间"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                />
                <span style={{marginLeft:5,marginRight:5}}>一</span>
                <DatePicker 
                    disabledDate={this.disabledEndDate}
                    showTime
                    format="YYYY-MM-DD"
                    value={endValue}
                    placeholder="结束时间"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                />
                <span style={{fontSize:14,marginLeft:10}}>合同状态 ：</span>
                <Select
                    showSearch
                    style={{ width: 130 }}
                    value="所有合同"
                    allowClear
                    optionFilterProp="children"
                    onChange={handleChange}
                >
                    <Option value="所有合同">所有合同</Option>
                    <Option value="待收货">待收货</Option>
                    <Option value="已完成">已完成</Option>
                </Select>
                <Button type="primary" style={{marginLeft:20}}>搜索</Button>
                <Button type="primary" ghost style={{marginLeft:130,marginTop:3}}>新增</Button>
               </Row>
            </div>
        )
    }
}
export default componentName;