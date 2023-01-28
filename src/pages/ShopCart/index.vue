<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">單價（元）</div>
        <div class="cart-th4">數量</div>
        <div class="cart-th5">小計（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(good, index) in dataCartList" :key="good.id">
          <!-- 勾選商品 -->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="good.isChecked" @change="changeCheck($event, good)" />
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
            <a href="javascript:void(0)" class="mins" @click="changeNum('minus', good, $event)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="good.skuNum"
              minnum="1"
              class="itxt"
              @change="changeNum('manual', good, $event)" />
            <a href="javascript:void(0)" class="plus" @click="changeNum('plus', good, $event)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.skuNum * good.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGood(index)">刪除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAll" @change="changeAllChecked($event)" />
        <span>全選</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteSelected">刪除選中的商品</a>
        <a href="#none">移到我的關注</a>
        <a href="#none">清除下櫃商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已選擇 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>總價（不含運費） ： {{ total }}</em>
          <i class="summoney"></i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="$router.push('/trade')" style="cursor: pointer">結算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let defaultData = [
  {
    id: 1,
    userId: "2",
    skuId: 4,
    cartPrice: 5999,
    skuNum: 4,
    imgUrl: "https://cs-c.ecimg.tw/items/DYAJ951900AY6PN/000001_1652408338.jpg",
    skuName: "Apple iPhone 11 256GB 配置 6.1 吋 Liquid Retina HD 顯示器，讓成像更逼真生動",
    isChecked: 1,
    skuPrice: 5999,
  },
  {
    id: 2,
    userId: "2",
    skuId: 5,
    cartPrice: 2400,
    skuNum: 2,
    imgUrl: "https://cs-b.ecimg.tw/items/DYAN7O1900EZ21R/000001_1663554477.jpg",
    skuName: "Xiaomi 12X 8GB+256GB 6.28吋 兩年免費原廠保固 智慧型手機【小米官方旗艦店】",
    isChecked: 1,
    skuPrice: 2400,
  },
  // {
  //   id: 61,
  //   userId: "2",
  //   skuId: 1,
  //   cartPrice: 5999,
  //   skuNum: 4,
  //   imgUrl: "images/good1.jpg",
  //   skuName: "Apple iPhone 11 (A2223) 64GB 粉色 移動聯通電信雙卡雙待",
  //   isChecked: 1,
  //   skuPrice: 5999,
  // },
  // {
  //   id: 62,
  //   userId: "2",
  //   skuId: 2,
  //   cartPrice: 7200,
  //   skuNum: 1,
  //   imgUrl: "images/good2.jpg",
  //   skuName: "Apple iPhone 14 Pro 128GB 深紫黑",
  //   isChecked: 1,
  //   skuPrice: 7200,
  // },
  // {
  //   id: 63,
  //   userId: "2",
  //   skuId: 3,
  //   cartPrice: 6200,
  //   skuNum: 1,
  //   imgUrl: "images/good3.webp",
  //   skuName: "新增無線充電體驗 Sony Xperia 5 IV 6.1 吋 HDR OLED 螢幕 墨綠色",
  //   isChecked: 1,
  //   skuPrice: 6200,
  // },
];
export default {
  name: "ShopCart",
  data() {
    return {
      dataCartList: localStorage.getItem("dataCartList")
        ? JSON.parse(localStorage.getItem("dataCartList"))
        : defaultData,
    };
  },

  computed: {
    isAll() {
      return this.dataCartList.every((good) => good.isChecked);
    },
    total() {
      let total = 0;
      this.dataCartList.forEach((good) => {
        if (good.isChecked) total += good.skuNum * good.skuPrice;
      });
      return total;
    },
  },

  methods: {
    storeCart() {
      localStorage.setItem("dataCartList", JSON.stringify(this.dataCartList));
    },
    changeCheck(event, good) {
      good.isChecked = event.target.checked ? 1 : 0;
      this.storeCart();
    },
    changeAllChecked(event) {
      this.dataCartList.forEach((item) => (item.isChecked = event.target.checked ? 1 : 0));
      this.storeCart();
    },
    changeNum(type, good, event) {
      type == "minus" && good.skuNum > 1 ? good.skuNum-- : "";
      type == "plus" ? good.skuNum++ : "";
      if (!isNaN(event.target.value) && event.target.value > 1) {
        good.skuNum == event.target.value;
      } else if (isNaN(parseInt(event.target.value))) {
        good.skuNum == parseInt(event.target.value);
      } else {
        event.target.value = good.skuNum;
      }
      this.storeCart();
    },
    deleteSelected() {
      let dataCartList = [];
      this.dataCartList.forEach((good) => {
        if (!good.isChecked) {
          dataCartList.push(good);
        }
      });
      this.dataCartList = dataCartList;
      this.storeCart();
    },
    deleteGood(index) {
      this.dataCartList.splice(index, 1);
      this.storeCart();
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
