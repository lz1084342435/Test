import React, { Component } from 'react';
import { Tabs } from 'antd';
import Stock from './Stock';
const TabPane = Tabs.TabPane;
class componentName extends Component {
    render(){
        return (
            <div>
                <Tabs type="card" style={{marginLeft:100,paddingTop:50,marginRight:150}}>
                    <TabPane tab="备货审批" key="1">
                        <Stock {...this.props} />
                    </TabPane>
                    <TabPane tab="付款审批" key="2">付款审批</TabPane>
                    <TabPane tab="费用审批" key="3" disabled>费用审批</TabPane>
                </Tabs>
            </div>
        )
    }
}
export default componentName;