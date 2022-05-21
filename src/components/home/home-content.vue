<template>
    <div id="homeContent" v-if="tList">
        <!-- <el-carousel height="350px">
            <el-carousel-item v-for="item in tList.slice(0,3)" :key="item.tId" >
                <div class="title">{{ item.tName }}</div>
                <img :src='`http://localhost:8080/images/${item.tImage}`' class="banner">
            </el-carousel-item>
        </el-carousel> -->
        <!-- <div class="searchTop">
            <input type="text" v-model="key" @keyup.enter="searchArticle" placeholder="请输入关键词"/>
            <button class="search" @click="searchArticle" >搜索</button>
        </div> -->
        <home-search></home-search>
        <!-- 一级列表加bannner图 -->
        <div class="top">
            <div class="classify">
                <div class="columnTab">
                    <div class="topTitle">热门城市</div>
                    <span v-for="item in citys.slice(0,8)" :key="item.cid">
                        <router-link :to="`/search/${item.cName}`">{{item.cName}}</router-link>
                    </span>
                </div>
                <div class="columnTab">
                    <div class="topTitle">周边游</div>
                    <router-link :to="`/detail/tourismDetail/1025`">长隆野生动物园</router-link>
                    <router-link :to="`/detail/tourismDetail/1027`">海珠国家湿地公园</router-link>
                </div>
                <div class="columnTab">
                    <div class="topTitle">长线游</div>
                    <router-link :to="`/detail/tourismDetail/${item.tId}`" v-for="item in longList.slice(0,2)" :key="item.tId">{{item.toTime}} {{item.cName}}-{{item.toCity}}</router-link>
                </div>
            </div>
            <el-carousel height="380px" style="flex:1">
                <el-carousel-item>
                    <!-- <div class="title">banner1</div> -->
                    <img src="../../assets/1.jpg" class="banner">
                </el-carousel-item>
                <el-carousel-item>
                    <!-- <div class="title">banner2</div> -->
                    <img src="../../assets/2.jpg" class="banner">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 最近热卖 -->
        <div class="min-sale">
            <div class="more">
                <!-- <img src="../../assets/more.png" alt=""> -->
                <router-link to="/home/tourismContent">热卖</router-link>
            </div>
            <div class="sale-content">
                <div class="grow" v-if="hotT.length>=3">
                    <img :src='`http://localhost:8080/images/${hotT[0].tImage}`'  class="first"  @click="$router.push(`/detail/tourismDetail/${hotT[0].tId}`)">
                    <div class="flag flag1">1 {{hotT[0].tName}}</div>
                    <div>
                        <img :src='`http://localhost:8080/images/${hotT[1].tImage}`' alt="" @click="$router.push(`/detail/tourismDetail/${hotT[1].tId}`)">
                        <img :src='`http://localhost:8080/images/${hotT[2].tImage}`' alt="" @click="$router.push(`/detail/tourismDetail/${hotT[2].tId}`)">
                        <div class="flag flag2" >2 {{hotT[1].tName}}</div>
                        <div class="flag flag3">3 {{hotT[2].tName}}</div>
                    </div>
                </div>
                <div class="list">
                    <ul>
                        <li v-for="(item,index) in hotT.slice(3)" :key="item.tId">
                            <router-link :to="`/detail/tourismDetail/${item.tId}`">{{index+4}}.{{item.tName}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 周边游 -->
        <div class="min-nearby">
            <div class="more">
                <router-link to="/home/tourismContent">周边游</router-link>
                <img src="../../assets/more.png" alt="">
            </div>
            <div class="near">
                <div class="nearby-content">
                    <router-link :to="`/detail/tourismDetail/1025`">长隆野生动物园</router-link>
                    <router-link :to="`/detail/tourismDetail/1027`">海珠国家湿地公园</router-link>
                    <a href="">海陵岛</a>
                    <router-link :to="`/detail/tourismDetail/1022`">颐和园</router-link>
                    <router-link :to="`/detail/tourismDetail/1022`">八达岭</router-link>
                </div>
                <div class="images">
                    <img src="../../assets/near.jpg" alt="">
                    <img src="../../assets/near2.jpg" alt="">
                </div>
            </div>
        </div>
        <!-- 长线游 -->
        <div class="min-long">
             <div class="more">
                <router-link to="/home/tourismContent">长线游</router-link>
                <img src="../../assets/more.png" alt="">
            </div>
            <div class="min-content">
                <ul>
                    <li v-for="item in longList.slice(0,8)" :key="item.tId"  @click="$router.push(`/detail/tourismDetail/${item.tId}`)">
                        <img :src='`http://localhost:8080/images/${item.tImage}`' alt="">
                        <div class="txtBox">
                            <p class="txt1">{{item.cName}}-{{item.toCity}} </p>
                            <p class="txt2">{{item.toTime}} ￥{{item.tPrice}}</p>
                        </div>
                    </li>      
                </ul>
            </div>
        </div>
        <!-- 更多旅游团 -->
        <div class="min-tourism">
            <div class="more">
                <router-link to="/home/tourismContent">更多旅游团</router-link>
                <img src="../../assets/more.png" alt="">
            </div>
            <div class="t_cards">
                <el-row>
                    <el-col :span="8" v-for="item in tList.slice(0,4)" :key="item.tId">
                        <el-card :body-style="{ padding: '0px' }">
                        <img :src='`http://localhost:8080/images/${item.tImage}`' class="image">
                        <div style="padding: 14px;">
                            <span class="tName">{{item.tName}}</span>
                            <div class="bottom clearfix">
                                <!-- <time class="time">{{ currentDate }}</time> -->
                                <span>￥{{item.tPrice}}</span>
                                <el-button type="text" class="button"  @click="$router.push(`/detail/tourismDetail/${item.tId}`)">查看</el-button>
                            </div>
                        </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
// import homeSearch from '../home-search.vue';
import homeSearch from '../home-search.vue';
export default {
    components: { homeSearch },
    data(){
        return{
            tList:[],
            key:'',
            citys:[],
            longList:[],
            hotT:[]
            // components:{homeSearch}
        }
    },
    methods: {
        searchArticle(){

        }
    },
    created(){
        this.axios.get('http://localhost:8080/selAllTourism').then(
            res=>{
                this.tList=res.data;
        })
        let params={
            cName:'北京'
        }
        this.axios.get('http://localhost:8080/selTourismByName',{params}).then(
            res=>{
                console.log(res.data);
        })
        //搜索所有城市
        this.axios.get('http://localhost:8080/selectCity').then(
            res=>{
                this.citys=res.data
        })
        //搜索所有长线游
        this.axios.get('http://localhost:8080/selLongTourism').then(
            res=>{
                this.longList=res.data
        })
       //获取销量前几的旅游团
        let arr=[];
        this.axios.get('http://localhost:8080/mostOrder').then(
            res=>{
                arr=res.data.slice(0,6);
                let tmp=[];
                for(let i=0;i<arr.length;i++){
                    tmp[i]=this.tList.filter(item=>item.tId==arr[i].tId)[0];
                }
                this.hotT=tmp;
        })
    }
}
</script>
<style lang="scss" scoped>
    #homeContent{
        padding:10px 10%;
        box-sizing: border-box;
        width: 100%;
        .tName{
            // display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space:nowrap;
            // margin-right: 2px;
        }
        .searchTop{
            position: relative;
            width:100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e3f7f7;
            margin-bottom: 15px;
            input{
                height: 38px;
                width: 445px;
                box-sizing: border-box;
                border: 4px solid #f24a15;
            }
            .search{
                height: 38px;
                width: 96px;  
                color: white;
                background-color:#f24a15;
                border: 0px;
                font-weight: bold;
            }
        }
        .top{
            display: flex;
            .classify{
                box-sizing: border-box;
                width:225px ;
                border: 1px solid black;
                margin-right: 5px;
                padding: 15px;
                .columnTab{
                    padding: 10px 0px;
                    border-bottom:1px solid #d3dce6;
                }
                .topTitle{
                    font-weight: bold;
                }
                a{
                    text-decoration: none;
                    display: inline-block; /*inline没办法调整top */
                    margin-top:15px ;
                    margin-right: 5px;
                    color: black;
                }
            }
        }
        .banner{
            height: 100%;
            width: 100%;
        }
        .title{
            position: absolute;
            bottom: 10px;
            background-color: grey;
            opacity: 0.75;
            right: 0;
            width: 60%;
            height: 40px;
            color: white;
        }
        // min-width:1300px;
        padding: 10px 10%;
        .el-carousel__item h3 {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 150px;
            margin: 0;
        }
        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }
        
        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }
        .more{
            margin-top: 10px;
            font-weight: bold;
            color: #ffb74d;
            width: 100%;
            height: 32px;
            border-bottom:1px solid #ffb74d;
            a{
                text-decoration: none;
                color: #ffb74d;
                // float: right;
                // vertical-align: center;
            }
            img{
                // float: right;
                height: 20px;
                vertical-align: text-bottom;
            }
        }
        .min-tourism,min-scenery{
            margin-top: 10px;
            padding-bottom: 20px;
        }
            // border-bottom: 1px solid gainsboro;;
        .t_cards{
            padding: 10px;
            width: 100%;
            .el-col-8 {
                margin-top: 2%;
                margin-right: 1%;
                width: 23.33333%;
            }
            .time {
                font-size: 13px;
                color: #999;
            }
            .bottom {
                margin-top: 13px;
                line-height: 12px;
            }

            .button {
                padding: 0;
                float: right;
            }

            .image {
                width: 100%;
                height: 200px;
                display: block;
            }

            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }
            
            .clearfix:after {
                clear: both
            }
        }
        .min-nearby{
            .near{
                display: flex;
                width: 100%;
                justify-content: space-between;
                padding: 5px;
                nearby-content{
                    // width: 400px;
                }
                .images{
                    flex: 1;
                    display: flex;
                    img{
                        width: 200px;
                        height: auto;
                        margin-top: 10px;
                        margin-right: 25px;
                    }
                }
            }
        }
        .min-content{
            ul{
                margin: 0;
                padding: 20px 0;
                width: 100%;
                overflow: hidden;
                li{
                    float: left;
                    list-style: none;
                    position: relative;
                    margin-right: 35px;
                    // margin-top: 35px;
                    img{
                        width:224px;
                        height:149px ;
                    }
                    .txtBox{
                        position: absolute;
                        top: 58px;
                        color: white;
                        left:10px;
                        .txt1{
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .sale-content{
            padding: 20px 0;
            display: flex;
            .grow{
                display: flex;
                width: 700px;
                position: relative;
                .flag{
                    position: absolute;
                    font-weight: bold;
                    color: white;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .first{
                    width: 448px;
                    height:298px;
                    margin-right: 10px;
                }
                .flag1{
                    top:162px;
                }
                .flag2{
                    top:117px;
                }
                .flag3{
                    top:268px;
                }
                div{
                    display: flex;
                    flex-direction: column;
                    img{
                        margin-bottom: 5px;
                        width:224px;
                        height:149px ;
                    }
                }
            }
            .list{
                flex: 1;
                ul{
                    margin: 0;
                    padding: 20px 0;
                    width: 100%;
                    li{
                        list-style: none;
                        font-size: 17px;
                        margin-bottom: 10px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        a{
                            text-decoration: none;
                            color: black;
                        }
                    }
                }
            }
        }
        .nearby-content{
            // width: 100%;
            width: 680px;
            height: 100px;
            a{
                display: inline-block;
                margin: 5px;
                text-decoration: none;
                color: black;
                width: 150px;
                border-right: 1px solid grey;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
</style>