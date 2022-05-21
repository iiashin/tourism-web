<template>
    <div id="tourismDetail">
        <div class="top">
            <div class="imgDiv">
                <img :src='`http://localhost:8080/images/${msg.tImage}`' alt="">
            </div>
            <div class="detail">
                <h2>{{msg.tName}}</h2>
                <dl>
                    <dt>旅游团编号</dt>
                    <dd>{{msg.tId}}</dd>
                </dl>
                <dl>
                    <dt>价格</dt>
                    <dd class="price">{{msg.tPrice}}</dd>
                </dl>
                <dl>
                    <dt>选择日期</dt>
                    <dd>
                        <ul>
                            <input type="date" v-model="day" :max="this.max" :min="this.min">
                        </ul>
                    </dd>
                </dl>
                <dl>
                    <dt>详情咨询</dt>
                    <dd>{{msg.tPhone}}</dd>
                </dl>
                <div class="btn">
                    <button @click="orderT">立即预定</button>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="line">线路概览</div>
            <div class="tip" v-html="$options.filters.wrap(msg.tContent)"></div>
            <template v-if="imagesList">
                <div v-for="item in imagesList" :key="item.pId">
                    <img :src='`http://localhost:8080/images/${item.address}`' alt="">
                </div>
            </template>
        </div>
        <div class="require">
            <div class="line">出行须知</div>
            <div class="reContent">
                <p style="color:red">1.出行前请出示48小时核酸检测阴性结果</p>
                <p>2.当地购物时请慎重考虑，把握好质量与价格，务必索要发票。</p>
                <p>3.由于列车、航班等公共交通工具延误或取消，以及第三方侵害等不可归责于旅行社的原因导致旅游者人身、财产权受到损害的， 旅行社不承担 责任，但会积极协助解决旅游者与责任方之间的纠纷。</p>
                <p>4.本产品门票为团队优惠联票，持老人证，学生证等优惠证件的人群不再享受门票优惠。敬请谅 解！</p>
                <p>5.如遇天气原因、突发事件等不可抗力、不可预见因素导致无法按约定时间或行程游览，行程变更后增加的费用由游客承担，减少的费用由旅行社退还。</p>
                <p>6.团队行程中，如您选择中途离团，按照行程中解除合同的标准执行。</p>
            </div>
        </div>
        <div class="comment">
            <div class="line">出行评价</div>
            <div class="list">
                <ul>
                    <li v-for="item in contentList" :key="item.cTime">
                        <div class="left">
                            <div class="word">{{item.content}}</div>
                            <div class="time">{{item.cTime}}</div>
                        </div>
                        <div class="right">
                            {{item.userName}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
// import func from 'vue-editor-bridge';
import {request} from "../../util/request";
export default {
    data(){
        return{
            max:'',
            min:'',
            day:'',
            tId:'',
            contentList:[],
            msg:[],
            imagesList:''
        }
    },
    methods:{
        getMin(idx){
            let date=new Date();
            if(idx==0){
                date.setTime(date.getTime()+48*24*60*1000);
            }else{
                date.setTime(date.getTime()+144*24*60*1000);
                console.log(date)
            }
            let year=date.getFullYear(),
                month=(date.getMonth()+1).toString().padStart(2,0),
                day=date.getDate().toString().padStart(2,0)
            return `${year}-${month}-${day}`;
        },
        //添加订单
        orderT(){
            if(!localStorage.getItem('userId')){
                this.$router.push('/');
                return;
            }
            if(this.day=='') {
                this.$message.error('请选择出行日期');
                return;
            }
            let params={
                dateTime:this.day,
                tId:this.tId,
                userId:localStorage.getItem('userId')
            }
            this.axios.get('/api/addOrder',{
                params
            }).then(res=>{
                this.$message({
                    message: '预定成功',
                    type: 'success'
                });
                setTimeout(()=>{
                    this.$router.push('/home/userContent');
                },2000); 
            })
        },
        //获取订单评价
        getOrder(){
            let params={
                tId:this.tId
            }
            request('/selContent','get',params).then(res=>{
                this.contentList=res;
            })
        }
    },
    //过滤内容
    filters:{
        wrap(val){
            if(val){
                return val.replace(/\r\n/g, '<br/>');
            }
        }
    },
    created(){
        this.min=this.getMin(0);
        this.max=this.getMin(1);
        this.tId=this.$route.params.key;
        this.getOrder();
        let params={
            tId:this.$route.params.key
        }
        this.axios.get('http://localhost:8080/selTourismById',{
            params
        }).then(res=>{
            this.msg=res.data
        })
        this.axios.get('http://localhost:8080/selImageById',{
            params
        }).then(res=>{
            this.imagesList=res.data
        })
    }
}
</script>
<style lang="scss" scoped>
    #tourismDetail{
        padding: 10px 10%;
        .top{
            display: flex;
            .imgDiv{
                width: 430px;
                height: 430px;
            }
            img{
                // height: 100%;
                // overflow: hidden;
                // width: 100%;
                // height: 100%;
                width: 430px;
                height: 430px;
            }
            .detail{
                margin-left: 10px;
                dl{
                    display: flex;
                    height: 38px;
                    margin-bottom: 23px;
                    dt{
                        width: 86px;
                    }
                    .price{
                        color: red;
                        font-weight: bold;
                        font-size: 20px;
                    }
                    dd{
                        ul{
                            padding: 0;
                            margin: 0;
                            display: flex;
                            li{
                                list-style: none;
                                margin-right: 10px;
                            }
                            a{
                                width: 66px;
                                height: 50px;
                                display: inline-block;
                                border: 1px solid red;
                                text-decoration: none;
                                text-align: center;
                            }
                        }
                    }
                }
                .btn{
                    padding-left: 125px;
                    button{
                        background-color: red;
                        color: white;
                        width: 125px;
                        height: 44px;
                        border: 0px solid white;
                    }
                }
            }
        }
        .line{
            width: 100%;
            height: 32px;
            border-bottom: 1px solid gainsboro;
            font-weight: bold;
            color: #1ba9ba;
        }
        .reContent{
            height: 280px;
        }
        .content,.require{
            margin-top: 50px;
            // .tip{
            //      height: 300px;
            // }
            img{
                width: 600px;
            }
        }
        .comment{
            ul{
                padding: 0;
                margin: 0;
                li{
                    padding: 20px;
                    list-style: none;
                    display: flex;
                    height: 100px;
                    border-bottom: 1px solid gainsboro;
                    .left{
                        width: 80%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .time{
                            color:rgb(116, 102, 102);
                            font-size: 15px;
                        }
                    }
                   
                }
            }
        }
    }
</style>