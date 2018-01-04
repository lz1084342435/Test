import { observable, action, useStrict, toJS, runInAction } from 'mobx';
import moment from 'moment';
import { message } from 'antd';
useStrict(true)

class store {
    @observable data = [];
    @observable typeData = [];
    @observable allType = [];
    @observable allSckey = [];
    @observable cnameData = [];
    @observable pagination = 1;
    @observable shipvisible = false;
    @observable value = {
        sckey:"",
        cname:"",
        type:"",
        status:"",
        startTime:null,
        endTime:null,
    };
    @action
    getData=(id)=>{
        fetch('/purchase/purchase/purchaseTypeList',{ credentials:'include' }).then(DataSource => DataSource.json()).then(DataSource => {
            runInAction(()=>{
                let allType = [];
                let cType = [];
                let typeData = [];
                typeData = DataSource.data || [];
                for(let i = 1; i < typeData.length; i ++){
                    if(cType.indexOf(typeData[i]) == -1){
                        cType.push(typeData[i])
                    }
                }
               this.typeData = cType || [];
            })  
        })
        fetch('/sales/sales/sContractList',{ credentials:'include' }).then(x => x.json()).then(x =>{
            runInAction(()=>{
                this.data = (x.data || []).map( alldata => ({ ...alldata, status: ["","执行中","终止","意外终止","已完成"][alldata.status]}));
                console.log(toJS(this.data))
                let allsckey = [];
                let cnameData = [];
                let newcnameData = [];
                let finalcData = [];
                this.data.map((Item,index) => {
                    allsckey.push(Item.sckey);
                    cnameData.push(Item.cname);
                })
                for(let i=0 ;i < cnameData.length ; i ++){
                    if(newcnameData.indexOf(cnameData[i]) == -1){
                        newcnameData.push(cnameData[i])
                    }
                }              
                this.allSckey = allsckey || [];
                this.cnameData = newcnameData || [];
            })           
        }).catch(err => console.error(err))
    }
    @action
    handleChange = (type,value) =>{
        this.value[type] = value;
    }
    @action
    search = () =>{
        let value = {
            ...this.value,
        }
        if (value.startTime) {
            value.startTime = moment(this.value.startTime).format("YYYY/MM/DD");
        } else {
            value.startTime = "";
        }
        if (value.endTime) {
            value.endTime = moment(this.value.endTime).format("YYYY/MM/DD");
        } else {
            value.endTime = "";
        }
        
        let url = "";
        for(let x in value){
            if(value.hasOwnProperty(x)){
               url += `${x}=${value[x]}&`; 
            }
        }
        url = url.substring(0,url.length-1);
        console.log(url)
        fetch('/sales/sales/sContractList?'+url,{ credentials:'include' }).then(x => x.json()).then(x =>{
            console.log(x)
            runInAction(()=>{
                message.info(`共搜索到 ${x.data?x.data.length:0}条数据`)
                this.data = (x.data || []).map(dataall => ({ ...dataall, status:["","执行中","终止","意外终止","已完成"][dataall.status]}));
            })    
        })
    }
    // 当前合同编号下的所有sku列表
    @observable skulist = [];
    @observable selectedRowKeys = [];
    @observable sendData = {};
    @observable shipmentValue = {
        dlkey:"",
        express:"",
        address:"",
        expNo:"",
        note:"",
        realGet:"",
        deliveryDate:"",
        sumfee:0
    };
    @action
    showModal = (record) =>{
        fetch('/store/delivery/create?sckey='+record.sckey,{ credentials:'include' }).then(x => x.json()).then(x => {
            runInAction(() => {
                let delivery = [];
                delivery = x.delivery || [];           
                let skulist = [];
                let newsku =[];
                let selectedRowKeys = [];
                let newskulist = [];
                skulist = JSON.parse(x.sales_contract.orderlist)
                skulist = skulist.map(list => ({...list,realGet:list.num}))
                skulist.forEach(function(e,i) {
                    newsku[i]= ({...e,num:e.num,realGet:e.realGet})
                    delivery.map((Item,index) => {
                        if(Item.sku == e.sku){
                            if(e.num <= 0){
                                delete newsku[i]
                            }
                            else{
                                newsku[i] = ({...e, num : Number(e.num) - Number(Item.num), realGet : Number(e.num) - Number(Item.num)})
                            }
                        }
                        this.newsku = newsku;
                    })
                }, this);
                for(const key in newsku){
                    if(newsku.hasOwnProperty(key)){
                        newsku.map((Item,index) => {
                            if(Item.num <= 0){
                                delete newsku[index];
                            }
                        })
                        newskulist.push(newsku[key])
                    }
                }
                if(newskulist <= 0){
                    message.info("商品已全部发货!");
                    return;
                }
                this.shipvisible = true;
                newskulist.map((Item,index) => {
                    selectedRowKeys.push(Item.sku);
                })
                console.log(newskulist)
                this.skulist = newskulist;
                this.selectedRowKeys = selectedRowKeys;
                this.shipmentValue = {
                    dlkey:x.dlkey || "",
                    sckey:record.sckey || "",
                    express:"",
                    expNo:"",
                    note:"",
                    address:"",
                    deliveryDate:"",
                }
            })
        })
    }
    @action
    hideModal = () =>{
        this.shipvisible = false;
    }
    @action
    shipSubmit = () =>{
        if(toJS(this.selectedRowKeys).length === 0){
            message.error("请选择要发货的商品!");
            return;
        }
        let date = new Date();
        if(this.shipmentValue.deliveryDate == ""){
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            const time = year + '-'+ month + '-' +day;
            this.shipmentValue.deliveryDate = time;
        }
        let sumfee = 0.0;
        let sumdata = [];
        let restSum = [];
        toJS(this.skulist).forEach((x,j) => {
            if(this.selectedRowKeys.indexOf(x.sku) >= 0){
                sumfee += x.realGet * x.price;
                sumdata.push({
                    sku:x.sku,
                    name:x.name
                })
                
                // restSum.push({
                //     sku:x.sku,
                //     num:Number(x.num) - Number(x.realGet)
                // })

                // restSum.map((Item,index) => {
                //     if(Item.sku == x.sku){
                //         this.skulist[j].num = Item.num;
                //         console.log(toJS(this.skulist))

                //     }
                // })
            }
        })
        this.sumfee = sumfee;
        let submit = {
            ...this.shipmentValue,
            fee:sumfee,
            deliverylist:JSON.stringify(sumdata)
        }
        let formData = new FormData();
        for(let key in submit){
            formData.append(key,submit[key]);
        }
        let header = {
            credentials:'include',
            method:'post',
            headers:{},
            body:formData
        }
        fetch('/store/delivery/add',header).then(x => x.json()).then(x => {
            if(x.status === 1){
                runInAction(() => {
                    message.info(x.msg);
                    this.selectedRowKeys = [];
                    this.shipvisible = false;
                })             
            }else{
                message.error(x.msg)
            }
        }).catch(err => console.error(err))
    }

}

const order = new store();

export default order;