// import React, { Component } from 'react';
// import { Button, Table, Row, Select, DatePicker, Col, Checkbox, Input, Pagination } from 'antd';
// import '../../../src/index.css';

// import logo from '../../asset/logo.png';

// const Option = Select.Option;

// class componentName extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             data:[]
//         }
//     }
//     componentDidMount() {
//        fetch("/home/logistics/logisticsList",{ credentials:'include' }).then(x => x.json()).then(x => {
//             this.setState({ data:x })
//             console.log(x)
//        })
//    }
   
//     render(){
//         return(
//             <div>
//                <Row className="ordertable">
//                     <Row className="ordertitle">
//                         <Col span={6}>商品</Col>
//                         <Col span={3}>单价</Col>
//                         <Col span={3}>数量</Col>
//                         <Col span={3}>商品状态</Col>
//                         <Col span={3}>金额</Col>
//                         <Col span={3}>订单状态</Col>
//                         <Col span={3}>实收款</Col>
//                     </Row>
//                </Row>
//                <Row>
//                     <Checkbox style={{marginLeft:50,marginTop:27}}/>
//                     <span>全选</span>
//                     <Button style={{marginLeft:27}}>批量发货</Button>
//                </Row>
//                <Row>
//                     <Row style={{ height: 44, backgroundColor: "#ECF6FD", border:"1px solid #f1f1f1", marginLeft:40, marginTop:10, marginRight:40 }}>
//                         <Checkbox style={{ width:14, height:14, marginLeft:20, marginTop:10 }}></Checkbox>
//                         <span style={{ marginLeft:10, marginTop:10, fontSize:12 }}>全公司</span>
//                         <span className="order_topDetail">订单号 ：</span>
//                         <span className="order_topDetail">成交时间 ：</span>
//                         <span className="order_topDetail">负责人 ：</span>
//                     </Row>
//                     <Row style={{ marginLeft:40, marginRight:40 }}>
//                         <Col span={15}>
//                             <Row style={{ height:120, border:"1px solid #f1f1f1", borderTop:"none" }}>
//                             <Col span={4}><img src={logo} alt="" style={{ height: 80, marginLeft:20, marginTop:20 }} /></Col>
//                             <Col span={8}>
//                                 <Row className="orderDetail_orderName">原创设计都煎熬上课了打击</Row>
//                                 <Row style={{ marginLeft:10, fontSize:12, color:"#999999", marginTop:8 }}>分类：</Row>
//                                 <Row style={{ marginLeft:10, fontSize:12, color:"#999999" }}>规格：</Row>
//                                 <Row style={{ marginLeft:10, fontSize:12, color:"#999999" }}>SKU：</Row>
//                             </Col>
//                             <Col span={5}><Row className="orderDetail_orderName">¥168</Row></Col>
//                             <Col span={3}><Row className="orderDetail_orderName">x1</Row></Col>    
//                             <Col span={4}>
//                                 <Row style={{ color:"#E5921F", fontSize:12, marginTop:20, marginLeft:25 }}>
//                                     退货中
//                                 </Row>
//                                 <Row style={{ color:"#666666", fontSize:12, marginTop:5 }}>
//                                     (共4件，报废2件)
//                                 </Row>
//                             </Col>    
//                             </Row>
//                             <Row type="flex" align="middle" style={{ height:52, border:"1px solid #f1f1f1", borderTop:"none" }}>
//                                 <Row style={{ marginLeft:20 }}>地址 ：</Row>
//                             </Row>
//                             <Row type="flex" align="middle" style={{ height:52, border:"1px solid #f1f1f1", borderTop:"none" }}>
//                                 <Row style={{ marginLeft:20 }}>备注 ：</Row>
//                             </Row>
//                         </Col>
//                         <Col span={3}>
//                             <Row style={{ height:224, border:"1px solid #f1f1f1", borderTop:"none", borderLeft:"none" }}>
//                                 <Row type="flex" justify="center" style={{ fontSize:14, color:"#333333", marginTop:20 }}>¥168</Row>
//                                 <Row type="flex" justify="center" style={{ fontSize:12, color:"#999999" }}>(含运费：¥0.00)</Row>
//                             </Row>
//                         </Col>
//                         <Col span={3}>
//                             <Row style={{ height:224, border:"1px solid #f1f1f1", borderTop:"none", borderLeft:"none" }}>
                                
//                             </Row>
//                         </Col>
//                         <Col span={3}>
//                             <Row style={{ height:224, border:"1px solid #f1f1f1", borderTop:"none", borderLeft:"none" }}>

//                             </Row>
//                         </Col> 
//                     </Row>                
//                </Row>
//             </div>
//         )
//     }

// }
// export default componentName;

import React, { Component } from 'react';
import { Row, AutoComplete, Button, Table, Modal, message, Input } from 'antd';
import { action, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import ClientNew from '../../ClientNew';

class componentName extends Component{
  constructor(props){
    super(props);
    this.getData();
    this.state={
        manage_type:"force",
        data:[],
        all_cname:[],
        public:[],
        ranks:[],
        all_customername:[],
        sum:0,
        visible:false,
        input_cityname:"",
        obj:{
            customer:"",
            no:"",
            city:"",
            addr:"",
            tel:"",
            note:""

        }
    }
  }

  getData(type){
    let url = "/home/customer/lst";
    switch(type){
        case "force":
            url += "";
            break;
        case "day":
            url += "/type/day";
            break;
        case "month":
            url += "/type/month";
            break;
        case "year":
            url += "/type/month";
            break;
        default:
            break;
    }
    // if(this.state.input_cityname !== ""){
    //   url += "/customer/"+this.state.input_cityname;
    // }
    // console.log("!!!!")
    // console.log(this.state.input_cityname)
    fetch(url,{ credentials: 'include' }).then(x => x.json()).then(x =>{
        let all_customer = x.customer_search || [];
        let all_customer_name = new Array();
        all_customer.map((item,index) =>{
            all_customer_name.push(String(item));
        })
        console.log(all_customer_name)
        this.setState({ data:x.customer || [], all_cname:x.city || [], public:x.module || [], ranks:x.rank || [], sum:x.count, all_customername:all_customer_name })
        console.log(x)
        
    })
  }

  handleChange = (type) =>{
    switch(type){
        case "force":
            this.manage_type = "force";
            break;
        case "day":
            this.manage_type = "day";
            break;
        case "month":
            this.manage_type = "month";
            break;
        case "year":
            this.manage_type = "year";
            break;
        default:
            break;
    }
    this.state.manage_type = this.manage_type;
  }

  handleDelete = (record) =>{
    Modal.confirm({
        title: '删除客户',
        content: "确定删除该用户？",
        okText: "确定",
        cancelText: "取消",
        onOk: this.DeleteUser.bind(this, record.id)
    })
  }

  DeleteUser = (id) =>{
    fetch("/home/customer/delete/id/",{ credentials: 'include' }).then(x => x.json()).then(x =>{
        if(x.status === 1){
            message.success(x.msg);
            this.alldelete(id);
        }
        else{
            message.error(x.msg)
        }
    })
  }
  SeachCustomer = (name) =>{
    fetch("/home/customer/lst/customer/"+name,{ credentials: 'include' }).then(x => x.json()).then(x =>{
      this.setState({data:x.customer || []})
      console.log(x)
    })
  }

  alldelete = (id) =>{
    this.state.data=this.state.data.filter((Item)=>{
        if(Item.id!==id){
            return true;
        }else{
            return false;
        }
    })
  }

  handleEdit = (record) =>{
    this.state.obj.customer = record.customer;
    this.state.obj.no = record.no;
    this.state.obj.city = record.p+record.c;
    this.state.obj.addr = record.addr;
    this.state.obj.tel = record.tel;
    this.state.obj.note = record.note;
    this.setState({ visible:true })
    console.log(this.state.visible)
  }
  hideModal = () =>{
      this.state.obj={
          customer:"",
          city:"",
          addr:"",
          tel:"",
          note:""
      }
      this.setState({ visible:false });
  }
  confirmModal = () =>{
    if(this.state.obj.customer == ""){
        message.error("客户名称不能为空！")
        console.log("!!!"+this.state.obj.customer)
        return
    }
    this.state.obj={
        customer:"",
        city:"",
        addr:"",
        tel:"",
        note:""
    }
    this.setState({ visible:false })
  }
  render() {
    const columns = [{
        title: '客户名称',
        dataIndex: 'customer',
        key: 'customer',
        render: text => <a href="#">{text}</a>,
      }, {
        title: '客户编号',
        dataIndex: 'no',
        key: 'no',
      }, {
        title: '地区',
        dataIndex: 'c',
        key: 'c',
        filters:this.state.all_cname,
        onFilter:(text,record) => {
            if(record.c === text){
                return true;
            }
            else{
                return false;
            }
        }
      },  {
        title: '交易额',
        dataIndex: 'volume',
        key: 'volume',
        sorter: (a, b) => a.volume - b.volume,
      },  {
        title: '所属部门',
        dataIndex: 'module_name',
        key: 'module_name',
        filters:this.state.public,
        onFilter:(text,record) =>{
            if(record.module_name === text){
                return true;
            }
            else{
                return false;
            }
        }
      },  {
        title: '客户级别',
        dataIndex: 'rank',
        key: 'rank',
        filters:this.state.ranks,
        onFilter:(item,value) =>{
            if(value.rank === item){
                return true;
            }
            else{
                return false;
            }
        },
        render:(text,record) => {
            let rank="零售商";
            switch(record.rank){
            case "0":
                break;
            case "1":
                rank="一级代理";
                break;
            case "2":
                rank="二级代理";
                break;
            case "3":
                rank="三级代理";
                break;
            default:
                rank="未设定";
                break;
            }
            return(
                <span>{rank}</span>
            )
        }
      }, {
        title: '操作',
        key: 'id',
        render: (text, record) => (
         <div>
             <Button style={{border:0,paddingLeft: "0px",paddingRight: "3px",color: "#108ee9"}} ghost onClick={this.handleEdit.bind(this,record)}>编辑</Button>
             <span>|</span>
             <Button style={{border:0,paddingLeft: "3px",paddingRight: "0px",color: "#108ee9"}} ghost onClick={this.handleDelete.bind(this,record)}>删除</Button>
         </div>
        ),
      }];
      const pagination = {
        onShowSizeChange: (current, pageSize) => {
        },
        onChange: (current) => {
        },
        defaultPageSize:5
    };
    return (
      <div className="distribution">
          <Row>
              <Row style={{ paddingTop: 36, paddingLeft: 40 }}>
                  <span>客户名称：</span>
                  <AutoComplete 
                      placeholder="请输入客户名称"
                      dataSource= { this.state.all_customername }
                      style={{ maxwidth: 192 }}
                      onChange={(text) => {
                        this.state.input_cityname = text;
                      }}
                      defaultValue={ this.state.input_cityname }
                  />
                  <Button type="primary" style={{ marginLeft: 10 }} onClick={() => {
                    this.SeachCustomer(this.state.input_cityname)
                    this.handleChange("force")
                  }}>搜索</Button>
              </Row>
              <Row style={{ paddingTop: 34,paddingLeft: 40 }}>
                  <Button type={this.state.manage_type === "force"? "primary":""} ghost={this.state.manage_type === "force"?true:false} onClick={()=>{
                     this.getData("force")
                     this.handleChange("force")
                      let timer = setTimeout(() => {
                          this.setState({
                              manage_type:"force"
                          });
                          clearTimeout(timer)
                      }, 1)
                      }}>总额</Button>
                  <Button type={this.state.manage_type === "day"? "primary":""} style={{ marginLeft: 18 }} ghost={this.state.manage_type === "day"?true:false} onClick={() =>{
                      this.getData("day")
                      this.handleChange("day")
                      let timer = setTimeout(() => {
                      this.setState({
                         manage_type:"day"
                      });
                      clearTimeout(timer)
                      }, 1)
                      }}>今日</Button>
                  <Button type={this.state.manage_type === "month"? "primary":""} style={{ marginLeft: 18 }} ghost={this.state.manage_type === "month"?true:false} onClick={() =>{
                      this.getData("month")
                      this.handleChange("month")
                      let timer = setTimeout(() => {
                      this.setState({
                          manage_type:"month"
                      });
                      clearTimeout(timer)
                      }, 1)
                      }}>本月</Button>
                  <Button type={this.state.manage_type === "year"? "primary":""} style={{ marginLeft: 18 }} ghost={this.state.manage_type === "year"?true:false} onClick={() =>{
                      this.getData("year")
                      this.handleChange("year")
                      let timer = setTimeout(() => {
                      this.setState({
                          manage_type:"year"
                      });
                      clearTimeout(timer)
                      }, 1)
                      }}>全年</Button>
              </Row>
              <Row>
                  <Table 
                      columns={columns}
                      dataSource={this.state.data}
                      style={{ marginLeft: 40, marginRight: 40, marginTop: 10 }}
                      pagination={pagination}
                      footer={() => {
                          return(
                          <div>
                              <span style={{fontSize:13}}>交易额合计(元) ：</span>
                              <span style={{fontSize:14,marginLeft:8}}>{this.state.sum}</span>
                          </div>
                          )
                      }}
                  />
              </Row>
              {/* 编辑弹出框 */}
            <Modal
                title = "编辑客户"
                visible = { this.state.visible }
                onCancel = { this.hideModal }
                onOk = { this.confirmModal }
            >
                <Row>客户名称 ：</Row><Input style={{ maxWidth:120 }} defaultValue={this.state.obj.customer}/>
                <Row>省份 ：</Row><Input style={{ maxWidth:120 }} defaultValue={this.state.obj.city}/>
                <Row>详细地址 ：</Row><Input style={{ maxWidth:120 }} defaultValue={this.state.obj.addr}/>
                <Row>电话 ：</Row><Input style={{ maxWidth:120 }} defaultValue={this.state.obj.tel}/>
                <Row>备注 ：</Row><Input style={{ maxWidth:120 }} defaultValue={this.state.obj.note}/>
            </Modal>
          </Row>
       </div>
      );
    }
}
export default componentName;