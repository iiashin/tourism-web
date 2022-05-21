<template>
    <div id="register">
        <!-- <el-alert title="成功提示的文案" type="success"  effect="dark"></el-alert> -->
        <div class="container">
            <span>用户注册</span>
            <br>
            <input type="text" placeholder="昵称" v-model="userName" @blur="toCheck">
            <br>
            <div :class="['tip',isRepeat?'active':'quiet']">名称重复，请重新输入</div>
            <input type="password" placeholder="密码" v-model="password" @blur="toLen">
            <br>
            <div :class="['tip',isLen?'active':'quiet']">请输入长度6~12的密码</div>
            <input type="text" placeholder="手机号" v-model="phone" @blur="isNum">
            <br>
            <div :class="['tip',isActive?'active':'quiet']">请输入正确的电话格式</div>
            <input type="button" value="注册" class="submit" @click="toRegister" />
        </div>
    </div>
</template>

<script>
import {request} from "../util/request";
    export default {
        name: "Register",
        data(){
            return{
                isRepeat:false,
                isActive:false,
                isLen:false,
                userName:'',
                password:'',
                phone:'',
            }
        },
        methods:{
            //判断手机号格式是否正确
            isNum(){
                if(this.phone.length!=11){
                    this.isActive=true;
                }else{
                    this.isActive=false;
                }
            },
            //判断长度是否符合
            toLen(){
                if(this.password.length>12||this.password.length<6){
                    this.isLen=true;
                }else{
                    this.isLen=false;
                }
            },
            //查看名字是否重复
            toCheck(){
                let params={
                    userName:this.userName,
                }
                request('/toCheck','get',params).then(
                    res=>{
                        if(res){
                            this.isRepeat=true;
                        }else{
                            this.isRepeat=false;
                        }
                    }
                )
            },
            //用户注册
            toRegister(){
                if(this.userName!=''&&this.phone!=''&&this.password!=''){
                    if(!this.isRepeat&&!this.isActive&&!this.isLen){
                        let params={
                            userName:this.userName,
                            password:this.password,
                            phone:this.phone,
                        }
                        request('/toRegister','get',params).then(
                            res=>{
                                if(res){
                                    this.$message({
                                        message: '注册成功',
                                        type: 'success'
                                    });
                                    this.$router.push('/');
                                }
                            }
                        )
                    }else{
                        this.$message.error('请输入合适的格式');
                    }
                }else{
                    this.$message.error('不能为空');
                }
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    #register{
        height: 100%;
        width: 100%;
        background-color: rgb(235, 229, 229);
        .container{
            box-sizing: border-box;
            padding: 54px 0px;
            background-color: white;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            height: 470px;
            width: 457px;
            box-shadow: -1px -1px 5px black;
            text-align: center;
                span{
                    font-weight: bold;
                    font-family: Georgia;
                    font-size: 22px;
                    margin-bottom: 15px;
                    display: inline-block;
                }
                input[type="text"],input[type="password"]{
                    outline: none;
                    margin: 0px 0px 10px 0px;
                    height: 30px;
                    width: 70%;
                    border-top-width: 0;
                    border-left-width: 0;
                    border-right-width: 0;
                    border-bottom-width: 2px;
                    font-size: 15px;
                    
                }
                input:focus{
                    border-bottom-color: #76b2f1;
                }
                input[type="file"]{
                    position: relative;
                    left: -2px;
                }
                input[type="button"]{
                    margin-top:20px;
                    width: 74%;
                    height: 35px;
                    border-radius: 5px;
                    background-color:#598ec7;
                    color: white;
                } 
                .tip{
                    color: red;
                }      
                .acive{
                    visibility: visible;
                } 
                .quiet{
                    visibility: hidden;
                }
            // }
        }
    }
</style>