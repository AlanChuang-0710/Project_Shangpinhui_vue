import { reqAddressInfo, reqOrderInfo } from "@/api";

const actions = {
    // 獲取用戶地址
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit("GETUSERADDRESS", result.data);
        } else {
            return Promise.reject("Something is wrong!")
        }
    },
    // 獲取商品清單
    async getOrder({ commit }) {
        let result = await reqOrderInfo();
         if (result.code == 200) {
            commit("GETORDER", result.data)
        }
    }
};

const mutations = {
    GETUSERADDRESS(state, info) {
        state.address = info.deliveryAddress;
    },
    GETORDER(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};

const state = {
    address: [],
    orderInfo: {}
};

const getters = {

};

export default {
    actions,
    mutations,
    state,
    getters
}