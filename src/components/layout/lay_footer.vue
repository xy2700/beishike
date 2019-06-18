<template>
  <div class="footer">
    <div class="footer-content">
      <div v-for="(item,index) in imgarr" :key="index" class="footer-content-img">
        <router-link :to="item.route">
          <img :src="item.src1" alt :ref="item.route" @click="curt(index,$event)">
        </router-link>
      </div>
      <div class="footer-content-img" @click="bool">
        <img :src="mainimg.src1" alt class="me">
      </div>
      <div class="num" ref="num" v-if="ne">{{ne}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabNum: 0,
      imgarr: [
        {
          src1:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-a-1.png?v=119",
          src2:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-a-2.png?v=119",
          route: "/homepage"
        },
        {
          src1:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-b-1.png?v=119",
          src2:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-b-2.png?v=119",
          route: "/classify"
        },
        {
          src1:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-c-1.png?v=119",
          src2:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-c-2.png?v=119",
          route: "/cart"
        }
      ],
      mainimg: {
        src1:
          "https://res.bestcake.com/m-images/ww/foot/foot-menu-d-1.png?v=119",
        src2:
          "https://res.bestcake.com/m-images/ww/foot/foot-menu-d-2.png?v=119",
        route: "/mine"
      },
      ne: this.$store.state.shopCart["N"]
    };
  },
  methods: {
    curt(index, e) {
      this.tabNum = index;
      this.imgarr.forEach((ele, ind) => {
        if (ind == this.tabNum) {
          this.$refs[ele.route][0].src = ele.src2;
        } else {
          this.$refs[ele.route][0].src = ele.src1;
          $(".me").attr("src", this.mainimg.src1);
        }
      });
    },
    init() {
      this.imgarr.forEach((ele, index) => {
        if (this.$route.path.indexOf(ele.route) != -1) {
          this.$refs[ele.route][0].src = ele.src2;
        } else {
          this.$refs[ele.route][0].src = ele.src1;
        }
        if(this.$route.path.indexOf(this.mainimg.route)!=-1){
           $(".me").attr("src", this.mainimg.src2);
        }
       
      });
    },
    getCart() {
      console.log(this.$store.state.shopCart["N"]);
    },
    bool(e) {
      if (this.$store.state.isLogin) {
        $(".me").attr("src", this.mainimg.src2);
        this.imgarr.forEach((ele, ind) => {
          this.$refs[ele.route][0].src = ele.src1;
        });
        this.$router.push({
            path: "/mine"
          });
      } else {
        this.$eventHub.$emit("sub", { bools: true });
      }
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    num() {
      return this.$store.state.shopCart["N"];
    },
    p(){
      return this.$route.path
    }
  },
  watch: {
    num(ne, old) {
      this.ne = ne;
    },
    p(ne,old){
      if(ne.indexOf("/mine")>-1){
         $(".me").attr("src", this.mainimg.src2);
        this.imgarr.forEach((ele, ind) => {
          this.$refs[ele.route][0].src = ele.src1;
        });
      }else{
        $(".me").attr("src", this.mainimg.src1);
      }
       this.imgarr.forEach((ele, index) => {
        if (this.$route.path.indexOf(ele.route) != -1) {
          this.$refs[ele.route][0].src = ele.src2;
        } else {
          this.$refs[ele.route][0].src = ele.src1;
        }
        if(this.$route.path.indexOf(this.mainimg.route)!=-1){
           $(".me").attr("src", this.mainimg.src2);
        }
       
      });
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.footer {
  z-index: 2;

  position: fixed;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #eee;
  background: #fff;
  .footer-content {
    position: relative;
    height: r(100);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .footer-content-img {
      img {
        width: r(74);
        height: r(82);
      }
    }
    .num {
      background: red;
      color: #fff;
      border-radius: 50%;
      width: r(35);
      height: r(35);
      line-height: r(35);
      text-align: center;
      position: absolute;
      left: 64%;
      bottom: r(65);
    }
  }
}
</style>
