<template>
    <div>
        <el-table
                :data="userList"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    prop="useId"
                    label="用户Id">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系方式">
            </el-table-column>
            <!-- <el-table-column label="操作"  width="80">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>
<script>
export default {
    name:"adminUserMsg",
    data(){
        return{
            userList:[]
        }
    },
    methods:{
        getUserList(){
            this.axios.get('/api/selectAllUser').then((res)=>{
                // console.log(res);
                this.userList=res.data;
            })
        }
    },
    created(){
        this.getUserList();
    }
}
</script>
<style lang="scss" scoped>
    
</style>