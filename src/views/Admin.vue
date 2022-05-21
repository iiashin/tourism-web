<template>
    <div id="admin">
        <!--侧边栏-->
        <div class="sideBar">
            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo"
                     active-text-color="#42b983" background-color="rgb(48, 65, 86)" text-color="white" :collapse="isCollapse" @select="handleSelect">
                <div class="sigh">
                    <img src="../assets/logo.png">
                </div>
                <!-- <el-menu-item index="1" class="activeCol">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item> -->
                <el-menu-item index="2" >
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户信息</span>
                </el-menu-item>
                <el-submenu index="3" >
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">旅行团管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">旅行团信息</el-menu-item>
                        <el-menu-item index="3-2">添加旅行团</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="4" >
                    <i class="el-icon-menu"></i>
                    <span slot="title">订单信息</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!--侧边栏右边-->
        <div class="right">
            <!--顶部-->
            <div class="topNav">
                <!--伸缩侧边栏-->
                <img :src="isCollapse?require('../assets/close.png'):require('../assets/open.png')" @click="isCollapse=!isCollapse"> 
            </div>
            <!--tab栏标题-->
            <div class="onTab">
                <div class="tabBtn">
                    <!-- <button :class="'1'===activeIndex?'active':''"   @click="choseItem('1')">首页</button>
                    <template v-for="item in openIndex.filter(item=>item.id!=='1')">
                        <button v-if="item.id===activeIndex" class="active">
                            <img src="../assets/dot.png">
                            {{item.name}}
                            <img src="../assets/shut2.png" @click.stop="delItem(item.id)">  <!--.stop防止冒泡，阻止按钮点击事件！！！-->
                        <!-- </button>
                        <button v-else @click="choseItem(item.id)">
                            {{item.name}}
                            <img src="../assets/shut.png" @click.stop="delItem(item.id)">
                        </button>
                    </template> --> 
                </div>
                <!--tab栏内容-->
                <div class="tabItem">
                    <!--<keep-alive>-->
                    <component :is="componentId"></component>
                    <!--</keep-alive>-->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // import {mapState,mapMutations,mapActions} from 'vuex'
    import adminAddTourism from '../components/admin/admin-add-tourism.vue'
    import adminOrderMsg from '../components/admin/admin-order-msg.vue'
    import adminTourismMsg from '../components/admin/admin-toursim-msg.vue'
    import adminUserMsg from '../components/admin/admin-user-msg.vue'
    export default {
        name: "admin",
        components:{
            adminAddTourism,adminOrderMsg,adminTourismMsg,adminUserMsg
        },
        data() {
            return {
                isCollapse: false,
                componentId:'adminUserMsg',
                activeIndex:'3-1',
                map:[
                    // {id:'1',sign:'stuMsg'},
                    {id:'2',sign: 'adminUserMsg'},
                    {id:'3-1',sign:'adminTourismMsg'},
                    {id:'3-2',sign:'adminAddTourism'},
                    {id:'4',sign:'adminOrderMsg'}
                ]
            };
        },
    //     computed:{
    //         ...mapState('admin',[
    //             'activeIndex',    //:default-active="activeIndex"当我们更改打开页面时侧边栏也会跟着更改
    //             'openIndex',
    //             'tabList',
    //             // 'user'
    //         ])
    //     },
        methods:{
    //         ...mapMutations('admin',['set_activeIndex','add_openIndex','delete_openIndex']),
    //         ...mapActions('admin',['get_user','get_newsList','get_reviewNewsList']),
            //选择侧边栏
            handleSelect(key) {
                this.activeIndex=key;
            },
    //         //更改当前打开的页面
    //         choseItem(id){
    //             this.set_activeIndex(id);   //更改当前打开的页面
    //         },
    //         //删除查看列表
    //         delItem(id){
    //             this.delete_openIndex(id)
    //         },
    //         //退出登录
    //         handleCommand(command) {
    //             console.log('click on item ' + command);
    //             this.$router.push('/login');
    //         }
        },
        watch:{
            //监视activeIndex，当active变化时，获取当前打开的tab信息，并赋给组件
            activeIndex:function (val) {
                let item=this.map.filter(function (item){
                    return item.id===val
                })
                // const str=item1[0].sign
                // console.log(val);
                this.componentId=item[0].sign;
            }
        },
    }
</script>

<style scoped lang="scss" type="text/scss">
    #admin{
        display: flex;
        .right{
            flex: 1;    //flex:1使元素自适应剩余部分
            background-color: white;
            .topNav{
                display: flex;
                justify-content: space-between;
                height: 45px !important;
                img{
                    height: 25px;
                    width: auto;
                }
                .userImg{
                    height: 30px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
                span{
                    display: inline-block;
                    color: black;
                    margin-right: 15px;
                    vertical-align: middle;
                }
            }

            .tabBtn,.topNav{
                box-sizing: border-box;
                width: 100%;
                padding: 5px 20px 5px 5px;
                box-shadow: 0px 2px 5px #e7e7e7;
            }
            .tabBtn{
                height: 40px;
                button{
                    background-color: white;
                    height:30px;
                    border: 1px solid #e7e7e7;
                    margin-right: 5px;
                    top: 50%;
                    transform:translateY(-50%);
                    position: relative;
                    img{
                        vertical-align:middle ;
                    }
                }
                .active{
                    background-color: #42b983;
                    color: white;
                }
            }
            .tabItem{
                padding: 5px;
            }

        }

        .sideBar{
            .sigh{
                height: 100px;
                border-bottom: 2px solid #34bfa3;
                position: relative;
                img{
                    border-radius: 50%;
                    height: 60px;
                    width:60px;
                    top:0;
                    bottom:0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    position: absolute;
                }
            }
            .el-menu{
                height: 750px;
            }
            .el-menu-vertical-demo:not(.el-menu--collapse) {
                width: 200px;
                min-height: 400px;
            }
            /*.el-menu,.el-menu-item-group{*/
            /*background-color: rgb(48, 65, 86);*/
            /*}*/
            .el-menu-item:hover{
                background-color:#263445!important;
            }
            ::v-deep .el-submenu__title:hover{
                background-color:#263445!important;
                /*color: white;*/
            }
            /*/deep/.el-submenu__title,.el-menu-item{*/
            /*color: white;*/
            /*}*/
        }
    }

</style>