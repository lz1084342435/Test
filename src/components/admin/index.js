import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, Route, Redirect } from 'react-router-dom';
import '../admin/index.css';
import logo from '../../../src/asset/logo.png';
import App from '../app';
import Stock from '../../Stock';
import SaleDescription from '../sales/SaleDescription';
import OrderManage from '../sales/OrderManage';

const rootSubmenuKeys = [];
const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;

class Admin extends React.Component{
    state = {
        collapsed: false,
        openKeys:['sub1'],
        defaultSelectedKeys:['sub1'],
        current:localStorage.navcurrent?localStorage.navcurrent:'sub1'
    };
    handleClick(e){
        this.setState({
            current:e.key,
        });
        localStorage.navcurrent = e.key
    }
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,      
        });
    }
    onOpenChange = (openKeys) =>{
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if(rootSubmenuKeys.indexOf(latestOpenKey) === -1){
            this.setState({ openKeys });
        }else{
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    render(){
        return(
        <Layout className="home">
        <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{ backgroundColor:"#2B3245" }}
        >
        <img className={this.state.collapsed ? "small_image":"normal_image"} src={logo} />
            <Menu 
                theme="dark" 
                openKeys = { this.state.openKeys } 
                onOpenChange = { this.onOpenChange.bind(this) }
                defaultSelectedKeys={this.state.defaultSelectedKeys} 
                selectedKeys={[this.state.current]}
                onClick={this.handleClick.bind(this)}
                mode="inline" 
                style={{ backgroundColor:"#2B3245" }}
            >  
            <SubMenu
                key="sale"
                title={<span><Icon type="shop" /><span>销售管理</span></span>}
            >
                <Menu.Item key="1"><Link to={`/nest/app/sales/SaleDescription`}>合同管理</Link></Menu.Item>
                <Menu.Item key="2"><Link to={`/nest/app/sales/OrderManage`}>订单管理</Link></Menu.Item>
                <Menu.Item key="3">客户管理</Menu.Item>
                <Menu.Item key="4">分销商管理</Menu.Item>
                <Menu.Item key="5">样品申请管理</Menu.Item>
            </SubMenu>
            <SubMenu
                key="purchase"
                title={<span><Icon type="shopping-cart" /><span>采购</span></span>}
            >
                <Menu.Item key="6">采购情况</Menu.Item>
                <Menu.Item key="7">供应商管理</Menu.Item>
                <Menu.Item key="8">采购合同管理</Menu.Item>
                <Menu.Item key="9">发票管理</Menu.Item>
                <Menu.Item key="10">采购审批</Menu.Item>
                <Menu.Item key="11">库存预警</Menu.Item>
            </SubMenu>
            <SubMenu
                key="count"
                title={<span><Icon type="wallet" /><span>库存管理</span></span>}
            >
                <Menu.Item key="12">库存查询</Menu.Item>
                <Menu.Item key="13">SKU管理</Menu.Item>
                <Menu.Item key="14">警戒提醒</Menu.Item>
                <Menu.Item key="15">防伪查询</Menu.Item>
            </SubMenu>
            <SubMenu
                key="fee"
                title={<span><Icon type="pay-circle-o" /><span>费用管理</span></span>}
            >
                <Menu.Item key="16">费用管理</Menu.Item>
                <Menu.Item key="17">费用统计</Menu.Item>
            </SubMenu>
        </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              
            </Breadcrumb>
            <div style={{ padding: 0, background: '#fff', minHeight: "100vh" }}>
                {/* <SaleDescription /> */}
                <Route path="/nest/app" component={App} />
            </div>
          </Content>
         
        </Layout>
      </Layout>
        );
    }
}
export default Admin;
