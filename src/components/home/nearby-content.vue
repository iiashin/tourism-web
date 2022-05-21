<template>
    <div id="nearby">
        <el-col :span="8" v-for="item in nearbyList" :key="item.tId">
            <el-card :body-style="{ padding: '0px' }">
            <img :src='`http://localhost:8080/images/${item.tImage}`' class="image">
            <div class="topic">{{item.cName}}</div>
            <div style="padding: 14px;">
                <div class="name">{{item.tName}}</div>
                <!-- <div class="mid">
                    <span></span>
                </div> -->
                <div class="bottom clearfix">
                    <div class="price">{{item.tPrice}}</div>
                    <el-button type="text" class="button"  @click="$router.push(`/detail/tourismDetail/${item.tId}`)">去看看</el-button>
                </div>
            </div>
            </el-card>
        </el-col>
    </div>
</template>
<script>
// import homeSearch from '../home-search.vue';
import {request} from "../../util/request";
export default {
    // components: { homeSearch },
    data(){
        return{
            nearbyList:[]
        }
    },
    methods:{

    },
    created(){
        let params={
            cName:'广州'
        }
        request("/selTourismByName", "get", params).then((res)=>{
            this.nearbyList=res
        })
        // this.axios.get(' http://localhost:8080/selTourismByName',{params}).then(res=>{this.nearbyList=res.data})
    }
}
</script>
<style lang="scss" scoped> 
    #nearby{
        padding:10px 10%;
        width: 100%;
        box-sizing: border-box;
        .topic{
            // position: absolute;
            background-color: #999;
            color: white;
            // top: 254px;
            width: 100%;
            font-size: 18px;
            height: 50px;
            line-height: 50px;
            padding-left: 5px;
            box-sizing: border-box;
        }
        .el-col-8 {
            position: relative;
            margin-top: 2%;
            margin-right: 1%;
            width: 24%;
        }
        .name{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .time {
            font-size: 13px;
            color: #999;
        }
        .bottom {
            margin-top: 13px;
            line-height: 12px;
            display: flex;
            justify-content: space-between;
            .price{
                color: #ff7145; 
            }
        }

        .button {
            padding: 0;
            float: right;
        }

        .image {
            width: 100%;
            height: 250px;
            display: block;
        }

        // .clearfix:before,
        // .clearfix:after {
        //     display: table;
        //     content: "";
        // }
        
        // .clearfix:after {
        //     clear: both
        // }
    }
   
</style>