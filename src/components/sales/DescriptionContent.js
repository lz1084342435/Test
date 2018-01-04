import React,{ Component } from 'react';
import { Table, Row, Input, Select, DatePicker, Button, Menu, Dropdown, AutoComplete, Modal } from 'antd';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Link } from 'react-router-dom';
import ShipModal from './ShipModal';
import './sale.css';

const Option = Select.Option;
@inject("store")
@observer
class Admin extends React.Component{
  constructor(props){
      super(props);
      this.state={
          startValue:null,
          endValue:null,
          endOpen:false,
          type:[]
      }
  }
  componentDidMount() {
    fetch('/home/purchasetype/lst/type/sales',{ credentials:'include' }).then(x => x.json()).then(x => {
      this.setState({ type:x.purchase_type || [] })
    })
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

  onChange = (field, value) => {
   this.props.store.order.handleChange(field,value || "");
  }

  onStartChange = (value) => {
    this.onChange('startTime', value || "");
  }

  onEndChange = (value) => {
    this.onChange('endTime', value || "");
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }
  shipClick = (record) =>{
    this.props.store.order.showModal(record);
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
    render(){
      let data = toJS(this.props.store.order.data);
      let typedata = toJS(this.props.store.order.typeData);
      const columns = [{
          title: '创建时间',
          dataIndex: 'add_time',
          className:"fontSize",
          key: 'add_time',
          render: (text,record) =>{
            let time = "";
            time = record.add_time.substring(0,10);
            return(
              <span>{time}</span>  
            )
          }
        }, {
          title: '合同编号',
          dataIndex: 'sckey',
          className:"fontSize",
          key: 'sckey',
        }, {
          title: '客户',
          dataIndex: 'cname',
          className:"fontSize",
          key: 'cname',
        }, {
          title: '合同类型',
          dataIndex: 'type',
          className:"fontSize",
          key: 'type',
          render:(text,record) => {
            let contype = "未定义";
            typedata.map((Item,index)=>{
              if(record.type == Item.id){
                  contype = Item.name;
              }
            })
            return(
              <span>{contype}</span>
            )
          }
        }, {
          title: '总金额',
          dataIndex: 'fee',
          className:"fontSize",
          key: 'age',
        }, {
          title: '回款金额',
          dataIndex: 'receive',
          className:"fontSize",
          key: 'receive',
        },{
          title: '收货日期',
          dataIndex: 'end_time',
          className:"fontSize",
          key: 'end_time',
        }, {
          title: '负责人',
          dataIndex: 'sname',
          className:"fontSize",
          key: 'sname',
        },{
          title: '合同状态',
          dataIndex: 'status',
          className:"fontSize",
          key: 'status',
          render:(text,record) => {
            return(
              <span>
                <p style={{ width:5, height:5, borderRadius:"50%", float:"left", marginRight:8, marginTop:8, backgroundColor: text === "执行中" ? "#108EE9": text === "终止" ? "#F56A00": text === "意外终止" ? "#FFBF00" : "#66CC66" }}></p>
                <span>{text}</span>
              </span>
            )
          }
        },  {
          title: '操作',
          key: 'id',
          className:"fontSize",
          render: (text, record) => (
            <Dropdown.Button
              onClick={()=>{this.shipClick(record)}}
              overlay={
                <Menu>
                  <Menu.Item>编辑</Menu.Item>
                  <Menu.Item>删除</Menu.Item>
                </Menu>
              }
            >
            发货申请
            </Dropdown.Button>  
          ),
        }];
        return(
            <div style={{ fontSize:14 }}>
                <Row>
                    <span>合同编号：</span>
                    <AutoComplete  
                      className="selectorInput"
                      placeholder="请选择合同编号"
                      dataSource={this.props.store.order.allSckey}
                      onChange={(value)=>{this.props.store.order.handleChange("sckey",value)}}
                    />
                    <span style={{ marginLeft:25 }}>客户：</span>
                    <Select  
                       className="selectorInput"
                       placeholder="请选择客户"
                       allowClear
                       showSearch
                       value={this.props.store.order.value.cname}
                       onChange={(value)=>{this.props.store.order.handleChange("cname",value || "")}}
                    >
                    {
                      this.props.store.order.cnameData.map((Item,index) => {
                        return(
                          <Option key={index} value={Item}>{Item}</Option>                     
                      )})
                    }
                    </Select>
                    <span style={{ marginLeft:25 }}>合同类型：</span>
                    <Select
                      className="selectorInput"
                      placeholder="请选择合同类型"
                      allowClear
                      showSearch
                      onChange={(value)=>{this.props.store.order.handleChange("type",value || "")}}
                    >
                    {
                      this.state.type.map(x => {
                        return(
                          <Option key={x.id} value={x.id}>{x.name}</Option>                     
                      )})
                    }
                    </Select>
                </Row>
                <Row style={{ marginTop:20 }}>
                    <span>合同状态：</span>
                    <Select 
                        placeholder="输入合同状态"
                        allowClear
                        showSearch
                        style={{ width:180, height:30 }}
                        onChange={(value)=>{this.props.store.order.handleChange("status",value || "")}}
                    >
                      <Option value="1">执行中</Option>
                      <Option value="2">终止</Option>
                      <Option value="3">意外终止</Option>
                      <Option value="4">已完成</Option>
                    </Select>
                    <span style={{ marginLeft:25 }}>日期：</span>
                    <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD"
                        placeholder="开始时间"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                    />
                    <span style={{ marginLeft:10, marginRight:10 }}>一</span>
                    <DatePicker
                        disabledDate={this.disabledEndDate}
                        showTime
                        format="YYYY-MM-DD"
                        placeholder="结束时间"
                        onChange={this.onEndChange}
                        onOpenChange={this.handleEndOpenChange}
                    />
                    <Button 
                      type="primary" 
                      style={{ marginLeft:25, width:70 }}
                      onClick={()=>{this.props.store.order.search()}}
                    >搜索</Button>
                    <Link to='/nest/app/sales/addSale'>新增</Link>
                    <Button type="primary" ghost style={{ marginLeft:85, width:70 }} onClick={()=>{}}>新增</Button>
                </Row>
                <Table 
                    rowKey={x => x.id }
                    columns={columns} 
                    dataSource={data}
                    style={{ marginTop:20 }}
                />
                <Modal
                    className="onshipModal"
                    title="发货申请"
                    visible={this.props.store.order.shipvisible}
                    onCancel={()=>{this.props.store.order.hideModal()}}
                    onOk={()=>{this.props.store.order.shipSubmit()}}
                >
                    <ShipModal />
                </Modal>
            </div>
        );
    }
}
export default Admin;