<template>
  <div class="mine">
    <!-- 退出 -->
    <div class="jiaru" v-show="jia">
      <div class="jiaru-cont">
        <div class="text">是否退出？</div>
        <div class="kang" @click="jia=false">取消</div>
        <div class="go" @click="quandin">
          <router-link to="/">确定</router-link>
        </div>
      </div>
    </div>
    <div class="mine-head">
      <div class="head-img">
        <img src="https://res.bestcake.com/m-images/order/mw-person-tx.png" alt>
      </div>
      <div class="head-name">{{$store.state.mine.username}}</div>
    </div>
    <div class="mine-info">
      <div class="info-a">
        <div class="top">会员等级</div>
        <div class="bottom">V0</div>
      </div>
      <div class="info-a">
        <div class="top">吉致币</div>
        <div class="bottom">0</div>
      </div>
      <div class="info-a">
        <div class="top">优惠券</div>
        <div class="bottom">0</div>
      </div>
      <div class="info-a">
        <div class="top">兑换券</div>
        <div class="bottom">0</div>
      </div>
    </div>
    <div class="mine-order">
      <div class="dindang">
        <i></i> 我的订单
      </div>
      <div class="dizhi">
        <i></i> 收货地址
      </div>
    </div>
    <div class="mine-tuichu" @click="tui">退出登录</div>
    <div class="mine-service">
      <p>客服热线：400-627-5757</p>
    </div>
    <div class="mine-protocol">
      <p>服务协议与证照信息</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jia: false
    };
  },
  mounted() {
    if ($.isEmptyObject(this.$store.state.mine)) {
      this.$router.push({
  	path:"/",
})
    }
  },
  methods: {
    tui() {
      this.jia = true;
    },
    quandin() {
      this.$store.state.isLogin = false;
      this.$store.state.mine = {};
    }
  }
};
</script>
<style lang="scss" scoped>
body {
  width: 100%;
  height: 100%;
  background: rgb(247, 247, 247);
  .mine {
    .jiaru {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(30, 28, 28, 0.8);
      z-index: 100;
      .jiaru-cont {
        width: r(580);
        background: #fff;
        position: absolute;
        left: 50%;
        top: 30%;
        transform: translateX(-50%) translateY(-30%);
        .text {
          margin: 0 r(48) r(114);
          padding-top: r(80);
          font-size: r(30);
          text-align: center;
        }
        .kang,
        .go {
          float: left;
          width: 50%;
          text-align: center;
          font-size: r(30);
          margin-bottom: r(30);
          color: #ccc;
        }
        .go {
          border-left: r(2) solid #ccc;
          a {
            text-decoration: none;
            color: #02d3d6;
          }
        }
      }
    }
    background: rgb(247, 247, 247);
    .mine-head {
      background: #fff;
      margin-top: r(80);
      .head-img {
        position: relative;
        height: r(190);
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: r(160);
        }
      }
      .head-name {
        text-align: center;
      }
    }
    .mine-info {
      background: #fff;
      display: flex;
      justify-content: space-around;
      text-align: center;
      padding: r(64) 0 r(30);
      .info-a {
        .top {
          color: #ccc;
        }
        .bottom {
          font-size: r(30);
        }
      }
    }
    .mine-order {
      margin-top: r(30);
      background: #fff;
      .dindang,
      .dizhi {
        font-size: r(32);
        line-height: r(50);
        margin-left: r(30);
        padding: r(30) 0;
      }
      .dizhi {
        border-top: r(1) solid #ccc;
      }
    }
    .mine-tuichu {
      margin-top: r(30);
      background: #fff;
      height: r(100);
      text-align: center;
      line-height: r(100);
      font-size: r(30);
      color: red;
    }
    .mine-service {
      margin-top: r(268);
      text-align: center;
      color: #999;
    }
    .mine-protocol {
      margin-top: r(74);
      text-align: center;
      padding-bottom: r(120);
      color: #999;
    }
  }
}
</style>