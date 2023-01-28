// 需要對於axios進行二次封裝
import axios from "axios";

// 設定發送請求時，網頁上端會出現進度條
import nprogress from "nprogress";
import "nprogress/nprogress.css";

// 在當前模塊中引入store
import store from "@/store";

// 1. axios對象的方法 create 去創建一個axios實例
// 2. mockRequests就是axios 只不過稍微配置一下
const mockRequests = axios.create({
    // 配置對象
    // 基礎路徑，發請求的時候，路徑中會出現api
    baseURL: "/mock",
    timeout: 5000,
});

// 請求攔截器: 在發請求之前，請求攔截器可以在請求發出去之前做一些事情
// interceptors.request代表請求攔截器
mockRequests.interceptors.request.use((config) => {
    // config: 配置對象，對象裡面有一個屬性很重要，header請求頭
    // 進度條開始
    if (store.state.detail.uuid_token) {
        // 給請求頭添加一個字段(需與後端確認)
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    nprogress.start();
    return config;
});

// 響應攔截器
mockRequests.interceptors.response.use(
    (res) => {
        // 成功的回調函數，服務器響應數據回來以後，響應攔截器可以針對數據做一些處理
        nprogress.done();
        return (res.data);
    },
    () => {
        // 響應失敗的回調函數
        return Promise.reject(new Error("請求失敗"))
    });


// 對外暴露
export default mockRequests;