<template>
  <div class="register-container">
    <!-- 註冊內容 -->
    <div class="register">
      <h3>
        註冊新用戶
        <span class="go">我有帳號，去 <a href="login.html" target="_blank">登陸</a> </span>
      </h3>
      <div class="content">
        <label>手機號:</label>
        <input type="text" placeholder="請輸入你的手機號" v-model="phone" />
        <span class="error-msg">錯誤提示資訊</span>
      </div>
      <div class="content">
        <label>驗證碼:</label>
        <input type="text" placeholder="請輸入驗證碼" v-model="verification" />
        <button style="width: 100px; height: 38px" @click="getCode">獲取驗證碼</button>
        <span class="error-msg">錯誤提示資訊</span>
      </div>
      <div class="content">
        <label>登錄密碼:</label>
        <input type="password" placeholder="請輸入你的登錄密碼" v-model="password" />
        <span class="error-msg">錯誤提示資訊</span>
      </div>
      <div class="content">
        <label>確認密碼:</label>
        <input type="password" placeholder="請輸入確認密碼" v-model="password1" />
        <span class="error-msg">錯誤提示資訊</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="agree" />
        <span>同意協定並註冊《尚品匯使用者協議》</span>
        <span class="error-msg">錯誤提示資訊</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成註冊</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>關於我們</li>
        <li>聯繫我們</li>
        <li>聯繫客服</li>
        <li>商家入駐</li>
        <li>行銷中心</li>
        <li>手機尚品匯</li>
        <li>銷售聯盟</li>
        <li>尚品匯社區</li>
      </ul>
      <div class="address">地址：北京市昌平區宏福科技園綜合樓6層</div>
      <div class="beian">京ICP備19006430號</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: null,
      verification: "",
      password: "",
      // 確認密碼
      password1: null,
      agree: true,
    };
  },
  methods: {
    // 獲取驗證碼
    async getCode() {
      try {
        const { phone } = this;
        phone && (await this.$store.dispatch("getCode", this.phone));
        this.verification = this.$store.state.user.code;
      } catch (err) {
        console.log(err);
      }
    },
    async userRegister() {
      try {
        const { phone, verification, password, password1, agree } = this;
        if (phone && verification && password == password1 && agree == true) {
          await this.$store.dispatch("userRegister", { phone, verification, password });
          this.$router.push({ name: "Login" });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
