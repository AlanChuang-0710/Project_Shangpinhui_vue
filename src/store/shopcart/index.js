import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api/index";
const actions = {
    // 獲取購物車列表數據
    async getCartList(context) {
        try {
            let result = await reqCartList();
            if (result.code == 200) {
                context.commit("GETCARTLIST", result.data)
            }
        } catch (err) {
            console.log(err);
        }
    },
    // 刪除購物車某產品
    async deleteCartListBySkuId(context, skuId) {
        try {
            let result = await reqDeleteCartById(skuId);
            if (result.code == 200) {
                return "OK";
            }
        } catch (err) {
            console.log(err);
        }
    },
    // 修改購物車產品選中的狀態
    async updateCheckedBySkuId(context, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return "";
        } else {
            return Promise.reject(new Error("failure"))
        }
    },
    // 刪除全部勾選的產品
    deleteAllChecked(context) {
        // context就是小倉庫(具有dispatch, commit, getters, mutations)
        let promiseAll = [];
        context.getters.cartList.forEach((good) => {
            let promise = good.isChecked ? context.dispatch("deleteCartListBySkuId", good.skuId) : ""
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    },
    // 全選/全不選
    updateAllChecked(context, checked) {
        let promiseAll = [];
        context.getters.carList.forEach((good) => {
            let promise = context.dispatch("updateCheckedBySkuId", { skuId: good.skuId, isChecked: checked })
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList.data;
    }
};

const state = {
    cartList: [],
};

const getters = {
    cartList(state) {
        return state.cartList || []
    }
};

export default {
    actions,
    mutations,
    state,
    getters
}