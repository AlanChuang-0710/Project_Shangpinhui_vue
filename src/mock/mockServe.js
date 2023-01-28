// 先引入mockjs模塊
import Mock from "mockjs";
// 把JSON數據引入近來 (JSON數據格式根本沒有對外暴露，但是可以引入)
// webpack默認對外暴露的: 圖片、JSON數據格式、
import banner from "./banner.json";
import floor from "./floor.json";
import search from "./search.json";
import detail from "./detail.json";
import cartList from "./cartList.json";

// mock數據: 第一個參數:請求地址 第二個參數: 請求數據
Mock.setup({
    timeout: "200-600",
})
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
Mock.mock("/mock/search", { code: 200, data: search });
Mock.mock("/mock/detail", { code: 200, data: detail });
Mock.mock("/mock/cart/cartList", { code: 200, data: cartList });
Mock.mock("/mock/cart/addToCart", {
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
});
Mock.mock("/mock/cart/deleteCart", {
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
});
Mock.mock("/mock/cart/checkCart", {
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
});
Mock.mock("/mock/user/passport/sendCode", {
    "code": 200,
    "message": "成功",
    "data": Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10),
    "ok": true
});
Mock.mock("/mock/user/passport/register", {
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
});
Mock.mock("/mock/user/passport/login", {
    "code": 200,
    "message": "成功",
    "data": {
        "name": "Administrator",
        "nickName": "AlanChuang",
        "token": "90aa16f24d04c7d882051412f9ec45b",
    },
    "ok": true
});

Mock.mock("/mock/user/passport/auth/getUserInfo", {
    "code": 200,
    "message": "成功",
    "data": {
        "name": "Alan",
        "level": "VIP",
        "email": "FakeAlan@gmail.com"
    },
    "ok": true
});

Mock.mock("/mock/user/passport/logout", {
    "code": 200,
    "message": "成功",
    "data": null,
    "ok": true
});

Mock.mock("/mock/user/userAddress/auth/findUserAddressList", {
    "code": 200,
    "message": "成功",
    "data": {
        "deliveryAddress": [
            {
                "id": 1,
                "userAddress": "台中市大里區中興路65巷35號",
                "userId": 6,
                "consignee": "Alan Chuang",
                "phoneNum": "09011111111",
                "isDefault": "1"
            }
            ,
            {
                "id": 2,
                "userAddress": "台南市永康區萬三興里永康路一段56號",
                "userId": 6,
                "consignee": "王大明",
                "phoneNum": "0912135698",
                "isDefault": "0"
            }
            ,
            {
                "id": 3,
                "userAddress": "新北市永和區民生南路一段35號",
                "userId": 6,
                "consignee": "張欣怡",
                "phoneNum": "0912135698",
                "isDefault": "0"
            },]
    },
    "ok": true
});

Mock.mock("/mock/order/auth/trade", {
    "code": 200,
    "message": "成功",
    "data": {
        "totalAmount": 28796,
        "userAddressList": [
            {
                "id": 2,
                "userAddress": "台中市大里區中興路65巷35號",
                "userId": 2,
                "consignee": "admin",
                "phoneNum": "0977645823",
                "isDefault": "1"
            }
        ],
        "tradeNo": "1b23c1efc8144bfc83e51807f4e71d3a",
        "totalNum": 6,
        "detailArrayList": [
            {
                "id": 1,
                "orderId": null,
                "skuId": 4,
                "skuName": "Apple iPhone 11 256GB 配置 6.1 吋 Liquid Retina HD 顯示器，讓成像更逼真生動",
                "imgUrl": "https://cs-c.ecimg.tw/items/DYAJ951900AY6PN/000001_1652408338.jpg",
                "orderPrice": 5999,
                "skuNum": 4,
                "hasStock": 1
            },
            {
                "id": 2,
                "orderId": null,
                "skuId": 5,
                "skuName": "Xiaomi 12X 8GB+256GB 6.28吋 兩年免費原廠保固 智慧型手機【小米官方旗艦店】",
                "imgUrl": "https://cs-b.ecimg.tw/items/DYAN7O1900EZ21R/000001_1663554477.jpg",
                "orderPrice": 2400,
                "skuNum": 2,
                "hasStock": 1
            }
        ]
    },
    "ok": true
});

Mock.mock("/mock/order/auth/submitOrder",
    {
        "code": 200,
        "message": "成功",
        "data": 36,   // orderId 
        "ok": true
    }
);

Mock.mock("/mock/payment/weixin/createNative/36",
    {
        "code": 200,
        "message": "成功",
        "data": {
            "codeUrl": "weixin://wxpay/bizpayurl?pr=P0aPBJK",
            "orderId": 36,
            "totalFee": 28796,
            "resultCode": "SUCCESS"
        },
        "ok": true
    }
);

Mock.mock("/mock/payment/weixin/queryPayStatus/36",
    {
        "code": 200,
        "message": "完成支付",
        "data": null,
        "ok": false
    }
)
