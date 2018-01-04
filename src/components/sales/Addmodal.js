import React, { Component } from 'react';
import { Row, Col, Button, Input, Table, message } from 'antd';
import { runInAction, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject("store")
@observer
class AddModal extends Component {
    constructor(props){
        super(props);
        this.state={
            hotcate:[],
            select:"",
            data:[],
            selected:toJS(this.props.store.neworder.selected),
        }
    }
    componentDidMount() {
        fetch('/home/product/search?default=',{credentials:'include'}).then(x => x.json()).then(x => {
            let data = [];
            x.forEach(function(element) {
                data.push(element.fields)
            }, this);
            this.setState({ data:data || []})
            this.props.store.neworder.data = data || [];
        })
        fetch('/home/category/bestSellCategory',{credentials:'include'}).then(x => x.json()).then(x => {
            runInAction(() => {
                let category = [];
                (x.data || []).forEach(element => {
                    category.push(element.name);    
                }, this);
               this.setState({ hotcate:category || [] });
            })
            
        }).catch(err => console.error(err))
       
    }
    onChange = (id,value) => {
        let data = this.state.selected;
        if(value){
            data.push(id);
        }else{
            data.splice(data.indexOf(id),1);
        }
        this.setState({ selected:data });
        this.props.store.neworder.selected = data;
    }
    showData =(value) => {
        let name = "";
        if(value){
            name = value;
        }else{
            name = "";
        }
        runInAction(() => {
            fetch('/home/product/search?default='+name,{credentials:'include'}).then(x => x.json()).then(x => {
                let data = [];
                x.forEach(function(element) {
                    data.push(element.fields)
                }, this);
                this.setState({ data:data || [], selected:[]})
                message.info(`共搜索到${x.length}条数据！`)
            })
        })   
    }
    render(){
        const columns = [{
            title: '序号',
            dataIndex: 'id',
            className:"productstyle",
            key: '序号',
        }, {
            title: '图片',
            dataIndex: 'img',
            className:"productstyle",
            key: '图片',
            render:(text,record) => {
                return(
                    <img src={text} style={{ width:50, height:50 }} />
                )
            }
        }, {
            title: 'SKU',
            dataIndex: 'sku',
            className:"productstyle",
            key: 'SKU',
        }, {
            title: '产品名称',
            dataIndex: 'skuname',
            className:"productstyle",
            key: '产品名称',
        }, {
            title: '品牌',
            dataIndex: 'brand',
            className:"productstyle",
            key: '品牌',
        }, {
            title: '规格',
            dataIndex: 'size',
            className:"productstyle",
            key: '规格',
        },{
            title: '分类',
            dataIndex: 'name',
            className:"productstyle",
            key: '分类',
        }, {
            title: '单价',
            dataIndex: 'price',
            className:"productstyle",
            key: '单价',
        },{
            title: '库存',
            dataIndex: 'num',
            className:"productstyle",
            key: '库存',
        },{
            title: '操作',
            key: '操作',
            className:"productstyle",
            render:(text,record) => {
                return(
                    <span>
                        <Button 
                            type="primary" 
                            ghost 
                            style={{ display:this.state.selected.indexOf(record.id) >= 0 ? "none":"" }}
                            onClick={ this.onChange.bind(this,record.id,true) }>
                        未选择</Button>    
                        <Button 
                            style={{ display:this.state.selected.indexOf(record.id) >= 0 ? "":"none" }}
                            type="primary"
                            onClick={ this.onChange.bind(this,record.id,false) }>
                        已选择</Button>  
                    </span>
                )
            }
        }];
        return(
            <div>
                <Row>
                    {
                        this.state.hotcate.map((x,i) => {
                            return(
                                <Button
                                    style={{ padding:'0 5px', float:"left", marginLeft:15, fontSize:14 }}
                                    type={ this.state.select == x? 'primary':'' }
                                    onClick={ () => { this.setState({ select:x }); this.showData(x) }}
                                    key={i}
                                >
                                    {x}
                                </Button>      
                            )
                        })
                    }
                    <Input  
                        placeholder="搜索"
                        style={{ width:220, marginLeft:250, fontSize:14, lineHeight:26 }}
                    />
                    <Button style={{ marginLeft:15, fontSize:14 }} type="primary">搜索</Button>
                </Row>
                <Row>
                    <Table 
                        rowKey={x => {return x.sku}}
                        columns={columns}
                        style={{ marginTop:20, marginLeft:15, marginRight:15, textAlign:"center" }}
                        bordered
                        dataSource={this.state.data}
                    />
                </Row>
            </div>
        )
    }
}
export default AddModal;