<template>
    <div id="user-content">
        <div class="user">
            <img src="../../assets/userImage.png" alt="">
            <div class="msg">
                <span v-if="userMsg">用户Id:{{userMsg.useId}}</span>
                <span v-if="userMsg">{{userMsg.userName}}</span>
            </div>
            <el-button type="primary" style="position:absolute;right:10px;" v-if="!userMsg" @click="$router.push('/')">点击登录</el-button>
        </div>
        <div class="content" v-if="orderList">
            所有订单
            <table v-for="(item,index) in orderList" :key="item.orderid">
                <tr>
                    <th class="index1">
                        <img :src='`http://localhost:8080/images/${item.tImage}`' alt="">
                    </th>
                    <th class="index2">
                        <span>{{item.tName}}</span>
                        <span>出行时间:{{item.dateTime}}</span>
                    </th>
                    <th class="index3">{{item.tPrice}}</th>
                    <th class="index4">
                        <span v-if="item.content">已评价</span>
                        <span v-if="!item.content&&(new Date(item.dateTime)-new Date())<0" class="pointer" @click="open(item.orderId,item.tId,index)">前往评价</span>
                        <span v-if="(new Date(item.dateTime)-new Date())>0" >尚未出行</span>
                        <el-button class="cancel" size="mini" type="danger" v-if="(new Date(item.dateTime)-new Date())>0" @click="cancelOrder(item.orderId)">取消订单</el-button>
                    </th>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import {request} from "../../util/request";
export default {
    data(){
        return{
            flag:true,
            orderList:'',
            userMsg:''
        }
    },
    methods:{
        //获取订单列表
        getOrderList(){
            let params={
                userId:localStorage.getItem('userId')
            }
            request('/selectUserOrder','get',params).then((res)=>{
                // console.log(res);
                this.orderList=res;
            })
        },
        //开启评价
        open(orderId,tId,index1){
            const h = this.$createElement;
            let that=this;
            this.$msgbox({
            title: '消息',
            message: h('p', null, [
                h('span', null, '请输入你的评价:'),
                h('textarea',{class:'msg11'}, '')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done,index) => {
                if (action === 'confirm') {
                    let input=document.getElementsByClassName('msg11')[0];
                    let content=input.value;
                    let userId=localStorage.getItem('userId');
                    let date=new Date();
                    let year=date.getFullYear(),
                        month=(date.getMonth()+1).toString().padStart(2,0),
                        day=date.getDate().toString().padStart(2,0)
                    let cTime= `${year}-${month}-${day}`;
                    let params={
                        userId:userId,
                        orderId:orderId,
                        tId:tId,
                        cTime:cTime,
                        content:content
                    }
                    request('/addContent','get',params).then((res)=>{
                        this.orderList[index1].content=content;
                        done();
                    })
                } else {
                    done();
                }
            }
        }).then(action => {
        }).catch((err)=>err);
        },
        //取消订单
        cancelOrder(orderId){
            let params={
                orderId:orderId
            }
            request('/delOrder','get',params).then((res)=>{
                if(res){
                    this.orderList=this.orderList.filter(item=>item.orderId!=orderId);
                }
            })
        }
    },
    created(){
        // console.log(localStorage.getItem('userId'));
        if(localStorage.getItem('userId')){
            this.getOrderList();
            let params={
                userId:localStorage.getItem('userId'),
            }
            request('/selUserById','get',params).then((res)=>{
                this.userMsg=res;
            })
        }
    }
}
</script>
<style lang="scss" scoped>
   #user-content{
       padding: 10px 10%;
       min-height: 500px;
       .user{
           margin-bottom: 10px;
           padding: 10px;
           display: flex;
           width: 100%;
           height: 60px;
           border: 1px solid black;
           align-items: center;
           position: relative;
           .msg{
               display: flex;
               span{
                   margin-left: 10px;
               }
           }
           img{
               height: 50px;
           }
       }
       .content{
        //    ul{
        //        padding: 0;
        //        li{
        //             height: 100px;
        //             width: 100%;
        //             border: 1px solid black;
        //             list-style: none;
        //        }
        //    }
            table{
                height: 100px;
                width: 100%;
                border: 1px solid rgb(179, 165, 165);
                margin-bottom: 10px;
                .index1{
                    width: 200px;
                    img{
                        height: 80px;
                        width: auto;
                    }
                }
                .index2{
                    width: 500px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    align-items: flex-start;
                    margin-right: -270px;
                    span{
                        font-size:15px;
                        font-weight: normal;
                    }
                }
                .index4{
                    // display: flex;
                    // justify-content: space-between;
                    font-weight: normal;
                    .pointer{
                        cursor:pointer;
                    }
                    .cancel{
                        margin-left: 20px;
                    }
                }
            }
       }
   } 
</style>