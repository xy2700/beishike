<template>
  <div class="cart">
    <div class="jiaru" v-show="sky">
      <div class="jiaru-cont">
        <div class="text">确定要清空购物车吗？</div>
        <div class="kang" @click="sky=false">取消</div>
        <div class="go" @click="confirm()">确定</div>
      </div>
    </div>
    <!-- 购物车为空时 -->
    <div class="cart-empty" v-if="this.$store.state.shopCart.list.length==0">购物车是空的哦~</div>
    <!-- 购物车内容 -->
    <div class="cart-list">
      <div class="list-cont" v-for="(item,index) in listCart" :key="index">
        <div class="shop">
          <div class="shop-left">
            <img
              src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
              alt
              @click="show(item.price,$event)"
              class="imgcar"
              :data-id="item.id"
            >
            <!-- <img src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" alt v-else @click="show(2,index)"> -->
          </div>
          <div class="shop-right">
            <div class="shop-img">
              <router-link :to="item.to">
                <img :src="item.url" alt>
              </router-link>
            </div>
            <div class="shop-info">
              <div class="info-name">{{item.name}}</div>
              <div class="info-math">
                <div class="math-size">{{item.size}}</div>
                <div class="math-add">
                  <span @click="push(item.id)">
                    <img src="https://res.bestcake.com\m-images\order\reduce-1.png" alt>
                  </span>
                  <i>{{item.num}}</i>
                  <span @click="sub(item.id)">
                    <img src="https://res.bestcake.com\m-images\order\add.png" alt>
                  </span>
                </div>
              </div>
              <div class="info-price">{{item.price}}.00</div>
            </div>
          </div>
        </div>
        <div class="discounts">
          <div class="discounts-type">优惠方式</div>
          <div class="discounts-cont">不参与活动</div>
        </div>
      </div>
    </div>
    <!-- 热卖商品 -->
    <div class="hot">
      <div class="hot-head">
        <div class="head-name">Hot &nbsp;Recommend</div>
        <div class="head-wire"></div>
        <div class="head-new">热销新品推荐</div>
      </div>
      <div class="hot-cont">
        <div class="cont-shop">
          <div class="shop-img">
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_sq.jpg" alt>
          </div>
          <div class="shop-info">伴手礼系列-吉致生巧</div>
          <div class="shop-price">
            <i>168.00</i>
            <span>/1盒</span>
          </div>
          <div class="shop-cart">
            <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
          </div>
        </div>
        <div class="cont-shop">
          <div class="shop-img">
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_nzt_v1.jpg" alt>
          </div>
          <div class="shop-info">伴手礼系列-吉致牛轧糖</div>
          <div class="shop-price">
            <i>68.00</i>
            <span>/16粒装</span>
          </div>
          <div class="shop-cart">
            <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
          </div>
        </div>
        <div class="cont-shop">
          <div class="shop-img">
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_pf_v1.jpg" alt>
          </div>
          <div class="shop-info">伴手礼系列-吉致泡芙</div>
          <div class="shop-price">
            <i>88.00</i>
            <span>/0.8磅</span>
          </div>
          <div class="shop-cart">
            <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算 -->
    <div class="compute">
      <div class="check">
        <img
          src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
          alt
          @click="zhon"
          class="quanxuan"
        >
      </div>
      <div class="quanxue">
        <span>全选</span>
      </div>
      <div class="empty" @click.prevent="empty">
        <a href>清空</a>
      </div>
      <div class="total">
        <div class="total-heji">
          <i>合计:</i>
          <span>{{total}}.00</span>
        </div>
        <div class="total-discounts">
          <i>已优惠</i>
          <span>0.00</span>
        </div>
      </div>
      <div class="btn" @click="bool">
        <a>结算</a>
      </div>
    </div>
    <mt-popup v-model="xuan">你还没有选中全部商品</mt-popup>
  </div>
</template>
<script>
import Store from "storejs";
export default {
  data() {
    return {
      listCart: [],
      total:0,
      bln: true,
      tabNam: 0,
      url1: "https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg",
      url2: "https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg",
      sky: false,
      xuan: false
    };
  },
  methods: {
    bool() {
      if (this.$store.state.isLogin) {
        if (this.$store.state.shopCart.list.length > 0) {
          var ids = [];
          $(".imgcar").each((index, ele) => {
            if ($(ele).attr("src") == this.url1) {
              ids.push(ele.getAttribute("data-id"));
            }
          });
          //跳转用户页
          this.$router.push({
            name: "order",
            params: {
              id: ids
            }
          });
        }
      } else {
        //显示登录页
        this.$eventHub.$emit("sub", { bools: true });
      }
    },
    getCart() {
      this.listCart = this.$store.state.shopCart.list;
       var totals = 0;
      this.$store.state.shopCart.list.forEach(ele => {
        totals += ele.price;
      });
      this.total=totals

    },
    push(id) {
      this.$store.commit("push", id);
    },
    sub(id) {
      this.$store.commit("sub", id);
    },
    show(price, e) {
      if (e.target.src == this.url1) {
        e.target.src = this.url2;
        this.total = this.total - price;
        this.$store.state.shopCart.N;
      } else {
        e.target.src = this.url1;
        this.total = this.total + price;
      }
      var cont = true;
      $(".imgcar").each((index, el) => {
        if (el.src == this.url2) {
          $(".quanxuan").attr("src", this.url2);
          cont = false;
          return;
        }
      });
      if (cont && $(".imgcar").length > 0) {
        $(".quanxuan").attr("src", this.url1);
      }
    },
    zhon(e) {
      if (e.target.src == this.url1) {
        e.target.src = this.url2;
        this.total = 0;
        $(".imgcar").each(function(index, el) {
          el.src = e.target.src;
        });
      } else {
        if ($(".imgcar").length > 0) {
          e.target.src = this.url1;
        }

        var n = 0;
        this.listCart.forEach(el => {
          n += el.price;
        });
        this.total = n;
        $(".imgcar").each(function(index, el) {
          el.src = e.target.src;
        });
      }
    },
    empty() {
      var con = true;
      $(".imgcar").each((index, ele) => {
        if (ele.src == this.url2) {
          this.xuan = true;
          con = false;
          setTimeout(() => {
          this.xuan = false;
      }, 800);
        }
           
      });
      if (con && $(".imgcar").length > 0) {
        this.sky = true;
      }
   
    },
    confirm() {
      this.$store.state.shopCart.list = [];
      this.$store.state.shopCart.N = 0;
      this.$store.state.totals = 0;
      this.listCart = [];
      Store.set("shopCart", { N: 0, list: [] });
      $(".quanxuan").attr("src", this.url2);
      this.sky = false;
    }
  },
  mounted() {
    this.getCart();
  },
  computed: {
    tal() {
      var totals = 0;
      this.$store.state.shopCart.list.forEach(ele => {
        totals += ele.price;
      });
      return totals;
    }
  },
  watch: {
    tal(newtotal, oldtotal) {
      this.total = newtotal;
      $(".imgcar").each((index, el) => {
        if (el.src == this.url2) {
          this.$nextTick(() => {
            var price = parseInt(
              $(el)
                .parents(".shop")
                .children(".shop-right")
                .children(".shop-info")
                .children(".info-price")
                .text()
            );

            this.total = this.total - price;
          });
        }
      });
    },
    total(newtotal,oldtotal){
     this.total=newtotal
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.cart {
  padding-bottom: r(210);
  .mint-popup {
    width: r(550);
    padding: r(60) r(60);
    font-size: r(32);
    text-align: center;
  }
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

        text-decoration: none;
        color: #02d3d6;
      }
    }
  }
  .cart-empty {
    height: r(120);
    line-height: r(120);
    text-align: center;
  }
  .cart-list {
    background: rgba(233, 231, 231, 0.3);
    .list-cont {
      background: #fff;
      margin-bottom: r(30);
      .shop {
        overflow: hidden;
        padding-bottom: r(30);
        .shop-left {
          float: left;
          margin: 0 r(30);
          img {
            width: r(38);
            margin-top: r(125);
          }
        }
        .shop-right {
          padding-top: r(30);
          float: left;

          .shop-img {
            float: left;
            margin-right: r(30);
            img {
              width: r(228);
            }
          }
          .shop-info {
            float: left;
            .info-name {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: r(36);
              width: r(366);
              font-size: r(32);
            }
            .info-math {
              overflow: hidden;
              margin: r(25) 0;
              .math-size {
                color: #ccc;
                float: left;
              }
              .math-add {
                float: right;
                span {
                  display: inline-block;
                  width: r(20);
                  img {
                    width: 100%;
                  }
                }
                i {
                  font-size: r(32);
                  margin: 0 r(25);
                }
              }
            }
            .info-price {
              font-weight: bold;
            }
          }
        }
      }
      .discounts {
        overflow: hidden;
        margin-left: r(92);
        border-top: r(3) solid rgb(231, 229, 229);
        .discounts-type {
          margin: r(25) 0;
          margin-right: r(10);
          font-size: r(32);
          font-weight: bold;
          float: left;
          color: red;
        }
        .discounts-cont {
          font-size: r(32);
          margin: r(25) 0;
          float: left;
        }
      }
    }
  }
  .hot {
    background: rgba(211, 208, 208, 0.3);
    padding-top: r(234);
    padding-left: r(27);

    .hot-head {
      font-weight: bold;
      .head-name {
        height: r(90);
        line-height: r(90);
        text-align: center;
        font-size: r(48);
      }
      .head-wire {
        width: r(410);
        background: #333;
        height: r(4);
        text-align: center;
        margin: auto;
      }
      .head-new {
        text-align: center;
        font-size: r(30);
        line-height: r(50);
      }
    }
    .hot-cont {
      overflow: hidden;
      .cont-shop {
        float: left;
        width: r(348);
        height: r(446);
        padding-right: r(12);
        padding-bottom: r(60);
        .shop-img {
          height: r(330);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .shop-info {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: bold;
          margin-bottom: r(18);
          margin-top: r(8);
          font-size: r(26);
        }
        .shop-price {
          float: left;
          i {
            font-weight: bold;
            color: #333;
          }
        }
        .shop-cart {
          float: right;
          width: r(45);
          height: r(40);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .compute {
    position: fixed;
    bottom: r(100);
    height: r(112);
    background: #fff;
    width: 100%;
    .check {
      float: left;
      margin-left: r(22);
      margin-right: r(10);
      img {
        width: r(40);
        height: r(40);
        margin-top: r(40);
        vertical-align: middle;
      }
      span {
      }
    }
    .quanxue {
      float: left;
      line-height: r(112);
      font-size: r(30);
      margin-right: r(30);
    }
    .empty {
      float: left;
      line-height: r(112);
      a {
        text-decoration: none;
        color: #333;
      }
    }
    .total {
      float: left;
      width: r(284);
      margin-top: r(20);
      margin-right: r(13);
      .total-heji {
        text-align: right;
        span {
          padding-right: r(30);
          font-size: r(36);
          color: red;
        }
      }
      .total-discounts {
        text-align: right;
        font-size: r(18);
        span {
          padding-right: r(30);
        }
      }
    }
    .btn {
      float: left;
      width: r(240);
      height: r(112);
      line-height: r(112);
      text-align: center;
      background: #02d4d7;
      color: #fff;
      font-size: r(36);
      font-weight: bold;
    }
  }
}
</style>