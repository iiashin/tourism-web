<template>
    <div id="tourism">
        <home-search v-if="flag"></home-search>
       <div class="list">
           <ul>
               <li v-for="item in tourismList" :key="item.tId" @click="$router.push(`/detail/tourismDetail/${item.tId}`)">
                   <img :src='`http://localhost:8080/images/${item.tImage}`' alt="">
                   <div class="mid">
                       <div class="tName">{{item.tName}}</div>
                       <div class="tContent">{{item.tContent}}</div>
                   </div>
                   <div class="price">{{item.tPrice}}</div>
               </li>
           </ul>
       </div>
        <div class="block">
            <el-pagination
            layout="prev, pager, next"
            :total="tourismList.length"
            :page-size="8"
            @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {request} from "../../util/request";
import homeSearch from '../home-search.vue';
export default {
    components: { homeSearch },
    data(){
        return{
            tourismList:[1,2,3,4,5,6,7,8,9],
            flag:false
        }
    },
    methods:{
        //跳转页数
        handleCurrentChange(val) {
            this.valData=val
        }
    },
    created(){
        request('/selAllTourism','get',{}).then(res=>{this.tourismList=res})
    }
}
</script>
<style lang="scss" scoped>
    #tourism{
        padding: 10px 10%;
        .list{
            li:hover{
                border: 1px solid red;
            }
            li{
                list-style: none;
                width: 100%;
                height: 120px;
                padding: 5px;
                border-bottom: 1px solid gainsboro;
                display: flex;
                img{
                    height:100%;
                    width: 200px;
                }
                .mid{
                    width: 728px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            }
        }
        .block{
            position: relative;
            height: 20px;
            padding-top: 5px;
            .el-pagination{
                display: inline-block;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .tContent{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>