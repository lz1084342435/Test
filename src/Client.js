import React, { Component } from 'react';
import { Row, AutoComplete, Button, Table, Modal, message } from 'antd';
import { action, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import ClientNew from './ClientNew'

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
        input_cityname:""
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
        this.setState({ data:x.customer || [], all_cname:x.city || [], public:x.module || [], ranks:x.rank || [], all_customername:x.customer_search || [], sum:x.count })
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
    // this.state.obj.customer = record.customer;
    // this.state.obj.no = record.no;
    // this.state.obj.c = record.c;
    // this.state.obj.volume = record.volume;
    // this.state.obj.module_name = record.module_name;
    // this.state.obj.rank = record.rank;
    // ClientNew.state.obj.customer = record.customer;
    this.state.visible = true;
    console.log(this.state.visible)
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
                visible = {this.state.visible}
                onCancel = {() => {}}
            >
            <ClientNew />
            </Modal>
          </Row>
       </div>
      );
    }
}
export default componentName;