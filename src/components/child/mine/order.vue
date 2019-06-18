<template>
  <div class="order">
    <div class="order-content">
      <div class="order-site">
        <button>
          <img src="https://rescs.bestcake.com\m-images\new-order\add-address-button.png" alt>选择/添加收货地址
        </button>
      </div>
      <div class="order-time">
        <div class="time-rq">
          <span>配送日期：</span>
          <span>请选择></span>
        </div>
        <div class="time-sj">
          <span>配送时间：</span>
          <span>请选择></span>
        </div>
        <div class="serve">
          <span>配送服务：</span>
        </div>
      </div>

      <div class="order-list">
        <div class="list-cont" v-for="(item,index) in list" :key="index">
          <div class="shop">
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
                    <i>x{{item.num}}</i>
                  </div>
                </div>
                <div class="info-price">￥{{item.price}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="discounts">
          <div class="discounts-type">选择生日牌></div>
        </div>
      </div>
      <div class="order-freight">
        <span>运费</span>
        <span>0.00</span>
      </div>
      <div class="order-else">
        <div class="else-lz">
          <span>添加蜡烛</span>
          <span>请选择></span>
        </div>
        <div class="else-cj">
          <span>添加餐具</span>
          <span>请选择></span>
        </div>
        <div class="else-bz">
          <span>备注</span>
          <span>请填写</span>
        </div>
      </div>
      <div class="order-kaque">
        <div class="kaque-ka">
          <span>代金卡</span>
          <span>未使用></span>
        </div>
        <div class="kaque-que">
          <span>优惠券：</span>
          <span>未使用></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Store from "storejs";
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    if (this.$route.params.id!=undefined) {
       this.$route.params.id.forEach(el => {
        Store.get("shopCart").list.forEach(ele => {
          if (ele.id == el) {
            this.list.push(ele);
          }
        });
      });
     
    } else {
      this.list.push(this.$store.state.detailsShop);
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin screen {
  height: r(100);
  line-height: r(100);
  background: #fff;
  font-size: r(26);
  padding-left: r(30);
  display: flex;
  justify-content: space-between;
  padding-right: r(30);
}
.order {
  background: rgb(247, 247, 247);
  padding: 0 r(25);
  .order-content {
    .order-site {
      background: #fff;
      button {
        margin: r(100) r(180);
        width: r(346);
        height: r(64);
        border-top-left-radius: r(30);
        border-top-right-radius: r(30);
        border-bottom-right-radius: r(30);
        border-bottom-left-radius: r(30);
        border: r(1) solid #02d4d7;
        outline: none;
        background: #fff;
        line-height: r(64);
        color: #02d4d7;
        img {
          width: r(18);
        }
      }
    }
    .order-time {
      background: rgb(247, 247, 247);
      .time-rq,
      .time-sj,
      .serve {
        @include screen();
        span {
          &:nth-child(2) {
            color: #777;
          }
        }
      }
      .time-sj,
      .serve {
        margin-top: r(2);
      }
    }
    .order-list {
      margin-top: r(30);
      .list-cont {
        background: #fff;

        .shop {
          margin-bottom: r(1);
          overflow: hidden;
          padding-bottom: r(30);
          margin-left: r(30);
          .shop-right {
            padding-top: r(30);
            float: left;

            .shop-img {
              float: left;
              margin-right: r(30);
              img {
                width: r(150);
              }
            }
            .shop-info {
              float: left;
              .info-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: r(36);
                width: r(450);
                font-size: r(32);
                font-weight: bold;
              }
              .info-math {
                overflow: hidden;
                margin: r(10) 0;
                .math-size {
                  color: #ccc;
                  float: left;
                }
                .math-add {
                  float: right;
                  i {
                    font-size: r(28);
                    margin: 0 r(25);
                  }
                }
              }
              .info-price {
                font-weight: bold;
                color: red;
              }
            }
          }
        }
      }
      .discounts {
        overflow: hidden;
        background: #fff;
        border-top: r(1) solid rgb(231, 229, 229);
        .discounts-type {
          margin: r(25) 0;
          margin-right: r(10);
          font-size: r(32);

          float: right;
          color: #888;
        }
      }
    }
    .order-freight {
      margin: r(30) 0;
      @include screen();
      span {
        &:nth-child(2) {
          color: #777;
        }
      }
    }
    .order-else {
      .else-lz,
      .else-cj,
      .else-bz {
        margin-top: r(2);
        @include screen();
        span {
          &:nth-child(2) {
            color: #777;
          }
        }
      }
    }
    .order-kaque {
      margin-top: r(30);
      .kaque-ka,
      .kaque-que {
        @include screen();
        span {
          &:nth-child(2) {
            color: #777;
          }
        }
      }
    }
  }
}
</style>
