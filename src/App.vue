<template>
  <div>
    <Header></Header>
    <!-- 路由組件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home, Search顯示，在Login, Register隱藏 -->
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // App組件為第一個執行的組件，一掛載完畢，馬上向服務器發請求
    // 通過Vuex發請求，獲取數據，存儲於倉庫當中
    // 如此後面執行TypeNav時就可以直接從$store中獲取數據，以性能角度來說，不用頻繁的發出請求
    this.$store.dispatch("categoryList");
  },
};
</script>

<style></style>
