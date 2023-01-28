import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogout } from "@/api"
const actions = {
    // 獲取驗證碼
    // 異步異常捕獲理解: https://smartline.cc/error-catch/
    async getCode(context, phone) {
        let result = await reqGetCode(phone);
        // console.log(result); //模擬時 讓頁面看的到驗證碼
        if (result.code == 200) {
            context.commit("GETCODE", result.data);
            return "OK";
        } else {
            return Promise.reject(new Error("Something's wrong!"));
        }
    },
    // 用戶註冊
    async userRegister(context, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            // context.commit("GETCODE", result.data);
            return "OK"
        } else {
            return Promise.reject(new Error("Something's wrong"))
        }
    },
    // 用戶登入
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            localStorage.setItem("TOKEN", result.data.token);
            return "OK";
        } else {
            return Promise.reject(new Error("Something is wrong2!"));
        }

    },
    // 獲取登入成功用戶的數據
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("USERINFO", result.data);
            return "OK"
        } else {
            return Promise.reject(new Error("Something is wrong3!"))
        }
    },
    // 退出登陸
    async userLogout({ commit }) {
        // 通知服務器清除token
        let result = await reqUserLogout();
        if (result.code == 200) {
            // 清除本地存儲數據
            commit("USERLOGOUT");
            return "OK";
        } else {
            return Promise.reject(new Error("Something is wrong!"))
        }
    }
};

const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    USERLOGOUT(state) {
        // 清除本地數據
        state.userInfo = {};
        state.token = "";
        localStorage.removeItem("TOKEN");
    }
};

const state = {
    code: "",
    token: localStorage.getItem("TOKEN") || "",
    userInfo: {}
};

const getters = {

};

export default {
    actions,
    mutations,
    state,
    getters
}