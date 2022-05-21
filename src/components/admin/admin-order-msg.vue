<template>
    <div>
        <el-table
                :data="orderList"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    prop="orderId"
                    label="订单Id">
            </el-table-column>
            <el-table-column
                    prop="tId"
                    label="出团Id">
            </el-table-column>
            <el-table-column
                    prop="dateTime"
                    label="出团时间">
            </el-table-column>
            <el-table-column
                    prop="userId"
                    label="用户Id">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:"adminOrderMsg",
    data(){
        return{
            orderList:[]
        }
    },
    methods:{
        getOrderList(){
            this.axios.get('/api/selOrder').then((res)=>{
                // console.log(res);
                this.orderList=res.data;
            })
        }
    },
    created(){
        this.getOrderList();
    }
}
</script>
<style lang="scss" scoped>
    
</style>