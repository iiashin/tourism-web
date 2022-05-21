<template>
    <div id="homeHeader">
        <div class="headerTop">
            <div class="left">
                <img src="../assets/logo.png">
                <span>旅游网</span>
            </div>
        </div>
        <div class="headerNav">
            <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
               <el-menu-item index="1">
                    <router-link to="/home/homeContent">首页</router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="/home/tourismContent">度假团购</router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to="/home/nearbyContent">周边游</router-link>
                </el-menu-item>
                <el-menu-item index="4">
                    <router-link to="/home/longContent">长线游</router-link>
                </el-menu-item>
                <el-menu-item index="5">
                    <router-link to="/home/userContent">个人信息</router-link>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        handleSelect(key, keyPath) {
            console.log(key);
        }
    }
}
</script>
<style lang="scss" scoped>
    #homeHeader{
        min-width:1300px;     /*限制页面缩小的最小宽度*/
        .headerTop{
            height: 100px;
            background-color:#1ba9ba;
            display: flex;
            justify-content:space-between;
            padding:0 10%;
            color: white;
            /*width: 100%;*/
            align-items:center;     //垂直居中
            box-sizing:border-box;
            .left span{
                font-size: 36px;
                font-weight: 800;
                display: inline-block;
                vertical-align:  middle;  ////定义行内元素的基线相对于该元素所在行的基线的垂直对齐。middle元素放在父元素的中部
            }
            .left img{
                vertical-align:  middle;   //定义行内元素的基线相对于该元素所在行的基线的垂直对齐。middle元素放在父元素的中部
                height: 70px;
            }
        }
        .headerNav{
            font-size:16px;
            color: white !important;
            padding:0 10%;
            box-sizing:border-box;
            background-color: #00667a !important;
            ul,li{
                background-color: #00667a!important;
            }
            li:hover{
                background-color: #168795 !important;
            }
            .el-menu--horizontal>.el-menu-item{
                color: white !important;
                border-bottom: 2px solid;
                font-size: 16px;
                font-weight: bold;
            }
            a{
                text-decoration: none;
            }
        }
    }
</style>