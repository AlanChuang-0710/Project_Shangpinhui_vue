import { reqGoodInfo, reqAddorUpdateShopCart } from "@/api";
// 封裝臨時遊客身分模塊uuid 生成一個隨機字符串 (不能改變)
import { getUUID } from "@/utils/uuid_token";

const actions = {
    async goodInfo(context, skuid) {
        let result = await reqGoodInfo(skuid);
        if (result.code == 200) {
            context.commit("GETGOODINFO", result.data);
        }
    },
    async addOrUpdateShopCart(context, { skuNum, skuId }) {
        // 只傳遞數據與服務器，不需要在store中存儲數據，故不用mutations
        let result = await reqAddorUpdateShopCart(skuId, skuNum);
        // 使返回的promise的狀態改為成功或失敗
        if (result.code == 200) {
            return "";
        } else {
            // async內部函數return的返回值，會成為then方法回調函數的參數
            return Promise.reject(new Error("Something's wrong"))
        }
    },
};

const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo.data;
    }
};

const state = {
    goodInfo: {},
    uuid_token: getUUID(),
};

const getters = {
    categoryView(state) {
        // 若前方actions 沒有成功返回資料庫數據 則goodInfo.categoryView會是undefined，detail組件讀取categoryView時會報錯
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}
