<template>
  <div class="subject">
    <!-- 导航部分 -->
    <div class="banner-icon">
      <div class="loading" v-for="(item,index) in iconList" :key="index">
        <a href>
          <img :src="item.ImgUrl" alt>
        </a>
        <div class="ico-title">{{item.ActName}}</div>
      </div>
    </div>
    <!-- 广告 -->
    <div class="advertising">
      <div>
        <a href>
          <img src="https://res.bestcake.com/m-images-2/guanggao1.png?v=0419" alt>
        </a>
      </div>
      <div>
        <a href>
          <img src="https://res.bestcake.com/m-images-2/guangao22.png?v=0419" alt>
        </a>
        <a href>
          <img src="https://res.bestcake.com/m-images-2/guanggao3.png" alt>
        </a>
      </div>
    </div>
    <!-- 魔法猜心 -->
    <div class="heart">
      <img src="https://res.bestcake.com/m-images-2/mofa.png" alt>
      <p>任选一款，走进你的心</p>
      <div class="heart-tab">
        <ul>
          <li
            v-for="(item,index) in heartTabList"
            :key="index"
            @click="select($event,index)"
            :class="{'select':index==tabNum}"
          >{{item}}</li>
        </ul>
      </div>
      <div class="heart-list">
        <div
          class="list-c"
          v-for="(item,index) in heartList"
          :key="index"
          @click="details(item.Imglink)"
        >
          <img :src="item.ImgUrl" alt>
          <div class="heart-name">{{item.Name}}</div>
          <div class="heart-price">
            <i>￥</i>
            <span>{{item.CurrentPrice}}</span>
            <b>/{{item.Size}}</b>
          </div>
        </div>
      </div>
    </div>
    <!-- 品质甄选 -->
    <div class="quality">
      <img src="https://res.bestcake.com/m-images-2/pinzhi.png" alt>
      <p>没尝过这些美味的人生，是不完美的</p>
      <div class="quality-list" v-for="(item,index) in  qualityList" :key="index">
        <div class="quality-img" @click="details(item.Imglink)">
          <img v-lazy="item.ImgUrl" alt>
        </div>
        <div class="quality-detail">
          <div class="quality-name">{{item.Name}}</div>
          <div class="quality-info">{{item.MoreUrl}}</div>
          <div class="quality-tip">
            <img
              src="https://res.bestcake.com/m-images-2/icon_zy.png"
              alt
              v-if="item.SupplyNo.indexOf('RP')==-1"
            >
            <img src="https://res.bestcake.com/m-images-2/icon_yx.png" v-else>
          </div>
          <div class="quality-price">
            <i>￥</i>
            <span>{{item.CurrentPrice}}</span>
            <b>/{{item.Size}}</b>
          </div>
        </div>
        <div class="quality-cart" @click="tianjia(item,$event)">
          <img src="https://res.bestcake.com/m-images-2/pinzhi-cart.png" alt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      heart: [],
      heartTabList: [],
      heartList: [],
      qualityList: [],
      actions: [],
      iconList: [],
      tabNum: 0,
      tabText: "",
    };
  },
  methods: {
    tianjia(item, e) {
      this.flay(e, item.ImgUrl);

      var data = {
        id: item.Pid,
        name: item.Name,
        eName: "",
        num: 1,
        price: item.CurrentPrice,
        oldprice: item.CurrentPrice,
        size: item.Size,
        url: item.ImgUrl,
        to: "/details" + item.Imglink
      };
      this.$store.commit("add", data);
    },
    select(e, index) {
      this.tabNum = index;
      this.tabText = e.target.innerText;
      this.heartList = [];
      this.heart.forEach(ele => {
        //判断tab的文本与ele是否相同
        if (ele.ActiveName.trim() == this.tabText) {
          this.heartList.push(ele);
        }
      });
    },
    details(pname) {
      this.$router.push({
        path: `/details${pname}`
      });
    },
    getList(fn) {
      var data = {
        v: Number(new Date()),
        c: "Index",
        m: "GetIndexCakeList"
      };

      //获取信息
      this.$apis.GetList(data).then(res => {
        fn(res);
      });
    },
    flay(e, url) {
      var flyer = $(
        `<img class="flyer-img" style="width:100px;height:100px" src="${url}">`
      );
      var top = $(window).scrollTop();
      var dh = event.pageY;
      var newh = dh - top;
      //  购物车节点位置,决定图片飘的位置
      var offset=$('.footer-content-img').eq(1).offset()
      flyer.fly({
        start: {
          left: event.pageX - 50, //抛物体起点横坐标
          top: newh -50, //抛物体起点纵坐标
        },
        end: {
          left: offset.left * 2, //抛物体终点横坐标
          top: offset.top-top, //抛物体终点纵坐标
         width: 0,
         height: 0,
          
        },
        onEnd: function() {
          this.destory(); //销毁抛物体
        }
      });
    }
  },
  mounted() {
   //console.log(this.$store.state["city"])
  sessionStorage.setItem("city",this.$store.state["city"])
    this.getList(res => {
      //获取icon
      res.data.Tag.iconList.forEach(ele => {
        //判断所在城市所有
        if (ele.City.indexOf(this.$store.state["city"]) != -1) {
          this.iconList.push(ele);
        }
      });
      //获取商品
      var arr = [];
      res.data.Tag.list.forEach(ele => {
        if (ele.DesName == "魔法猜心") {
          //判断所在城市所有
          if (ele.City.indexOf(this.$store.state["city"]) != -1) {
            arr.push(ele.ActiveName.trim());
            this.heart.push(ele);
          }
        } else {
          this.qualityList.push(ele);
        }
      });

      //tab去重
      this.heartTabList = new Array(...new Set(arr));
      this.tabText = this.heartTabList[0];
      this.heart.forEach(ele => {
        if (ele.ActiveName == this.tabText) {
          this.heartList.push(ele);
        }
      });
      this.actions = res.data.Tag.actions;
    });
  }
};
</script>
<style lang="scss" scoped>
.subject {
  .banner-icon {
    overflow: hidden;
    padding: 0 r(23) r(30);
    border-bottom: r(20) solid #fafafa;
    .loading {
      width: r(176);
      float: left;
      margin-top: r(24);
      text-align: center;
      a {
        img {
          width: r(112);
          height: r(112);
        }
      }
    }
  }
  .advertising {
    padding: r(30);
    overflow: hidden;
    border-bottom: r(20) solid #fafafa;
    div {
      width: 48%;
      float: left;
      overflow: hidden;

      img {
        width: 100%;
      }
      &:nth-child(2) {
        float: right;
        margin-left: r(25);
        img {
        }
      }
    }
  }
  .heart {
    > img {
      margin: r(50) 0 r(20);
      width: 100%;
    }
    > p {
      text-align: center;
      color: #999;
      margin-bottom: r(32);
    }
    .heart-tab {
      padding: 0 r(30);
      overflow: hidden;
      margin-bottom: r(20);
      ul {
        display: flex;
        justify-content: space-between;
        li {
          width: r(120);
          height: r(66);
          background: url(https://res.bestcake.com/m-images-2/mofa-1.png)
            no-repeat center center;
          background-size: r(120) r(66);
          line-height: r(50);
          text-align: center;
          color: #333;
          float: left;
        }
        .select {
          background-image: url(https://res.bestcake.com/m-images-2/mofa-2.png);
          color: #fff;
          border: none;
        }
      }
    }
    .heart-list {
      display: flex;
      justify-content: space-between;
      padding: 0 r(30) r(20);
      border-bottom: r(20) solid #fafafa;
      .list-c {
        width: r(212);
        img {
          width: r(212);
          height: r(180);
        }
        .heart-name {
          text-align: center;
          color: #333;
          font-size: r(30);
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .heart-price {
          text-align: center;
          i {
            color: red;
            font-size: r(24);
          }
          span {
            color: red;
            font-size: r(28);
          }
          b {
            color: rgb(212, 212, 212);
            font-size: r(24);
          }
        }
      }
    }
  }
  .quality {
    > img {
      margin: r(50) 0 r(20);
      width: 100%;
    }
    > p {
      text-align: center;
      color: #999;
      margin-bottom: r(32);
    }
    .quality-list {
      margin-bottom: r(24);
      padding: 0 r(30);
      overflow: hidden;
      position: relative;
      .quality-img {
        width: r(220);
        height: r(220);
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .quality-detail {
        margin-left: r(30);
        float: left;
        div {
          max-width: r(370);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .quality-name {
          font-size: r(32);
          color: #333333;
          margin: r(8) 0 0;
        }
        .quality-info {
          font-size: r(24);
          color: #999;
          margin-bottom: r(8);
        }
        .quality-tip {
          img {
            height: r(36);
            margin-right: r(3);
          }
        }
        .quality-price {
          text-align: left;
          i {
            color: red;
            font-size: r(28);
          }
          span {
            color: red;
            font-size: r(32);
          }
          b {
            color: rgb(212, 212, 212);
            font-size: r(28);
          }
        }
      }
      .quality-cart {
        width: r(84);
        height: r(84);
        position: absolute;
        bottom: 0;
        right: r(10);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
