import React, { Component } from 'react';
import { Tabs, Row, Input, DatePicker, Button } from 'antd';

class componentName extends Component {
    constructor(props){
        super(props);
        this.state = {
            startValue:null,
            endValue:null,
            endOpen:false,
        }
    }
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
          return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
    
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }
    handleStartOpenChange = (open) => {
        if (!open) {
          this.setState({ endOpen: true });
        }
    }
    
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }
    render(){
        return(
            <div>
                <Row style={{paddingTop:10}}>
                    <span>订单编号 ：</span>
                    <Input placeholder="请输入订单号" style={{maxWidth:120,marginLeft:10}}/>
                    <span style={{marginLeft:10}}>日期 ：</span>
                    <DatePicker 
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD"
                        value={this.state.startValue}
                        placeholder="开始时间"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                    />
                    <span style={{marginLeft:10,marginRight:10}}>一</span>
                    <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD"
                        value={this.state.endValue}
                        placeholder="结束时间"
                        onChange={this.onEndChange}
                        onOpenChange={this.handleEndOpenChange}
                    />
                    <Button type="primary" style={{marginLeft:10}}>搜索</Button>
                </Row>
            </div>
        )
    }
}
export default componentName;