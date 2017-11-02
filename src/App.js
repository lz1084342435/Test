import React, { Component } from 'react';
import { Icon, Form, Button, Input, message } from 'antd';
import logo from '../src/asset/loginbackground.png';
const FormItem = Form.Item;

class componentName extends Component {
  constructor(){
    super();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        fetch("/user/login/dologin",{
          method:'post',
          credentials: 'include',
          headers:{
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body:"email="+values.email+"&password="+values.password
        }).then((x) => x.json()).then(function(data){
            console.log(data)
            if(data.status === 1){
              sessionStorage.user = JSON.stringify(data.data);
              message.success("登录成功");
            }
            else{
              message.error(data.msg);
              return;
            }
        })
      }
      else{
        message.error("请输入账号密码");
        return;
      }
    });
  }
  
  render() { 
    const { getFieldDecorator } = this.props.form;
    return (
      <div >         
        <Form onSubmit={this.handleSubmit} className="login-form" >
        <img src={logo} style={{height:"100%",width:"100%",position:"absolute"}} />
        <div style={{border:"1px solid rgba(244,249,253,1)",position:"absolute",marginLeft:495,marginTop:130,width:326,height:270,backgroundColor:"rgba(244,249,253,1)"}}>
        </div>
          <FormItem style={{paddingLeft:547,paddingTop:210}}>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱!' }],
            })(
              <Input style={{maxWidth:220}} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem style={{paddingLeft:547,paddingTop:5}}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input style={{maxWidth:220}} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem style={{paddingLeft:547,paddingTop:5}}>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:220}}>
              登录
            </Button>
          </FormItem>
        </Form>       
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(componentName);
export default WrappedNormalLoginForm;