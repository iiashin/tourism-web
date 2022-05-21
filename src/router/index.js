import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import Admin from '../views/Admin.vue'
import Search from '../views/Search.vue'
Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path:'/home/:key',
    name:'Home',
    component: Home,
  },
  {
    path:'/detail/tourismDetail/:key',
    name:'Detail',
    component: Detail,
  },
  {
    path:'/admin',
    name:'Admin',
    component:Admin
  },
  {
    path:'/search/:cName',
    name:'Search',
    component:Search
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
