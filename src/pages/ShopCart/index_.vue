<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="good in cartList" :key="good.id">
          <!-- 勾選商品 -->
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="good.isChecked == 1"
              @change="updateChecked(good, $event)" />
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" />
            <div class="item-msg">{{ good.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.cartPrice }}.00</span>
          </li>
          <!-- 修改購物車數量 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, good)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="good.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value, good)" />
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, good)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.cartPrice * good.skuNum }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(good.id)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="cart-tool">
      <div class="select-all">
        <input @change="updateAllChecked" class="chooseAll" type="checkbox" :checked="isAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { throttle } from "lodash";
export default {
  name: "ShopCart",
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      let sum = 0;
      this.cartList.forEach((good) => (sum += good.cartPrice * good.skuNum));
      return sum;
    },
    // 判斷複選框是否勾選
    isAll() {
      return this.cartList.every((good) => good.isChecked == 1) && this.cartList.length !== 0;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 獲取用戶
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 注意此處將disNum定義為: 與服務器中紀錄的數量的差值。換句話說，如果用戶是手動輸入，則需要處理成用戶數量-服務器原本數量
    handler: throttle(async function (type, disNum, good) {
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          disNum = good.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = good.skuNum;
          } else {
            // 向服務器傳送差值
            disNum = parseInt(disNum) - good.skuNum;
          }
          break;
      }
      try {
        // 通知服務器修改數據 (post方法)
        await this.$store.dispatch("addOrUpdateShopCart", { skuid: good.id, skuNum: disNum });
        // 通知vuex去更新store數據庫中的數據 (因為數據來自服務器)
        this.getData();
      } catch (err) {
        console.log(err);
      }
    }, 200),
    // 刪除購物車某一產品
    async deleteCartById(goodId) {
      try {
        await this.$store.dispatch("deleteCartListBySkuId", goodId);
        this.getData();
      } catch (err) {
        console.log(err);
      }
    },
    // 修改產品選中狀態
    async updateChecked(good, event) {
      // event.target.checked 返回值為true 或 false
      try {
        await this.$store.dispatch("updateCheckedBySkuId", {
          skuId: good.id,
          isChecked: event.target.checked == true ? 1 : 0,
        });
      } catch (err) {
        console.log(err);
      }
      // 如果成功修改服務器數據，則再發請求更新vuex中的數據
      this.getData();
    },
    // 刪除所有選中的商品
    async deleteAllChecked() {
      // 派發一個action
      try {
        await this.$store.dispatch("deleteAllChecked");
        this.getData();
      } catch (err) {
        console.log(err);
      }
    },
    async updateAllChecked(event) {
      let checked = event.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("updateAllChecked", checked);
        this.getData();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
