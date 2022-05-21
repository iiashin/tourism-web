<template>
    <div class="searchTop">
        <input type="text" v-model="key" @keyup.enter="searchArticle" :placeholder="cName?cName:'请输入搜索关键字'" />
        <button class="search" @click="searchArticle" >搜索</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            key:''
        }
    },
    props:['cName'],
    methods:{
        searchArticle(){
            this.$router.push(`/search/${this.key}`);
        }
    },

}
</script>
<style lang="scss" scoped>
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
</style>