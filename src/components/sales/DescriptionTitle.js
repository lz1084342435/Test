import React,{ Component } from 'react';
import { Row, Col } from 'antd';
import order from'../../asset/order.png';
import packageimg from '../../asset/package.png';
import price from'../../asset/price.png';
import '../sales/sale.css';

class Admin extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount() {
        fetch("/sales/customer/lst",{ credentials: 'include' }).then(x => x.json()).then(x =>{
            this.setState({ data:x.data })
            console.log(x)
        })
    }
    
    render(){
        return(
           <div className="HeaderContent">
               <Row>
                    <Col span={8} className="bordered">
                        <Row>合同总金额(元)</Row>
                        <Row className="PaySum">¥ 5000</Row>
                        <Row style={{ marginRight: 24, backgroundColor: "#DCDCDC", height: 1, marginTop: 10 }}></Row>
                        <Row style={{ color: "#999999", marginTop: 6 }}>全部结果</Row>
                    </Col>
                    <Col span={8} className="bordered">
                        <Row>已回款(元)</Row>
                        <Row className="PaySum">¥ 5000</Row>
                        <Row style={{ marginRight: 24, backgroundColor: "#DCDCDC", height: 1, marginTop: 10 }}></Row>
                        <Row style={{ color: "#999999", marginTop: 6 }}>全部结果</Row>
                    </Col>
                    <Col span={8} className="unbordered">
                        <Row>未回款(元)</Row>
                        <Row className="PaySum">¥ 5000</Row>
                        <Row style={{ marginRight: 24, backgroundColor: "#DCDCDC", height: 1, marginTop: 10 }}></Row>
                        <Row style={{ color: "#999999", marginTop: 6 }}>全部结果</Row>
                    </Col>
               </Row>
            </div>
        );
    }
}
export default Admin;