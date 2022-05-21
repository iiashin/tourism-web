<template>
    <div id="login" style="background-color:#e5d9f1;height:100%;width:100%">
        <div class="logo">旅游网</div>
        <div class="container">
            <div class="left">
                <img src="../assets/8.jpg">
            </div>
            <div class="right">
                <div class="userInput">
                    <span class="title">用户登录</span>
                    <br>
                    <input type="text" v-model="userName" placeholder="用户名"/>
                    <br/>
                    <input type="password" v-model="password" placeholder="密码"/>
                    <br/>
                    <el-button type="primary" round @click="isLogin">登录</el-button>
                </div>
                <a href="http://localhost:8081/register">开始注册</a>
            </div>
        </div>

        <!--  -->
        <!-- <el-upload
            action="http://localhost:8080/testUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
    </div>
</template>
<script>
import {request} from "../util/request";
export default {
    data() {
        return {
            userName:'',
            password:'',
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods: {
        isLogin(){
            if(this.userName=='admin'&&this.password=='admin'){
                this.$router.push('/admin');
            }else{
                let params={
                    userName:this.userName,
                    password:this.password
                }
                request('/login','get',params).then(res=>{
                    if(res){
                        localStorage.setItem('userId',res.useId);
                        this.$router.push('/home/homeContent');
                    }else{
                        this.$message.error('输入有误，请重新输入');
                    }
                })
            }
        }
    },
}
</script>
<style lang="scss">
    #login{
        background-color: #fff;
        height: 100%;
        overflow: hidden;
        .logo{
            font-weight: bold;
            /* font-family: "Times New Roman"; */
            font-size: 45px;
            margin-left: 90px;
            margin-top: 26px;
            color: green;
        }
        .container{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            height: 500px;
            width: 900px;
            box-shadow: -1px -1px 5px black;
            display: flex;
            .left{
                width: 60%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                h2{
                    /*position: absolute;*/
                    text-align: center;
                    /*top: 50%;*/


                }
            }
            .right{
                background-color: white;
                height: 100%;
                width: 40%;
                position: relative;
                .userInput{
                    width: 100%;
                    text-align: center;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    .title{
                        font-weight: bold;
                        font-family: Georgia;
                        font-size: 22px;
                    }
                    input{
                        outline: none;
                        margin: 15px 0;
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
                    button{
                        width: 70%;
                    }
                }
                a{
                    position: absolute;
                    bottom: 10px;
                    text-decoration: none;
                    right: 10px;
                    color:#999999;
                }
            }
        }
    }
</style>