<template>
    <div id="adminAddTourism">
        <form method="post" enctype="multipart/form-data" action="/api/fileUpload" target="_blank">
            <label>旅行团标题:</label>
            <el-input placeholder="请输入标题" v-model="tName" clearable name="tName" />
            <br>
            <label>所在城市:</label>
            <br>
                <el-select v-model="value" placeholder="请选择" name="cId">
                    <el-option
                    v-for="item in citys"
                    :key="item.cId"
                    :label="item.cId"
                    :value="item.cName">
                    {{item.cName}}
                    </el-option>
                </el-select>
            <br>
            <label>是否长途游:</label>
            <br>
            <el-radio v-model="radio" label="1" name="isLong">是</el-radio>
            <el-radio v-model="radio" label="0" name="isLong">否</el-radio>
            <br>
            <label>旅游时长:</label>
            <el-input placeholder="请输入旅游时长(几天几夜)" v-model="toTime" clearable name="toTime" :disabled="isWrite" />
            <br>
            <label>目的城市:</label>
            <el-input placeholder="请输入目的城市" v-model="toCity" clearable name="toCity" :disabled="isWrite" />
            <br>
            <label>线路概览:</label>
            <el-input placeholder="请输入内容" v-model="tContent" type="textarea" clearable name="tContent" />
            <br>
            <label>负责人联系方式:</label>
            <el-input placeholder="请输入联系方式" v-model="tPhone" clearable name="tPhone" />
            <br>
            <label>价格:</label>
            <el-input placeholder="价格" v-model="tPrice" clearable name="tPrice" />
            <br>
            <label>上传旅游团封面:</label>
            <input type="file" name="file"/>
            <input type="hidden" name="tId" :value="lastIndex">
            <input type="submit" value="提交" class="submit" />
            若有线路概览贴图,请上传后再点提交
        </form>
        <el-upload
            action="http://localhost:8080/imageUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
// import func from 'vue-editor-bridge'
import {request} from "../../util/request";
export default {
    name:"adminAddTourism",
    data(){
        return{
            tName:'',
            tContent:'',
            tPhone:'',
            tPrice:'',
            value: '',
            toTime:'',
            isLong:'',
            citys:[],
            toCity:'',
            radio:'1',
            isWrite:false,
            dialogImageUrl: '',
            dialogVisible: false,
            lastIndex:'' //最新旅游团编号
        }
    },
    watch:{
        radio(newVal,oldVal){
            if(newVal==1){
                this.isWrite=false;
            }else
                this.isWrite=true;
        }
    },
    created(){
        this.axios.get('http://localhost:8080/selectCity').then(res=>{
            this.citys=res.data
        })
        this.axios.get('http://localhost:8080/getLastIdx').then(res=>{
            this.lastIndex=res.data.tId+1;
        })
    },
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>
<style lang="scss" scoped>
    #adminAddTourism{
        /deep/ input,label,select,option{
            display: inline-block;
            margin-bottom: 10px !important;
        }
        /deep/ textarea{
            margin-bottom: 10px !important;
        }
        .submit{
            // display: block;
            height: 35px;
            width: 100px;
            color: white;
            background-color: #42b983;
        }
    }
</style>