import React, { Component } from 'react';
import { Button, Table} from 'antd';
import {action} from 'mobx';

class componentName extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            mouduledata:[],
            supplierdata:[]
        }
    }
    componentDidMount(){
        fetch("/home/supplier/lst",{ credentials: 'include' }).then(x => x.json())
        .then(action(x=>{                
            this.setState({
                data:x.supplier || [],
                mouduledata:x.module || [],
                supplierdata:x.supplierName || []
            })
            console.log(x)
        })).catch(err => console.error(err))
    }
      
      onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
      }
    
    render(){
    const columns = [{
        title:'供应商名称',
        dataIndex:'name',
        key:'name',
        
        },
        {
        title: '所属部门',
        dataIndex: 'module_name',
        key: 'module_name',
        filters:this.state.mouduledata,
        onFilter: (value, record) => {
            if(record.module_name === value){
                return true;
            }else{
                return false;
            }
        },      
        },
        {
        title: '客户类型',
        dataIndex: 'cateid',
        key: 'cateid',
        render:(text,record) =>{
            let type="";
            switch(record.cateid){
                case "1":
                    type = "机械制造";
                    break;
                case "2":
                    type = "外贸服饰";
                    break;
                case "3":
                    type = "批发零售";
                    break;
                case "4":
                    type = "互联网服务";
                    break;
                case "5":
                    type = "客消耗品";
                    break;
                case "6":
                    type = "家具用品";
                    break;
                case "7":
                    type = "香薰";
                    break;
                default:
                    type = "未定义";
                    break;
            }
            return <span>{type}</span>
        },
        filters: [{
            text: '机械制造',
            value: '1',
        }, {
            text: '外贸服饰',
            value: '2',
        }, {
            text: '批发零售',
            value: '3',
        }, {
            text: '互联网服务',
            value: '4',
        }, {
            text: '客消耗品',
            value: '5',
        }, {
            text: '家具用品',
            value: '6',
        }, {
            text: '香薰',
            value: '7',
        }],
        onFilter: (value, record) => {
            if(record.cateid === value){
                return true;
            }else{
                return false;
            }
        }   
        },{
        title: '累计合同金额',
        dataIndex: 'all_purchase_fee',
        key: 'all_purchase_fee',
        },{
        title: '已付款金额',
        dataIndex: 'paied_purchase_fee',
        key: 'paied_purchase_fee',
        },{
        title: '已开票金额',
        dataIndex: 'opended_ballot_fee',
        key: 'opended_ballot_fee',
        }, {
        title: '已收货金额',
        dataIndex: 'received_fee',
        key: 'received_fee',
        },{
        title: '备注',
        dataIndex: 'note',
        key: 'note',
        },{
        title: '操作',
        key: 'id',
        render:(text,record) => {
            return(
            <div>
                <Button style={{
                    paddingLeft: "0px",
                    paddingRight: "3px",
                    color: "#108ee9",
                    border:0,
                }} type={"primary"} ghost>编辑</Button>
                <span>|</span>
                <Button style={{
                    paddingLeft: "0px",
                    paddingRight: "3px",
                    color: "#108ee9",
                    border:0
                }} type={"danger"} ghost>删除</Button>
            </div>
            );
        }
        }];
        return(
            <Table 
                columns={columns} 
                dataSource={this.state.data} 
                rowKey={record => record.id}
            />
           
        ); 
    }
    
}
export default componentName;