<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分類</h2>
        <!-- 過度動畫 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch($event)">
              <div
                class="item"
                :class="{ cur: currentIndex == index }"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二級、三級 -->
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                          c2.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{
                            c3.categoryName
                          }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服裝城</a>
        <a href="###">美妝館</a>
        <a href="###">尚品匯超市</a>
        <a href="###">全球購</a>
        <a href="###">閃購</a>
        <a href="###">團購</a>
        <a href="###">有趣</a>
        <a href="###">秒殺</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// 按需引入throttle
import { throttle } from "lodash";

export default {
  name: "TypeNav",

  data() {
    return {
      // 存儲用戶鼠標移上哪一個一級分類
      currentIndex: -1,
      show: true,
    };
  },

  computed: {
    ...mapState({
      // 右側需要的是一個函數，當使用這個計算屬性時，右側函數立即執行一次
      // 注入一個參數state 其實即為大倉庫中的數據
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },

  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    leaveShow() {
      // 一級分類鼠標移出的事件回調
      // 鼠標移除，讓currentIndex 變為0 默認回到第一個item
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },

    enterShow() {
      this.show = true;
    },

    goSearch(event) {
      // 進行路由跳轉的方法
      // 最好的解決方案: 編成式導航 + 事件的委派
      // 利用事件的委派存在一些問題: 1.點擊的一定是a標籤 2.如何獲取參數
      // 第一個問題，靶子節點當中的a標籤加上自定義屬性data-categoryName，其餘的子節點是沒有的
      // 透過event.target獲得觸發該事件的節點(h3, a,dt,dl)帶有data-category屬性的節點必是a標籤
      // 節點帶有一dataset屬性，可以獲取節點的自定義屬性與屬性值
      // 注意: vue在解讀標籤上的動態屬性 data-XXX 時會將data移除並將XXX都化為小寫
      // 可以透過dataset讀取到data-XXX綁訂的這些屬性
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      if (categoryname) {
        // 整理路由跳轉的參數
        let location = { name: "Search" };
        let query = { categoryName: categoryname };
        // 一級分類、二級分類、三級分類的a標籤
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        // 判斷: 如果路由跳轉的時候，帶有params參數，稍帶傳遞過去
        if (this.$route.params && this.$route.name == "Home") {
          // 動態給location配置對象添加query屬性
          location.params = this.$route.params;
        }
        // 整理完參數
        location.query = query;
        this.$bus.$emit("removeBreadNav");
        this.$router.push(location);
      }
    },
  },

  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 525px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background-color: rgb(190, 235, 253);
        }
      }
    }

    // 過度動畫的樣式
    // 過度動畫開始狀態(進入)
    .sort-enter {
      height: 0;
    }

    // 過度動畫結束狀態(進入)
    .sort-enter-to {
      height: 525px;
    }

    // 定義動畫時間、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
