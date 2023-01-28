// search模塊小倉庫
import { reqGetSearchInfo } from "@/api";

const actions = {
    async getSearchList(context, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            context.commit("GETSEARCHLIST", result.data);
        }
    }
};

const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList.data;
    }
};

const state = {
    searchList: {},
};

// 項目當中，getters主要作用為簡化倉庫中的數據
// 可以把未來需要使用的數據簡化一下
// 函數注入"當前倉庫"的state，並非是大倉庫的state
const getters = {
    goodsList(state) {
        // 如果沒網的話，就不能發出請求，直接返回state.searchList會出現問題
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrs(state) {
        return state.searchList.attrsList;
    }
};

export default {
    actions,
    mutations,
    state,
    getters
}