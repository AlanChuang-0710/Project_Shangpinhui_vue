<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner輪播-->
        <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in bannerList" :key="carousel.id">
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分頁器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要導航按鈕 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品匯快報</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>備戰開學季 全民半價購數碼</li>
            <li><span class="bold">[公告]</span>備戰開學季 全民半價購數碼</li>
            <li><span class="bold">[特惠]</span>備戰開學季 全民半價購數碼</li>
            <li><span class="bold">[公告]</span>備戰開學季 全民半價購數碼</li>
            <li><span class="bold">[特惠]</span>備戰開學季 全民半價購數碼</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">電話費</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">機票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">電影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">遊戲</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火車票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">眾籌</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理財</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">禮品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白條</span>
          </li>
        </ul>
        <div class="ads">
          <img src="images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
export default {
  name: "ListContainer",

  computed: {
    ...mapState({ bannerList: (state) => state.home.bannerList }),
  },

  mounted() {
    this.$store.dispatch("getBannerList");
    // new Swiper實例之前，頁面中結構必須得有，但在此處new Swiper是錯誤的，
    // 因為dispatch當中涉入異步語句，導致v-for遍歷的時候，結構還沒有完全
  },

  watch: {
    // 監聽bannerList數據的變化，因為這條數據發生過變化--由空數組變為數組裡有四個元素
    // 如果執行handler方法，代表組件實例身上這個屬性已經有了 數組:四個元素
    // 當前這個函數執行: 只能保證bannerList數據已經有了，但是沒辦法保證v-for已經執行結束了
    // v-for執行完畢後，才會有結構

    // nextTick: 在下次DOM更新循環結束之後，執行延遲回調 。 在修改數據之後立即使用這個方法，獲取更新DOM
    bannerList: {
      handler() {
        // 當執行回調函數的時候: 保證服務器數據回來了 v-for也執行完畢了(輪播圖結構也有了)
        this.$nextTick(() => {
          let mySwiper = new Swiper(".swiper-container", {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
          return mySwiper;
        });
      },
    },
  },
};
</script>

<style lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 525px;
      padding: 5px;
      float: left;
      img {
        width: 100%;
        height: 520px;
        object-fit: cover;
      }
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(@/assets/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
