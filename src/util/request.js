import axios from 'axios';
import qs from 'qs';
import Vue from "vue";
Vue.prototype.$qs = qs;

//实现写好后台服务器地址
let baseURL='http://localhost:8080/'

var instance=axios.create({
    baseURL:baseURL,
    timeout:30000
})

instance.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';

//response拦截器
instance.interceptors.response.use(
    response=>{
        const res=response.data;
        return Promise.resolve(res)
    },
    error => {
        return Promise.reject(error)
    }
)
//出口方法
export const request = async (url = '', type = 'GET', data = {})=>{
    let result;
    type = type.toUpperCase();
    let requestOptions = {
        method: type,
        url: url
    }
    if(type==='GET'){
        requestOptions['params']=data;
    }
    else{
        requestOptions['data']=qs.stringify(data);
    }
    await instance(requestOptions).then((res)=>{
        result=res;
    })
    return result;
}