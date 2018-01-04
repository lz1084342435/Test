import { observable, action, useStrict, toJS, runInAction } from 'mobx';
import moment from 'moment';
import { message } from 'antd';
useStrict(true)

const user = JSON.parse(sessionStorage.getItem("user")) || {};
class store {
    @observable sname = "";
    @observable value = {
        dlkey:"",
        price:"",
    }
    @observable addvisible = false;
    @observable selected = [];
    @observable data = [];
    @observable cnameData = [];
    @observable caddress = [];
    @observable type = [];
    @observable seleData = [];
    @action
    getData = () =>{  
            fetch('/sales/sales/createSckey',{credentials:'include'}).then(x => x.json()).then(x => {
                runInAction(() => {
                    this.sname = user.name;
                    this.value.dlkey = x.data;
                })
            fetch('/sales/customer/lst/type/0',{credentials:'include'}).then(x => x.json()).then(x =>{
                runInAction(() => {
                    this.caddress = x.customer_address || [];
                    console.log(toJS(this.caddress))
                    this.cnameData = x.customer || [];
                }) 
            })
            fetch('/purchase/purchase/purchaseTypeList',{credentials:'include'}).then(x => x.json()).then(x => {
                runInAction(() => {
                    this.type = x.data || [];
                })    
            })
        })      
    }
    @action
    hideModal = () => {
        this.addvisible = false;
    }
    @action
    confirm = () =>{
        let ddata = [];
        toJS(this.data).map((Item,index) => {
            toJS(this.selected).map((item,i) =>{
                if(Item.id === item){
                    ddata.push(Item);
                }
            })        
        })
        this.seleData = (ddata || []).map(xx => ({...xx, realNum:1, realSum: "0.0"}));
        this.addvisible = false;
        console.log(toJS(this.seleData))
    }
   
}
const order = new store();

export default order;