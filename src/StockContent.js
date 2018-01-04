import React, { Component } from 'react';
import { Row, Col, Checkbox, Button, Pagination, Modal } from 'antd';
import './index.css';
import logo from '../src/asset/loginbackground.png';
class componentName extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            selectdata:[],
            checked:false,
            current:1,
            visible:false
        };
    }
    componentDidMount() {
        fetch('/home/purchase/purchasesToCheckContent',{ credentials: 'include' }).then( x => x.json()).then( x=> {
            let selectdata=[],data=[];
            if(x.data && x.data.length > 0){
                x.data.forEach(function(data,i){
                    x.data[i].checked = false;
                },this)
            }
            this.data = x.data ? x.data : [];          
            for(let i = 0 ; i < 3 ; i ++){
                if(this.data[i]){
                    selectdata.push(this.data[i]);
                }
            }        
            this.selectdata = selectdata;
            this.data = data;
            console.log(this.selectdata)
            this.setState({ data:x.data || [], selectdata:this.selectdata || [] })
            console.log(x)
        })
    }
    ChangeCurrentPage = (value) => {
        let selectdata = [];
        this.state.current = value;
        for(let i = (value - 1) * 3 ; i < 3 * value ; i ++){
            if(this.state.data[i]){
                selectdata.push(this.state.data[i]);
            }
        }
        this.state.selectdata = selectdata;
    }
    PassStock = () => {
        fetch(`/home/purchase/auditPay?id=${this.state.idkey}&allow=1&note=`,{ credentials: 'include' }).then(x => x.json()).then(x => {
            console.log(x)
            if(x.status == 0){
                alert(x.msg);
            }
            else if(x.status == 1){
                
            }
        })
    }
     
    render(){
        return(
            <div>
                <Row type="flex" align="middle" style={{ width:"auto", marginTop:20, marginLeft:0, height:40, border:"1px solid #dcdcdc", backgroundColor:"#f1f1f1", textAlign:"center" }}>
                    <Col span={6}>商品</Col>
                    <Col span={3}>单价</Col>
                    <Col span={2}>数量</Col>
                    <Col span={3}>总金额</Col>
                    <Col span={4}>收款人</Col>
                    <Col span={2}>审核人</Col>
                    <Col span={4}>审批操作</Col>
                </Row>
                <Row>
                    {
                        this.state.selectdata.map((x,i) => {
                            let height = 80;
                            if(x.products){
                                height += x.products? x.products.length * 120 : 0;
                            } 
                            return(
                                <div>
                                    <Row type="flex" align="middle" style={{ width:"auto", marginTop:20, marginLeft:0, height:40, border:"1px solid #eee", backgroundColor:"#ECF6FD", textAlign:"center" }}>
                                        <Row>
                                            <Checkbox style={{width:20,height:20,marginLeft:15}}/>
                                            <span>采购部</span>
                                            <span style={{marginLeft:25}}>申请编号 ：{x.idkey}</span>
                                            <span style={{marginLeft:30}}>下单时间 ：{x.startdate}</span>
                                            <span style={{marginLeft:30}}>申请人 ：{x.bname}</span>
                                        </Row>                   
                                    </Row>
                                    <Row>
                                        <Col span={11} style={{border:"1px solid #eee",borderTop:"none"}}> 
                                        {
                                            x.products.map((data,j) => {
                                                return(
                                                    <Row style={{height:120,border:"1px solid #eee",borderTop:"none",borderRight:"none",borderLeft:"none"}}>
                                                    <Col span={13}>
                                                        <Col span={10}>
                                                            <img alt="" src={logo} style={{width:80,height:80,marginTop:20,marginLeft:10}}/>
                                                        </Col>
                                                        <Col span={14} style={{marginTop:20,color:"rgba(153,153,153,1)"}}>
                                                            <Row style={{fontSize:12,color:"rgba(51,51,51,1)"}}>{data.skuname}</Row>
                                                            <Row style={{marginTop:10}}>分类：{data.cateName}</Row>
                                                            <Row>规格：{data.size}</Row>
                                                            <Row>SKU：{data.sku}</Row>
                                                        </Col>
                                                    </Col>
                                                    <Col span={6} style={{textAlign:"center",marginTop:20}}><span>¥ {data.fee}</span></Col>
                                                    <Col span={5} style={{textAlign:"center",marginTop:20}}>{data.num}</Col>
                                                    </Row>
                                                )
                                            }
                                        )
                                        }
                                        <Row style={{height:79}}>
                                            <Row style={{marginTop:30,marginLeft:10}}>备注:{x.note}</Row>
                                        </Row>
                                        </Col>
                                        <Col span={3} style={{border:"1px solid #eee",height:height,borderTop:"none",borderLeft:"none"}}>  
                                            <Row type="flex" justify="center" style={{fontSize:12,marginTop:20}}>¥{x.fee}</Row>
                                            <Row type="flex" justify="center" style={{fontSize:12}}>( 含运费 ：¥ {x.pay} )</Row>
                                        </Col>
                                        <Col span={4} style={{border:"1px solid #eee",height:height,borderTop:"none",borderLeft:"none"}}>  
                                            <Row type="flex" justify="center" style={{fontSize:12,marginTop:20}}>{x.supname}</Row>
                                        </Col>
                                        <Col span={2} style={{border:"1px solid #eee",height:height,borderTop:"none",borderLeft:"none"}}>  
                                            <Row type="flex" justify="center" style={{fontSize:12,marginTop:20}}>{x.check_user.name}</Row>
                                        </Col>
                                        <Col span={4} style={{border:"1px solid #eee",height:height,borderTop:"none",borderLeft:"none"}}>  
                                            <Row type="flex" justify="center" style={{fontSize:12,marginTop:20,color:"red"}}>审核中</Row>
                                            <Row type="flex" justify="center" style={{marginTop:10}}>
                                                <Button type="primary" onClick={ () => this.PassStock()}>通过</Button>
                                                <Button style={{marginLeft:10}} onClick={ this.setState({ visible:true })}>未通过</Button>
                                            </Row>
                                        </Col>
                                    </Row> 
                                    <Modal
                                        title="未通过理由"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                       
                                    >
                                        
                                    </Modal>                                
                                </div>
                            )
                        })
                    }
                    
                </Row>
                <Row>
                    <Pagination 
                        pageSize={3} 
                        current={this.state.current}
                        total={this.state.data.length} 
                        onChange={(page,pageSize) => {
                            this.ChangeCurrentPage(page);
                            this.setState({current:page})
                        }}
                        style={{marginTop:25,float:"right",marginRight:0}}
                    />
                </Row>
            </div>
        )
    }
}
export default componentName;