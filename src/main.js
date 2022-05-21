import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';

//按需引入组件
import { Button,Menu,MenuItem,Carousel,CarouselItem,Row,Col,Card,Pagination,Table,TableColumn,Dialog,Message,MessageBox,Submenu,MenuItemGroup,Input,Select,Option,Radio,Upload,Alert} from 'element-ui';

Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}

Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(Message)
Vue.use(TableColumn);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(Upload);
Vue.use(Alert);


Vue.prototype.$msgbox=MessageBox
Vue.prototype.$prompt=MessageBox.prompt;
Vue.prototype.axios=axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
