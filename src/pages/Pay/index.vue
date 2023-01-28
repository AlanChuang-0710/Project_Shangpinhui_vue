<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">訂單提交成功，請您及時付款，以便儘快為您發貨~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">
            請您在提交訂單<em class="orange time">4小時 </em>之內完成支付，超時訂單會自動取消。訂單號：
            <em>{{ orderId }}</em></span
          >
          <span class="fr"
            ><em class="lead">應付金額：</em><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要說明：</h4>
        <ol>
          <li>尚品匯商城支付平臺目前支持<span class="zfb">支付寶</span>支付方式。</li>
          <li>其它支付管道正在調試中，敬請期待。</li>
          <li>為了保證您的購物支付流程順利完成，請保存以下支付寶資訊。</li>
        </ol>
        <h4>支付寶帳戶資訊：（很重要，<span class="save">請保存！！！</span>）</h4>
        <ul>
          <li>支付帳號：11111111</li>
          <li>密碼：111111</li>
          <li>支付密碼：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平臺</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="@/assets/pay2.jpg" /></li>
            <li><img src="@/assets/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付網銀</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="@/assets/pay10.jpg" /></li>
              <li><img src="@/assets/pay11.jpg" /></li>
              <li><img src="@/assets/pay12.jpg" /></li>
              <li><img src="@/assets/pay13.jpg" /></li>
              <li><img src="@/assets/pay14.jpg" /></li>
              <li><img src="@/assets/pay15.jpg" /></li>
              <li><img src="@/assets/pay16.jpg" /></li>
              <li><img src="@/assets/pay17.jpg" /></li>
              <li><img src="@/assets/pay18.jpg" /></li>
              <li><img src="@/assets/pay19.jpg" /></li>
              <li><img src="@/assets/pay20.jpg" /></li>
              <li><img src="@/assets/pay21.jpg" /></li>
              <li><img src="@/assets/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中國銀聯</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      payInfo: {},
      timer: "",
      payStatus: "",
    };
  },
  computed: {
    orderId() {
      return this.$route.query.orderId;
    },
  },
  mounted() {
    this.getPayInfo();
  },
  methods: {
    async getPayInfo() {
      let result = await this.$API.reqPayInfo(this.orderId);
      if (result.code == 200) {
        this.payInfo = result.data;
      }
    },
    async open() {
      // 生成二維碼
      let result = await QRCode.toDataURL(this.payInfo.codeUrl);
      this.$alert(`<img src=${result}>`, "請微信支付", {
        dangerouslyUseHTMLString: true,
        center: true,
        showCancelButton: true,
        cancelButtonText: "支付遇見問題",
        confirmButtonText: "已支付成功",
        showClose: false,
        beforeClose(action, instance, done) {
          // action為'confirm' || 'cancel'
          // instance為組件實例對象
          // done為用於關閉 MessageBox實例
          if (action == "cancel") {
            clearInterval(this.timer);
            this.timer = null;
            alert("請聯繫平臺管理員");
            done();
          } else {
            if (this.payStatus == 200) {
              clearInterval(this.timer);
              this.timer = null;
              done();
              this.$router.push("/paysuccess");
            }
          }
        },
      });
      // 如何知道支付成功還是失敗?????
      // 支付成功的話，路由跳轉；支付失敗的話，提示資訊
      if (!this.timer) {
        this.timer = setInterval(async () => {
          let result = await this.$API.reqPayStatus(this.orderId);
          if (result.code == 200) {
            // 1. 清除定時器
            clearInterval(this.timer);
            this.timer = null;
            // 2. 保存支付成功的狀態碼
            this.payStatus = result.code;
            // 3. 關閉彈出框
            this.$msgbox.close();
            // 4. 路由跳轉
            this.$router.push("/paysuccess");
          } else {
            alert("支付失敗");
            clearInterval(this.timer);
          }
        }, 2000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;
  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(@/assets/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微軟雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
