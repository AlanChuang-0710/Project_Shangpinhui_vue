// 當前這個模塊，API進行統一管理
import requests from "./request";
import mockRequests from "./mockAjax"

// 三級聯動 api/product/getBaseCategoryList get 無參數
// 發請求: axios發請求返回的結果是promise對象
export const reqCategoryList = () => requests({
    methods: "GET",
    url: "/product/getBaseCategoryList"
})

// 獲取banner(Home首頁輪播圖接口) 利用mock模擬的接口
export const reqGetBannerList = () => mockRequests.get("/banner");

// 獲取Floor組件的數據 利用mock模擬的接口
export const reqFloorList = () => mockRequests.get("/floor");

// 獲取search組件的數據 利用mock模擬的接口
// 接口: api/list 參數: 需帶參數 當前接口得傳遞給服務器一個默認參數 (至少是一個空對象)
export const reqGetSearchInfo = () => mockRequests.get("/search");

// 獲取產品詳細信息 利用mock模擬的接口
// 接口: api/item/{ skuId }
// 參數: 需帶參數
// 請求方式 get
export const reqGoodInfo = () => mockRequests.get("/detail");

// 將產品添加到購物車中，獲取更新某一個產品的個數
// 需要傳送兩個參數(skuId, skuNum)
// 方式為post
export const reqAddorUpdateShopCart = () => mockRequests.post("/cart/addToCart");

// 獲取購物車列表數據接口
// 接口: api/cart/cartList (此處使用mock.js)
// 方式為get
export const reqCartList = () => mockRequests.get("/cart/cartList");

// 刪除購物車產品的接口
// 接口: api/cart/deleteCart/{skuId}
// 方式為delete
export const reqDeleteCartById = () => mockRequests.delete("/cart/deleteCart");

// 修改購物車產品選中狀態
// 接口: api/cart/checkCart/{skuId}/{isChecked}
// 方式為get
export const reqUpdateCheckedById = () => mockRequests.get("/cart/checkCart");

// 獲取驗證碼接口
// 接口: api/user/passport/sendCode/{phone}
// 方式為get
export const reqGetCode = () => mockRequests.get("/user/passport/sendCode");

// 註冊
// 接口: user/passport/register
// 方式為post
export const reqUserRegister = () => mockRequests.post("/user/passport/register");

// 登入
// 接口: user/passport/login
// 方式: post
export const reqUserLogin = () => mockRequests.post("user/passport/login");

// 獲取用戶信息 (需要帶著用戶的token向服務器要數據)
// 接口: user/passport/auth/getUserInfo
// 方式: get
export const reqUserInfo = () => mockRequests.get("user/passport/auth/getUserInfo");

// 登出
// 接口: user/passport/logout
// 方式: get
export const reqUserLogout = () => mockRequests.get("user/passport/logout");

// 獲取用戶地址
// 接口: user/userAddress/auth/findUserAddressList
// 方式: get
export const reqAddressInfo = () => mockRequests.get("user/userAddress/auth/findUserAddressList");

// 獲取商品清單
// 接口: order/auth/trade
// 方式: get
export const reqOrderInfo = () => mockRequests.get("order/auth/trade");

// 提交訂單
// 接口: order/auth/submitOrder?tradeNo={tradeNo}
// 方式post
// export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "POST" }) 
export const reqSubmitOrder = () => mockRequests.post("order/auth/submitOrder");

// 訂單支付數據
// 接口: payment/weixin/createNative/{orderId}
// 方式: get
// export const reqPayInfo = (orderId) => requests({ url: `payment/weixin/createNative${orderId}`, data, method: "GET" }) 
export const reqPayInfo = () => mockRequests.post("payment/weixin/createNative/36");

// 訂單支付狀態
// 接口: payment/weixin/queryPayStatus/{orderId}
// 方式: get
// export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus${orderId}`, method: "GET" })
export const reqPayStatus = () => mockRequests.get("payment/weixin/queryPayStatus/36")