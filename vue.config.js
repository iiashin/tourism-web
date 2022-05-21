module.exports={
    lintOnSave:false,   //关闭eslint
    //解决跨域
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:8080/',
                changeOrigin:true,  //允许跨域
                ws: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}