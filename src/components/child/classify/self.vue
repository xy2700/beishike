<template>
  <div class="self">
    <mt-popup v-model="bln">{{name}}已加入购物车</mt-popup>
    <div class="self-tab">
      <div
        v-for="(item,index) in tabArr"
        :key="index"
        :class="{'tab-head':true,'active':index==tabNum}"
        @click="selcet(index,$event,item.img,item.tab)"
      >{{item.name}}</div>
      <transition>
        <div class="tab-underline" ref="lin"></div>
      </transition>
    </div>
    <div class="self-list">
      <div class="list-content" v-for="(item,index) in list" :key="index">
        <div class="list-img" @click="details(item)">
          <img alt :src="host+imgUrl+encodeURIComponent(item.Name)+'.png'">
        </div>

        <div class="list-name">{{item.Name}}</div>
        <div class="list-info">{{item.Means}}</div>
        <div class="list-price">
          <i>￥</i>
          <span>
            {{item.CurrentPrice}}
            <i>.00</i>
          </span>
          <b>/{{item.Size}}</b>
        </div>
        <div class="list-cart" @click="tianjia(item)">
          <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" alt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["self", "strict"],
  data() {
    return {
      host: "https://res.bestcake.com/m-images/ww/",
      tabNum: 0,
      tabArr: [
        {
          name: "经典",
          img: "/jd/",
          tab: "卡思客"
        },
        {
          name: "女神",
          img: "/ns/",
          tab: "女神系列"
        },
        {
          name: "伴手礼",
          img: "/jz/",
          tab: "极致蛋糕"
        }
      ],
      list: [],
      imgUrl: "/jd/",
      bln:false,
      name:''
    };
  },
  methods: {
    details(item) {
      if (item.Brand == "卡思客") {
        this.$router.push({
          path: `/details/cake-page/${item.Name}`
        });
      } else if (item.Brand == "女神系列") {
        this.$router.push({
          path: `/details/ns/ns-cake-page/`,
          query: { pname: item.Name }
        });
      } else if (item.Brand == "极致蛋糕") {
        this.$router.push({
          path: `/details/jz/jz-cakepage/${item.Name}`
        });
      }
    },
    selcet(index, e, url, tab) {
      console.log(tab);
      this.tabNum = index;
      this.imgUrl = url;
      this.list = [];
      this.self.forEach(ele => {
        if (ele.Brand.indexOf(tab) > -1) {
          this.list.push(ele);
        }
      });
      this.$nextTick(() => {
       console.log($('.active').css("width"))
        $(".tab-underline").animate({"left":$('.active').offset().left,"width":$('.active').css("width")})
      });
    },
    get() {
      var wid = document.querySelector(".active");
      var line = this.$refs.lin;
      line.style.width = wid.offsetWidth + "px";
      line.style.left = wid.offsetLeft + "px";

      this.self.forEach(ele => {
        if (ele.Brand.indexOf("卡思客") > -1) {
          this.list.push(ele);
        }
      });
    },
    tianjia(item) {
      var tos='';
      if (item.Brand == "卡思客") {       
          tos=`/details/cake-page/${item.Name}`    
      } else if (item.Brand == "女神系列") {    
          tos=`/details/ns/ns-cake-page/?pname=${item.Name}`      
      } else if (item.Brand == "极致蛋糕") {      
          tos=`/details/jz/jz-cakepage/${item.Name}`     
      }
      this.name=item.Name
      console.log(item)
      var data = {
        id: item.ID,
        name: item.Name,
        eName:item.Ename,
        num: 1,
        price: item.CurrentPrice,
        oldprice:item.CurrentPrice,
        size: item.Size,
        url: this.host+this.imgUrl+encodeURIComponent(item.Name)+'.png',
        to:tos
      };
      this.bln=true
   this.$store.commit("add", data)
   setTimeout(()=>{
     this.bln=false
   },1000)
    },
  },
  mounted() {
    this.get();
  }
};
</script>
<style lang="scss" scoped>
.self {
  .mint-popup {
    width: r(550);
    padding: r(60) r(60);
    font-size: r(32);
    text-align: center;
  }
  .self-tab {
    position: relative;
    margin-top: r(56);
    display: flex;
    justify-content: space-around;
    padding: 0 r(100);
    font-size: r(28);
    .tab-head {
      display: inline-block;
    }
    .active {
      font-size: r(32);
      font-weight: bold;
    }
    .tab-underline {
      position: absolute;
      background: rgba(35, 189, 198, 0.7);
      height: r(10);
      display: inline-block;
      bottom: 0;
    }
  }
  .self-list {
    padding: 0 r(12);
    overflow: hidden;
    .list-content {
      float: left;
      width:45%;
      height: r(466);
      margin-bottom: r(40);
      &:nth-child(odd) {
        margin-right: r(66);
      }
      .list-img {
        width: r(330);
        height: r(330);
        img {
          width: 100%;
          
        }
      }
      .list-name {
        margin-top: r(14);
        font-size: r(27);
      }
      .list-info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgb(130, 129, 129);
      }
      .list-price {
        float: left;
        i {
          color: red;
          font-size: r(24);
        }
        span {
          color: red;
          font-size: r(28);
        }
        b {
          color: rgb(130, 129, 129);
          font-size: r(24);
        }
      }
      .list-cart {
        width: r(40);
        height: r(40);
        float: right;
        img {
          width: r(40);
          height: r(40);
        }
      }
    }
  }
}
</style>
