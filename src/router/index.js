// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
// 使用插件
Vue.use(VueRouter);

// 引入路由組件
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import Paysuccess from "@/pages/PaySuccess";

// 先把VueRouter原型對象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
    // 需要保證上下文還是VurRouter上下文
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

// 配置路由
let router = new VueRouter({
    mode: "hash",
    routes: [
        {
            name: "Login",
            path: "/login",
            component: Login,
            meta: {
                footerShow: false
            }
        },
        {
            name: "Register",
            path: "/register",
            component: Register,
            meta: {
                footerShow: false
            }
        },
        {
            name: "Home",
            path: "/home",
            component: Home,
            meta: {
                footerShow: true
            }
        },
        {
            name: "Search",
            //佔位符後的問號 代表可以傳params也可以不傳params
            path: "/search/:keyword?",
            // 向路由組件傳遞參數寫法一: 將params以props型式傳入組件
            // props: true,
            // 向路由組件傳遞參數寫法二: 函數寫法 將params, query以props型式傳入組件
            // props($route) {
            //     return { keyword: $route.params.keyword, k: $route.query.k };
            // },
            component: Search,
            meta: {
                footerShow: true
            }
        },
        {
            name: "AddCartSuccess",
            path: "/addcartsuccess",
            component: AddCartSuccess,
            meta: {
                footerShow: true
            }
        },
        {
            name: "Detail",
            path: "/detail/:skuid",
            component: Detail,
            meta: {
                footerShow: true,
            }
        },
        {
            name: "ShopCart",
            path: "/shopcart",
            component: ShopCart
        },
        {
            name: "Trade",
            path: "/trade",
            component: Trade,
            meta: {
                footerShow: true,
            },
            // 獨享路由守衛
            beforeEnter(to, from, next) {
                if (from.path == "/shopcart") {
                    next();
                } else {
                    next(false)
                }
            }
        },
        {
            name: "Pay",
            path: "/pay",
            component: Pay,
            meta: {
                footerShow: true
            },
            // 獨享路由守衛
            beforeEnter(to, from, next) {
                if (from.path == "/trade") {
                    next();
                } else {
                    next(false)
                }
            }
        },
        {
            name: "Paysuccess",
            path: "/paysuccess",
            component: Paysuccess,
            meta: {
                footerShow: true
            }
        },
        // 重定向，項目啟動被訪問時，立馬定向到首頁
        {
            path: "*",
            redirect: "/home"
        }
    ],
    scrollBehavior() {
        return { y: 0 };
    }
})

// 配置全局路由守衛
// 未登入禁止訪問: trade, pay, paysuccess 
router.beforeEach((to, from, next) => {
    // 登入情況
    if (store.state.user.token) {
        if (to.path == "/login" || to.path == "/register") {
            next(false);
        } else {
            next();
        }
    } else {
        // 未登入情況
        // 將想要去但沒去成的路由存儲起來
        let toPath = to.path;
        if (to.path == "/trade" || to.path.indexOf("/pay") != -1) {
            alert("親愛的顧客，煩請您先登入會員喔!")
            next("/login" + `?redirect=${toPath}`);
        } else {
            next();
        }
    }
})

export default router;