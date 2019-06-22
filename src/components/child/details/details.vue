<template>
  <div class="details">
    <!-- 加入购物车 -->
    <div class="jiaru" v-show="jia">
      <div class="jiaru-cont">
        <div class="text">成功添加到购物车</div>
        <div class="kang" @click="jia=false">再看看</div>
        <div class="go">
          <router-link to="/cart">去结算</router-link>
        </div>
      </div>
    </div>
    <!-- 更多商品 -->
    <div class="shop">
      <router-link to="/classify/self">更多商品</router-link>
    </div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in 4" :key="index">
        <img :src="host+name+'/'+name+'-'+(index+1)+'.jpg?v=20170607'" alt v-if="name!=''">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 商品名称 -->
    <div class="details-name">{{name}}</div>
    <!-- 商品类型 -->
    <div class="details-type"></div>
    <!-- 商品信息 -->
    <div class="details-info">
      <div class="info-a">
        <div class="info-left">甜度</div>
        <div class="info-right">
          <img :src="sweeturl+info.sweet+'.png'" alt v-if="info.sweet">
        </div>
      </div>
      <div class="info-b">
        <div class="info-left">口味</div>
        <div class="info-right">{{info.CategoryName}}</div>
      </div>
      <div class="info-c">
        <div class="info-left">原材料</div>
        <div class="info-right">{{info.Resource}}</div>
      </div>
      <div class="info-d">
        <div class="info-left">适合人群</div>
        <div class="info-right">{{info.tips}}</div>
      </div>
      <div class="info-e">
        <div class="info-left">保鲜条件</div>
        <div class="info-right">{{info.KeepFresh}}</div>
      </div>
    </div>
    <!-- 商品评价 -->
    <div class="evaluate" @click="comment">
      <div class="evaluate-left">
        <div class="left">
          <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png" alt>
        </div>
        <div class="right">商品评价</div>
      </div>
      <div class="evaluate-right">
        <div class="right">
          <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-b.png" alt>
        </div>
        <div class="left">({{count}}条)</div>
      </div>
    </div>
    <!-- 商品重量或口味 -->
    <div class="weight">
      <div class="weight-top">
        <div
          class="top-a"
          v-for="(item,index) in size"
          :key="index"
          @click="select(index,item)"
          :class="{'top-select':index==tabNum}"
          :data-id="item.id"
        >{{item.size}}</div>
      </div>
      <div class="weight-bottom">
        <div class="bottom-a" v-if="configsize">
          <div class="a-img">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png?v=112" alt>
          </div>
          <div class="a-con">{{configsize}}</div>
        </div>
        <div class="bottom-b" v-if="configpeople">
          <div class="a-img">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png" alt>
          </div>
          <div class="a-con">{{ configpeople}}</div>
        </div>
        <div class="bottom-c" v-if="configware">
          <div class="a-img">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png" alt>
          </div>
          <div class="a-con">{{configware}}</div>
        </div>
        <div class="bottom-d" v-if="configtips">
          <div class="a-img">
            <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png" alt>
          </div>
          <div class="a-con">{{configtips}}</div>
        </div>
      </div>
    </div>
    <!-- 购买数量 -->
    <div class="math">
      <div class="math-left">购买数量</div>
      <div class="math-right">
        <span @click="push">
          <img src="https://res.bestcake.com/m-images/ww/detail/reduce-0.png" alt>
        </span>
        <i>{{num}}</i>
        <span @click="sub">
          <img src="https://res.bestcake.com/m-images/ww/detail/add.png" alt>
        </span>
      </div>
    </div>
    <!-- 立即购买 -->
    <div class="purchase">
      <div class="purchase-a">
        <p>{{num*info.price}}.00</p>
        <p>
          已优惠：
          <span>0.00</span>
        </p>
      </div>
      <div class="purchase-c" @click="bool">立即购买</div>
      <div class="purchase-b" @click="tianjia">加入购物车</div>
    </div>
    <!-- 加载时 -->
    <div class="ico" v-if="bln">
      <img src="https://res.bestcake.com/images/loading.gif" alt>
    </div>

    <price-description></price-description>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 1,
      id: 0,
      count: 0,
      sweeturl: "https://res.bestcake.com/m-images/ww/jz/tiandu_",
      host: "",
      name: "",
      size: [],
      configsize: "",
      configpeople: "",
      configware: "",
      configtips: "",
      config: [
        {
          size: "13.5*13.5cm",
          people: "适合4-5人分享",
          ware: "含五人份餐具",
          tips: "至少需提前一天预约"
        },
        {
          size: "17*17cm",
          people: "适合8-10人分享",
          ware: "含十人份餐具",
          tips: "至少需提前一天预约"
        },
        {
          size: "21*21cm",
          people: "适合12-15人分享",
          ware: "含十五人份餐具",
          tips: "至少需提前一天预约"
        },
        {
          size: "27*40.5cm",
          people: "适合35-40人分享",
          ware: "含四十人份餐具",
          tips: "至少需提前一天预约"
        }
      ],
      tabNum: 0,
      bln: true,
      list: [],
      info: {},
      item: "",
      jia: false
    };
  },
  methods: {
    bool() {
      if (this.$store.state.isLogin) {
        var ts = document.querySelector(".top-select");
        var data = {
          id: ts.getAttribute("data-id"),
          name: this.name,
          eName: "",
          num: this.num,
          price: this.num * this.info.price,
          oldprice: this.info.price,
          size: ts.innerText,
          url: this.host + this.name + "/" + this.name + "-" + 1 + ".jpg",
          to: this.$route.path
        };
        this.$store.state.detailsShop=data
        this.$router.push({
          name: "order",
        });
      } else {
        this.$eventHub.$emit("sub", { bools: true });
      }
    },
    app() {
      this.$eventHub.$emit("ss", { bool: true });
    },
    // 评论
    GetSumAndAvgAccessInfo(fn) {
      var data = {
        pid: this.id,
        c: "CakeAssess",
        m: "GetSumAndAvgAccessInfo",
        v: Number(new Date())
      };
      this.$apis.GetList(data).then(res => {
        this.count = res.data.Tag.count;
        //加载时
        this.bln = false;
      });
    },
    GetNSCakeByName(fn) {
      var data = {
        Name: this.$route.query.pname,
        c: "NsCakeCenter",
        m: "GetNSCakeByName",
        v: Number(new Date())
      };
      this.$apis.GetList(data).then(res => {
        if (res) {
          fn(res.data.Tag);
        }
      });
    },
    GetCakeByName(fn) {
      var data = {
        City: decodeURIComponent(sessionStorage.getItem("city")),
        ProName: this.$route.params.pname,
        c: "Product",
        m: "GetCakeByName",
        v: Number(new Date())
      };
      this.$apis.GetList(data).then(res => {
        fn(res.data.Tag);
      });
    },
    GetRuPCakeByName(fn) {
      var data = {
        Name: this.$route.query.pname,
        c: "NsCakeCenter",
        m: "GetRuPCakeByName",
        v: Number(new Date())
      };
      this.$apis.GetList(data).then(res => {
        fn(res.data.Tag);
      });
    },
    GetjzCakeInfo(fn) {
      var data = {
        City: decodeURIComponent(sessionStorage.getItem("city")),
        ProName: this.$route.params.pname,
        c: "IndexCenter",
        m: "GetjzCakeInfo",
        v: Number(new Date())
      };
      this.$apis.GetList(data).then(res => {
        fn(res.data.Tag);
      });
    },
    GetNS(fn) {
      this.host = "https://res.bestcake.com/m-images/ns-detail/";
      this.name = this.$route.query.pname;
      this.GetNSCakeByName(tag => {
        
          console.log(decodeURIComponent(sessionStorage.getItem("city")))
        if (tag) {
          tag.forEach(ele => {
            if (
              ele.City == decodeURIComponent(sessionStorage.getItem("city"))
            ) {
            
              this.id = ele.ID;
              //甜度
              this.info["sweet"] = ele.Sweet;
              //口味
              this.info["CategoryName"] = ele.CategoryName;
              //原材料
              this.info["Resource"] = ele.Resource;
              //保鲜条件
              this.info["KeepFresh"] =
                ele.KeepFresh == undefined
                  ? "最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。"
                  : ele.KeepFresh;

              //适合人群
              this.info["tips"] =
                JSON.parse(ele.Details)["details_tips"] == ""
                  ? "所有人群"
                  : JSON.parse(ele.Details)["details_tips"];
              this.info["price"] = ele.CurrentPrice;
              //磅
              this.size.unshift({ size: ele.Size, id: ele.ID, type: "ns" });
              var config = JSON.parse(ele.ProductConfig);
              this.configsize = config["pc"]["configsize"];
              this.configpeople = config["pc"]["configpeople"];
              this.configware = config["pc"]["configware"];
              this.configtips = config["pc"]["configtips"];

              this.list.push(ele);

              fn();
            }
          });
        } else {
          this.bln = false;
        }
      });
    },
    GetRuP(fn) {
      this.host = "https://res.bestcake.com/m-images/rp-detail/";
      this.name = this.$route.query.pname;
      this.GetRuPCakeByName(tag => {
        tag.forEach(ele => {
          if (ele.City == decodeURIComponent(sessionStorage.getItem("city"))) {
            this.id = ele.ID;
            //甜度
            this.info["sweet"] = ele.Sweet;
            //口味
            this.info["CategoryName"] = ele.CategoryName;
            //原材料
            this.info["Resource"] = ele.Resource;
            //保鲜条件
            this.info["KeepFresh"] = ele.KeepFresh;
            //适合人群
            this.info["tips"] = JSON.parse(ele.Details)["details_tips"];
            //数量

            this.size.unshift({ size: ele.Size, id: ele.ID, type: "rup" });
            this.info["price"] = ele.CurrentPrice;
            this.list.push(ele);

            fn();
          }
        });
      });
    },
    GetCak(fn) {
      this.host = "https://res.bestcake.com/m-images/jd-detail/";
      this.name = this.$route.params.pname;

      this.GetCakeByName(tag => {
        this.id = tag.infos.CakeType[0].Id;
        //甜度
        this.info["sweet"] = tag.infos.CakeType[0].Sweet;
        //口味
        this.info["CategoryName"] = tag.infos.CategoryName;
        //原材料
        this.info["Resource"] = tag.infos.Resourse;
        //保鲜条件
        this.info["KeepFresh"] = tag.infos.KeepFresh;
        //适合人群
        this.info["tips"] = JSON.parse(tag.Detail[0])["details_tips"];
        //磅
        tag.infos.CakeType.forEach(ele => {
          this.size.push({ size: ele.Size, id: ele.Id, type: "cak" });
        });
        this.configsize = this.config[0].size;
        this.configpeople = this.config[0].people;
        this.configware = this.config[0].ware;
        this.configtips = this.config[0].tips;
        this.list.push(tag.infos.CakeType);
        this.info["price"] = tag.infos.CakeType[0].CurrentPrice;

        fn();
      });
    },
    Getjz(fn) {
      this.host = "https://res.bestcake.com/m-images/jz-detail/";
      this.name = this.$route.params.pname;

      this.GetjzCakeInfo(tag => {
        this.id = tag[0].ID;
        //甜度
        this.info["sweet"] = tag[0].CakeType[0].Sweet;
        //口味
        this.info["CategoryName"] = tag[0].CategoryName;
        //原材料
        this.info["Resource"] = tag[0].Resourse;
        //保鲜条件
        this.info["KeepFresh"] = tag[0].KeepFresh;
        //适合人群
        this.info["tips"] = JSON.parse(tag[0].Details)["details_tips"];
        //磅

        tag[0].CakeType.forEach(ele => {
          this.size.push({ size: ele.KW, id: ele.Id, type: "jz" });
        });
        this.list.push(tag[0].CakeType);
        this.info["price"] = tag[0].CurrentPrice;
        this.configware = "至少2-4人分享";
        this.configtips = "至少需提前一天预约";

        fn();
      });
    },
    select(index, item) {
      this.tabNum = index;
      if (item.type == "ns") {
        this.list.forEach(ele => {
          if (ele.ID == item.id) {
            var config = JSON.parse(ele.ProductConfig);
            this.configsize = config["pc"]["configsize"];
            this.configpeople = config["pc"]["configpeople"];
            this.configware = config["pc"]["configware"];
            this.configtips = config["pc"]["configtips"];
            this.info["price"] = ele.CurrentPrice;
            this.num=1
          }
        });
      } else if (item.type == "jz") {
        this.list.forEach(ele => {
          if (ele.ID == item.id) {
            this.info["price"] = ele.CurrentPrice;
            this.num=1
          }
        });
      } else if (item.type == "cak") {
        this.list[0].forEach(ele => {
          if (ele.Id == item.id) {
            this.info["price"] = ele.CurrentPrice;
            this.num=1
          }
        });
        this.config.forEach((ele, ind) => {
          if (ind == index) {
            this.configsize = ele.size;
            this.configpeople = ele.people;
            this.configware = ele.ware;
            this.configtips = ele.tips;
            this.num=1
          }
        });
      } else {
        this.list.forEach(ele => {
          if (ele.ID == item.id) {
            this.info["price"] = ele.CurrentPrice;
            this.num=1
          }
        });
      }
    },
    comment() {
      this.$router.push({
        path: `/cake-assess/${this.id}`
      });
    },
    tianjia() {
      var ts = document.querySelector(".top-select");
      var data = {
        id: ts.getAttribute("data-id"),
        name: this.name,
        eName: "",
        num: this.num,
        price: this.info.price*this.num,
        oldprice: this.info.price,
        size: ts.innerText,
        url: this.host + this.name + "/" + this.name + "-" + 1 + ".jpg",
        to: this.$route.path
      };
      this.jia = true;
      this.$store.commit("add", data);
    },
    push() {
      this.num--;
      if (this.num == 0) {
        this.num = 1;
        return;
      }
      // this.$store.state.shopCart["N"]--;
      var ts = document.querySelector(".top-select");
      this.$store.commit("push", ts.getAttribute("data-id"));
    },
    sub() {
      this.num++;
      //this.$store.state.shopCart["N"]++;
      var ts = document.querySelector(".top-select");
      this.$store.commit("sub", ts.getAttribute("data-id"));
    }
  },
  mounted() {
    
    //初始化
    if (this.$route.name == "/details/cake-page") {
      this.GetCak(() => {
        this.GetSumAndAvgAccessInfo();
      });
    } else if (this.$route.name == "/details/ns/ns-cake-page") {
      this.GetNS(() => {
        this.GetSumAndAvgAccessInfo();
      });
    } else if (this.$route.name == "/details/rup/rup-cake-page") {
      this.GetRuP(() => {
        this.GetSumAndAvgAccessInfo();
      });
    } else if (this.$route.name == "/details/jz/jz-cakepage") {
      this.Getjz(() => {
        this.GetSumAndAvgAccessInfo();
      });
    }
    this.$store.state.detailsShop={}
 
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.details {
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
  .shop {
    background: rgba(247, 247, 247, 0.5);
    width: r(160);
    font-size: r(32);
    border: r(2) solid rgb(51, 51, 51);
    border-right: none;
    border-top-left-radius: r(10);
    border-bottom-left-radius: r(10);
    line-height: r(70);
    text-align: center;
    position: fixed;
    right: 0;
    top: r(30);
    z-index: 33;
    a {
      text-decoration: none;
      color: #000;
    }
  }
  .mint-swipe {
    height: r(890);
    background: #fff;
    .mint-swipe-items-wrap {
      .mint-swipe-item {
        img {
          width: 100%;
          height: r(890);
        }
      }
    }
    .mint-swipe-indicators {
      .mint-swipe-indicator {
        display: inline-block;
        width: r(6);
        height: r(15);
        background: #666;
        transition: height 0.3s ease-out;
        margin: 0 r(5);
        border-radius: 1px;
      }
      .is-active {
        height: r(26);
      }
    }
  }
  .details-name {
    text-align: center;
    font-weight: bold;
    font-size: r(32);
    background: #fff;
  }
  .details-type {
    height: r(60);
    padding-bottom: r(60);
    background: #fff;
  }
  .details-info {
    margin-top: r(30);
    background: #fff;
    padding: r(68) 0;
    > div {
      overflow: hidden;

      margin-bottom: r(30);
      .info-left {
        float: left;
        margin-left: r(30);
        color: rgb(154, 154, 154);
        font-size: r(26);
        width: r(120);
      }
      .info-right {
        font-size: r(27);
        float: left;
        margin: 0 r(30);
        width: r(540);
        white-space: normal;
        word-break: break-all;
        word-wrap: break-word;
        img {
          width: r(168);
        }
      }
    }
    .info-a {
      margin-bottom: r(22);
    }
  }
  .evaluate {
    background: #fff;
    margin-top: r(30);
    padding: r(30) 0;
    overflow: hidden;
    .evaluate-left {
      padding-left: r(30);
      float: left;
      .left {
        margin-top: r(10);
        margin-right: r(22);
        width: r(40);
        height: r(25);
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        float: left;
        line-height: r(40);
      }
    }
    .evaluate-right {
      float: right;
      padding-right: r(30);
      .left {
        float: right;
        color: #9a9a9a;
      }
      .right {
        float: right;
        height: r(25);
        width: r(16);

        margin-left: r(12);
        margin-top: r(5);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .weight {
    background: #fff;
    margin-top: r(30);
    .weight-top {
      padding-top: r(60);
      overflow: hidden;
      .top-a {
        float: left;
        height: r(60);
        text-align: center;
        font-size: r(26);
        line-height: r(56);
        padding: 0 r(26);
        margin-left: r(30);
        border: r(2) solid #ccc;
      }
      .top-select {
        background: #02d3d6;
        color: #fff;
      }
    }
    .weight-bottom {
      padding-top: r(85);
      overflow: hidden;
      .bottom-a,
      .bottom-b,
      .bottom-c,
      .bottom-d {
        margin-bottom: r(30);
        width: 50%;
        float: left;
        .a-img {
          float: left;
          width: r(45);
          height: r(45);
          margin-left: r(30);
          margin-right: r(20);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .a-con {
          line-height: r(45);
        }
      }
    }
  }
  .math {
    margin-top: r(30);
    overflow: hidden;
    background: #fff;
    padding: r(30) r(20);
    font-size: r(28);
    margin-bottom: r(60);
    .math-left {
      float: left;
    }
    .math-right {
      float: right;
      i {
        display: inline-block;
        width: r(50);
        height: r(40);
        text-align: center;
      }
      span {
        display: inline-block;
        width: r(40);
        height: r(40);
        img {
          width: r(20);
          height: r(20);
          margin-left: r(10);
          vertical-align: middle;
        }
      }
    }
  }
  .purchase {
    position: fixed;
    left: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    height: r(110);
    width: 100%;
    .purchase-a {
      float: left;
      margin: r(15) r(15);

      p {
        &:nth-child(1) {
          color: red;
          font-size: r(34);
        }
        &:nth-child(2) {
          font-size: r(18);
        }
      }
    }
    .purchase-b {
      float: right;
      width: r(220);
      font-size: r(32);
      height: r(110);
      line-height: r(110);
      text-align: center;
    }
    .purchase-c {
      background: #02d3d6;
      color: #fff;
      height: r(110);
      line-height: r(110);
      float: right;
      font-size: r(32);
      text-align: center;
      width: r(220);
    }
  }
  .ico {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 100;
    img {
      position: absolute;
      left: 45%;
      top: 20%;
    }
  }
}
</style>
