// home模塊小倉庫
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";

const actions = {
    async categoryList(context) {
        //通過api裡面的接口函數調用，向服務器發起請求，獲取服務器的數據
        //皆在await後邊的promsie對象，會直接將promiseResult當成返回值
        let result = await reqCategoryList();
        if (result.code == 200) {
            context.commit("CATEGORYLIST", result.data);
        }
    },
    async getBannerList(context) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            context.commit("BANNERLIST", result.data);
        }
    },
    async getFloorList(context) {
        let result = await reqFloorList();
        if (result.code == 200) {
            context.commit("FLOORLIST", result);
        }
    }
};

const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    FLOORLIST(state, floorList) {
        // ({ state } = floorList);
        state.floorList = floorList
    }
};

const state = {
    // state中數據默認初始值別蝦寫，需根據接口的返回值進行初始化
    categoryList: [],
    bannerList: [],
    floorList: []
};

const getters = {

};

export default {
    actions,
    mutations,
    state,
    getters
}