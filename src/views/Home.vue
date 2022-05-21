<template>
    <div id="home">
        <home-header></home-header>
        <div id="content">
            <component :is="componentId"></component>
        </div>
        <home-footer></home-footer>
    </div>
</template>
<script>
import homeContent from '../components/home/home-content.vue'
import HomeHeader from '../components/home-header.vue'
import nearbyContent from '../components/home/nearby-content.vue'
import tourismContent from '../components/home/tourism-content.vue'
import userContent from '../components/home/user-content.vue'
import homeFooter from '../components/home-footer.vue'
import longContent from '../components/home/long-content.vue'
export default {
    components:{
        HomeHeader,
        homeContent,
        nearbyContent,
        tourismContent,
        userContent,
        homeFooter,
        longContent
    },
    data(){
        return{
            componentId:'homeContent'
        }
    },
    watch:{
        '$route.params.key':function(newVal,oldVal) {     //不能用箭头函数，指向了父级作用域(watch)
            this.componentId=newVal;
        }
    },
    created(){
        this.componentId=this.$route.params.key;
    }
}
</script>
<style lang="scss">
    #content{
        min-width:1300px;
    }
</style>