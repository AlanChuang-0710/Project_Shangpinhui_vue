import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 引入小倉庫
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

// 對外暴露
export default new Vuex.Store({

    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})

