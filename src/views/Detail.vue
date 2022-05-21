<template>
    <div id="home">
        <home-header></home-header>
        <tourism-detail></tourism-detail>
    </div>
</template>
<script>
import homeContent from '../components/home/home-content.vue'
import HomeHeader from '../components/home-header.vue'
import tourismDetail from '../components/detail/tourism-detail.vue'
export default {
    components:{
        HomeHeader,
        homeContent,
        tourismDetail
    },
    data(){
        return{
            componentId:'tourismDetail'
        }
    },
    watch:{
        // '$route.params.key':function(newVal,oldVal) {     //不能用箭头函数，指向了父级作用域(watch)
        //     this.componentId=newVal;
        // }
    },
    created(){
        // this.componentId=this.$route.params.key;
    }
}
</script>
<style lang="scss">
    #content{
        min-width:1300px;
    }
</style>