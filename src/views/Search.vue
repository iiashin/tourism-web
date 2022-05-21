<template>
    <div id="search">
        <home-header></home-header>
        <div class="searchContent">
            <home-search :cName=cName></home-search>
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
        <home-footer></home-footer>
    </div>
</template>
<script>
import homeSearch from '../components/home-search.vue';
import HomeHeader from '../components/home-header.vue';
import homeFooter from '../components/home-footer.vue';
export default {
    name:'Search',
    components: { homeSearch,HomeHeader,homeFooter },
    data(){
        return{
            tourismList:[],
            cName:''
            // flag:false
        }
    },
    watch:{
        '$route.params.cName':function(newVal,oldVal){
            let params={
                tName:newVal
            }
            this.axios.get('http://localhost:8080/selTourismBytName',{params}).then(res=>{
                    this.tourismList=res.data;
            })
        }
    },
    methods:{
        //跳转页数
        handleCurrentChange(val) {
            this.valData=val
            console.log(this.valData)
            // this.data=this.tableData.slice((val-1)*8,val*8)
        }
    },
    created(){
        this.cName=this.$route.params.cName;
        let params={
            cName:this.cName
        }
        this.axios.get('http://localhost:8080/selTourismByName',{params}).then(res=>{
            this.tourismList=res.data;
            if(this.tourismList.length<=0){
                params={
                    tName:this.cName
                }
                this.axios.get('http://localhost:8080/selTourismBytName',{params}).then(res=>{
                    this.tourismList=res.data;
                })
            }
        })
    }
}
</script>
<style lang="scss" scoped>
    #search{
        min-width:1300px;
    }
    .searchContent{
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