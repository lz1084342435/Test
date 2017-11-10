import React, { Component } from 'react';
import { Button, Table, Row, Select, DatePicker, Col, Checkbox, Input, Pagination } from 'antd';
import "./index.css";
const Option = Select.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}

const setData = ["","","","待收货","已收货"];
// rowSelection object indicates the need for row selection

class componentName extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            selectdata:[],
            checked: false,
            current:1,
        };
    }
    componentDidMount() {
        fetch("/home/purchase/purchases",{ credentials: 'include' }).then(x => x.json()).then(x=>{
            let data=[],selectdata=[];
            if(x.data && x.data.length > 0){
                x.data.forEach(function(data,i){
                    x.data[i].checked = false;
                },this)
            }         
            this.data = x.data ? x.data : [];
            // console.log(this.data)
            this.checked = false;
            for(let i = 0; i < 5; i++){
                if(this.data[i]){
                  //  console.log(this.data[i])
                    selectdata.push(this.data[i])
                }
            }
            this.selectdata = selectdata;
            this.data = data;
            this.setState({selectdata:this.selectdata || [], data:x.data || []})
            // console.log(selectdata)
        }).catch(err => console.error())
    }
      handleChange = (e) =>{
        this.setState({checked:e.target.checked});
        this.checkedchange(e.target.checked);
      }
      handleCheck = (i,e) =>{
        this.state.data[i].checked = e.target.checked;
      }
      checkedchange = (value) => {
        this.state.data.forEach(function(x,i){
          this.state.data[i].checked = value;
        },this);
      }    
      ChangeCurrentPage = (value) =>{
        let selectdata = [];
        this.state.current = value;    
        for(let i = (value - 1) * 5;i < value * 5;i ++){     
          if(this.state.data[i]){        
            selectdata.push(this.state.data[i])
          }
        }
        this.state.selectdata = selectdata; 
      }
  
    render(){
        return(
            <div>
               <Row className="ordertable">
                    <Row className="ordertitle">
                        <Col span={6}>商品</Col>
                        <Col span={3}>单价</Col>
                        <Col span={3}>数量</Col>
                        <Col span={3}>总金额</Col>
                        <Col span={3}>供应商</Col>
                        <Col span={3}>合同状态</Col>
                        <Col span={3}>已付款</Col>
                    </Row>
               </Row>
               <Row>
                    <Checkbox style={{marginLeft:50,marginTop:30}} checked={this.state.checked} onChange={this.handleChange}/>
                    <span>全选</span>
                    <Button style={{marginLeft:30}}>批量收票</Button>
               </Row>
               <Row style={{marginTop:10}}>
               {
                    this.state.selectdata.map((x,i) =>{
                    let height = 140;
                    if (x.products) {
                        height += x.products ? x.products.length * 120 : 0;
                    }
                    return (
                        <div>
                            <Row>
                               <Row type="flex" align="middle" style={{width:"auto",height:50, backgroundColor:x.status == 1 ? "#FDECEC":x.status == 2 ? "#ECF6FD":"#F1F1F1",marginTop:30,marginLeft:40,marginRight:270}}>
                                <Checkbox style={{marginLeft:10}} checked={x.checked} onChange={this.handleCheck.bind(this,i)} />
                                <span style={{marginLeft:20}}>合同编号：{x.idkey}</span>
                                <span style={{marginLeft:20}}>下单时间：{x.startdate}</span>
                                <span style={{marginLeft:20}}>负责人：{x.bname}</span>
                                </Row> 
                                <Row type="flex" align="middle" style={{ marginLeft:40}}>
                                  <Col span={12}>
                                    <Row type="flex" align="middle" style={{marginLeft:0,border: "1px solid #eee",marginTop:0,width:520,height:40}}><span style={{marginLeft:15}}>收货地址 : {x.storage}</span></Row>
                                    <Row type="flex" align="middle" style={{marginLeft:0,border: "1px solid #eee",borderTop:"none",marginTop:0,width:520,height:40}}><span style={{marginLeft:15}}>付款方式 : {x.paytype}</span></Row>
                                    <Row type="flex" align="middle" style={{marginLeft:0,border: "1px solid #eee",borderTop:"none",marginTop:0,width:520,height:60}}><span style={{marginLeft:15}}>备注 :{x.note}</span></Row>
                                  </Col>
                                  <Col span={3}>
                                    <Row type="flex" align="middle" style={{border: "1px solid #eee",marginLeft:-135,marginTop:-1,borderLeft:"none",width:129,height:140}}><span style={{marginLeft:45,marginTop:-90}}>¥ {x.fee}</span></Row>
                                  </Col>
                                  <Col span={3}>
                                    <Row type="flex" align="middle" style={{border: "1px solid #eee",marginLeft:-170,marginTop:-1,borderLeft:"none",width:129,height:140}}><span style={{ textAlign:"center", marginLeft:35,marginTop:-90}}>{x.supname}</span></Row>
                                  </Col>
                                  <Col span={3}>
                                    <Row type="flex" align="middle" style={{ border: "1px solid #eee",marginLeft:-205,marginTop:-1,borderLeft:"none",width:129,height:140}}><span style={{marginLeft:40,marginTop:x.status == "3"?-60:-90,color:x.status == 3? "#FF0000":"#BEBEBE"}}>
                                      {setData[x.status]}
                                      {x.status == 3? <Button type="primary" style={{marginTop:5,marginLeft:-18}}>确认收货</Button>:""}            
                                    </span></Row>
                                  </Col>
                                  <Col span={3}>
                                  <Row type="flex" align="middle" style={{border: "1px solid #eee",marginLeft:-241,marginTop:-1,borderLeft:"none",width:134,height:140}}><span style={{marginLeft:55,marginTop:-90}}>
                                  ¥ {x.pay}</span></Row>
                                  </Col>
                                </Row>
                            </Row>                            
                        </div>
                    )
                   })}
               </Row>
               <Row>
                <Checkbox style={{marginLeft:50,marginTop:30}} checked={this.state.checked} onChange={this.handleChange}/>
                <span>全选</span>
                <Button style={{marginLeft:30}}>批量收票</Button>
                <Pagination 
                  showQuickJumper 
                  total={this.state.data.length} 
                  pageSize={5} 
                  current={this.state.current} 
                  style={{float:"right",marginTop:20,marginRight:250}} 
                  onChange={(page,pageSize) =>{
                    this.ChangeCurrentPage(page);
                    this.setState({current:page})
                  }} 
                />
              </Row>
            </div>
        )
    }

}
export default componentName;