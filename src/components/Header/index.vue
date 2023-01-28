<template lang="">
  <header class="header">
    <!-- 頭部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品匯歡迎您！</p>
          <p v-if="!userName">
            <span>請</span>
            <router-link to="/login">登錄</router-link>
            <router-link to="/register" class="register">免費註冊</router-link>
          </p>
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="logout">退出登入</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的訂單</a>
          <a href="###">我的購物車</a>
          <a href="###">我的尚品匯</a>
          <a href="###">尚品匯會員</a>
          <a href="###">企業採購</a>
          <a href="###">關注尚品匯</a>
          <a href="###">合作招商</a>
          <a href="###">商家後臺</a>
        </div>
      </div>
    </div>
    <!--頭部第二行 搜索區域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品匯">
          <img src="@/assets/logo.png" alt="尚品匯Logo" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input v-model="keyword" type="text" id="autocomplete" class="input-error input-xxlarge" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
  methods: {
    goSearch() {
      // 搜索按鈕的回調函數，需要向search路由進行跳轉

      // 寫法一: 字串寫法
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword}`);

      // 向路由組件傳參的方法二: 對象寫法
      // 注意對象寫法不能寫path 只能寫路由組件的name
      this.$router.push({
        name: "Search",
        params: {
          keyword: this.keyword || undefined,
        },
        query: this.$route.query,
      });
      this.$bus.$emit("addBreadNav", this.keyword);
    },
    async logout() {
      // 1. 發請求給服務器，清除一些數據
      // 2. 清除項目中的數據(userInfo, token)
      try {
        await this.$store.dispatch("userLogout");
        this.$router.push({ name: "Home" });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
    // 獲取用戶資訊 首頁展示
    if (this.$store.state.user.token) {
      this.$store.dispatch("getUserInfo");
    }
  },
  beforeDestroy() {
    this.$bus.$off;
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
