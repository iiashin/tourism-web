<template>
    <div id="footer">
        <!-- <img src="../assets/author.jpg" alt=""> -->
        <div class="msg">
            <p>广州越秀 版权所有 Copyright © 2022</p>
            <p> 制作人:柳泽绵 https://github.com/iiashin</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped lang="scss" type="text/scss">
    #footer{
        height: 90px;
        background-color: #1ba9ba;
        margin-top: 15px;
        min-width:1300px;
        padding:10px 10%;
        box-sizing: border-box;  /*防止padding扩充了大小*/
        display: flex;
        width: 100%;
        /*justify-content: space-between;*/
        .msg{
            width: 100%;
            color: white;
            font-size: 10px;
            position: relative;
            margin-left: 40px;
            text-align: center;
        }
    }
</style>