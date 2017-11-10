import React,{ Component } from 'react';
import { Table, Button, Row, AutoComplete  } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}
class componentName extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            citydata:[],
            moduledata:[],
            rankdata:[],
            customerdata:[],
            customername:"",
            cityname:"",
            type:"",
            count:0
        }
    }
    handleSearch = (value) =>{
      this.setState({
        dataSource:value
      });
    }
    handleChange = () =>{
      let new_count = 0;
      let new_data = this.state.data;
      new_data.map((Item, index) => {
          new_count += Item.volume - 0;
      })
      // this.props.store.client.setCount(new_count);
      this.setState({
          count: new_count
      })
    }
    Search = () =>{
      let url = "/home/customer/lst";
      if(this.state.customername !== ""){
        url += "/customer/"+this.state.customername;
      }
      if(this.state.cityname !== ""){
        url += "/c_name/"+this.state.cityname;
      }
      fetch(url,{ credentials: 'include' }).then( x => x.json() )
      .then( x=> {
        this.setState({ data:x.customer || [], citydata:x.city || [], moduledata:x.module || [], rankdata:x.rank || [], customerdata:x.customer_search || [], count:x.count || 0 })
        // console.log(x)
      }).catch((err) => console.error(err))
    }
    typebutton = (type) =>{
      let url="/home/customer/lst";
      switch(type){
        case "sum":
          url +="";
          break;
        case "today":
          url += "/type/day";
          break;
        case "month":
          url += "/type/month";
          break;
        case "year":
          url += "/type/year";
          break;
        default:
          url +="";
          break;
      }
      fetch(url,{ credentials: 'include' }).then( x => x.json() )
      .then(x => {
        this.setState({ data:x.customer || [], citydata:x.city || [], moduledata:x.module || [], rankdata:x.rank || [], customerdata:x.customer_search || [], count:x.count || 0 })
        // console.log(x)
      }).catch((err) => console.error(err))
    }
    componentDidMount() {
      let url = "/home/customer/lst";
      fetch(url,{ credentials: 'include' }).then( x => x.json() )
      .then(x => {
        this.setState({ data:x.customer || [], citydata:x.city || [], moduledata:x.module || [], rankdata:x.rank || [], customerdata:x.customer_search || [], count:x.count || 0 })
        // console.log(x)
      }).catch((err) => console.error(err))
    }
    
    render(){
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
            filters:this.state.citydata,
            onFilter: (value, record) => {
                if(record.c === value){
                    return true;
                }else{
                    return false;
                }
            }
          }, {
            title: '交易额',
            dataIndex: 'volume',
            key: 'volume', 
            sorter:(a,b) => a.volume - b.volume,    
          }, {
            title: '所属部门',
            dataIndex: 'module_name',
            key: 'module_name', 
            filters:this.state.moduledata,
            onFilter:(text,record) => {
              if(record.module_name === text){
                return true;
              }
              else{
                return false;
              }
            }
          }, {
            title: '客户级别',
            dataIndex: 'rank',
            key: 'rank',
            filters:this.state.rankdata,
            onFilter:(text,record) =>{
              if(record.rank === text){
                return true;
              }
              else{
                return false;
              }
            },
            render:(text,record) => {
              let textrank = "";
              switch(record.rank){
                case "1":
                  textrank = "一级代理";
                  break;
                case "2":
                  textrank = "二级代理";
                  break;
                case "3":
                  textrank = "三级代理";
                  break;
                case "0":
                  textrank = "零售商";
                  break;
                default:
                  textrank = "未定义";
                  break;
              }
              return <span>{textrank}</span>
            }     
          }, {
            title: '操作',
            key: 'action',
            render:(text,record)=>{
              return(
                <div>
                  <Button style={{border:0,paddingLeft: "0px",paddingRight: "3px",color: "#108ee9"}} ghost>编辑</Button>
                  <span>|</span>
                  <Button style={{border:0,paddingLeft: "3px",paddingRight: "3px",color: "#108ee9"}} ghost>删除</Button>
                </div>
              ) 
            }     
          }];
          const pagination = {
            onShowSizeChange: (current, pageSize) => {
            },
            onChange: (current) => {
            },
            defaultPageSize:5
        };
        const { customerdata, citydata } = this.state;
        return(
            <div style={{paddingTop:36}}>
            <Row>
                <span style={{marginLeft:40,fontSize:14,width:70}}>客户名称：</span>
                {/* <Input style={{width:147,height:28}}/> */}
                <AutoComplete dataSource = { customerdata } style = {{ width:147, height:28 }} onSelect = { onSelect } onSearch = { this.handleSearch } defaultValue={this.state.customername} onChange={(text) => { this.state.customername = text }}/>
                <span style={{marginLeft:20,fontSize:14,width:70}}>地区 ：</span>
                {/* <Input style={{width:147,height:28}}/> */}
                <AutoComplete dataSource = { citydata } style = {{ width:147, height:28 }} onSelect = { onSelect } onSearch = { this.handleSearch } defaultValue={this.state.cityname} onChange={(text) => { this.state.cityname = text }}/>
                <Button type = "primary" style = {{ marginLeft:20 }} onClick = { this.Search}>搜索</Button>
            </Row>
            <Row style={{marginTop:35,marginLeft:40}}>
                <Button onClick={()=>{this.typebutton("sum")}} >总额</Button>
                <Button onClick={()=>{this.typebutton("today")}} style={{marginLeft:18}}>今日</Button>
                <Button onClick={()=>{this.typebutton("month");this.setState({count:this.state.count})}} style={{marginLeft:18}}>本月</Button>
                <Button onClick={()=>{this.typebutton("year")}} style={{marginLeft:18}}>全年</Button>
            </Row>
            <Row>
                <Table columns={columns} dataSource={this.state.data} style={{marginLeft:40,marginRight:40,marginTop:10}} footer={() => {return(<div><span>交易额合计（元）:</span><span style={{fontSize:16,marginLeft:5}}>{this.state.count}</span></div>)}} pagination={pagination} onChange={this.handleChange.bind(this)}/>
            </Row>
            </div>
        )
    }
}
export default componentName;