<template>
    <div>
        <el-table
                :data="tourismList"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    prop="tId"
                    label="旅行团Id">
            </el-table-column>
            <el-table-column
                    prop="cName"
                    label="所在城市">
            </el-table-column>
            <el-table-column
                    prop="tName"
                    label="旅行团名称">
            </el-table-column>
            <el-table-column
                    prop="tPrice"
                    label="价格">
            </el-table-column>
            <el-table-column
                    prop="tContent"
                    label="行程内容">
            </el-table-column>
            <el-table-column
                    prop="tPhone"
                    label="联系方式">
            </el-table-column>
             <el-table-column  width="160"
                    prop="toTime"
                    label="长途游时长">
            </el-table-column>
             <el-table-column  width="160"
                    prop="toCity"
                    label="长途游到达城市">
            </el-table-column>
            <el-table-column label="操作"  width="250">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button  size="small" type="success" @click="openMsg(scope.row)">查看详情</el-button>
                    <el-button  size="small" type="primary" @click="openWrite(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="出团内容"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span v-if="choseId" v-html="$options.filters.wrap(tMsg)"></span>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改"
            :visible.sync="dialogVisible1"
            width="50%"
            :before-close="handleClose1">
            <label>旅行团标题:</label>
            <el-input placeholder="请输入标题"  clearable name="tName" v-model="tName" />
            <br>           
            <label>线路概览:</label>
            <el-input placeholder="请输入内容" type="textarea" clearable name="tContent" v-model="tContent" />
            <br>
            <label>负责人联系方式:</label>
            <el-input placeholder="请输入联系方式" clearable name="tPhone" v-model="tPhone" />
            <br>
            <label>价格:</label>
            <el-input placeholder="价格"  clearable name="tPrice" v-model="tPrice" />
            <br>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="reWrite()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"adminTourismMsg",
    data(){
        return{
            tourismList:[],
            dialogVisible:false,
            choseId:'',
            dialogVisible1:false, //修改界面
            msg:[],
            tName:'',
            tPrice:'',
            tContent:'',
            tPhone:'',
            tMsg:''
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
    methods:{
        getTourismList(){
            this.axios.get('/api/selAllTourism').then((res)=>{
                this.tourismList=res.data;
            })
        },
        //删除旅游团
        handleDelete(row){
            let tId=row.tId;
            let params={
                tId:tId
            }
            this.axios.get('/api/delTourism',{params}).then((res)=>{
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.tourismList=this.tourismList.filter(item=>{
                    return item.tId!=tId;
                })
            })
        },
        //打开详情界面
        openMsg(row){
            this.dialogVisible = true;
            this.choseId=row.tId;
            this.tMsg=this.tourismList.filter(item=>{
                return item.tId==this.choseId
            })[0].tContent
        },
        //打开修改界面
        openWrite(row){
            this.dialogVisible1 = true;
            this.choseId=row.tId;
            let params={
                tId:this.choseId
            }
            this.axios.get('http://localhost:8080/selTourismById',{
                params
            }).then(res=>{
                this.msg=res.data;
                this.tName=this.msg.tName;
                this.tPrice=this.msg.tPrice;
                this.tContent=this.msg.tContent;
                this.tPhone=this.msg.tPhone;
            })
        },
        //确认修改
        reWrite(){
            let params={
                tId:this.choseId,
                tName:this.tName,
                tPrice:this.tPrice,
                tContent:this.tContent,
                tPhone:this.tPhone
            }
            this.axios.get('http://localhost:8080/updateTourism',{
                params
            }).then(res=>{
               this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            })
            this.dialogVisible1 = false;
        },
        handleClose(){
            this.dialogVisible = false;
        },
        handleClose1(){
            this.dialogVisible1 = false;
        }
    },
    created(){
        this.getTourismList();
    }
}
</script>
<style lang="scss" scoped>
    /deep/.el-table .cell {
        white-space: nowrap!important;
    }

</style>