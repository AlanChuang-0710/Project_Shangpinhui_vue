import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import store from "@/store";
import TypeNav from "@/components/TypeNav";
import Pagination from "@/components/Pagination";
// 引入 mockServer.js---mock數據
import "@/mock/mockServe"
// 引入 Swiper styles 因為許多組件都用到，故於入口文件引入
import 'swiper/css/swiper.css';
// 統一引入接口api文件中所有的請求 (與$bus同理)
import * as API from "@/api";
// 引入elementUI
import { MessageBox } from 'element-ui';

// 將三級聯動註冊為全局組件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
Vue.config.productionTip = false

// elementUI 註冊組件兩種方法之一
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  }
}).$mount('#app')
