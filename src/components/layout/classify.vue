<template>
  <div class="classify">
    <mt-popup v-model="bln">正在获取产品数据，请稍等...</mt-popup>
    <div class="classifytab">
      <div
        v-for="(item,index) in tabArr"
        :key="index"
        :class="{'tab-select':index==tabNum,'tab':true}"
        @click="select(index)"
      >
        <router-link :to="item.to">{{item.name}}</router-link>
      </div>
    </div>
    <router-view :strict="strictArr" :self="selfArr" v-if="selfArr.length>0"></router-view>
    <!-- 价格说明 -->
    <price-description></price-description>
  </div>
</template>
<script>

export default {
  data() {
    return {
      bln: true,
      tabArr: [
        {
          name: "自营",
          to: "/classify/self"
        },
        {
          name: "贝式严选",
          to: "/classify/strict"
        }
      ],
      tabNum: 0,
      strictArr: [],
      selfArr: []
    };
  },
  methods: {
    select(index) {
      this.tabNum = index;
    },
    GetJdListNew(fn) {
      var data = {
        v: Number(new Date()),
        c: "NsCakeCenter",
        m: "GetJdListNew"
      };
      //获取信息
      this.$apis.GetList(data).then(res => {
        if (res.status == 200) {
          this.bln = false;
        }
        fn(res.data.Tag.cakelist);
      });
    },
    getClass() {
      this.GetJdListNew(list => {
       
        list.forEach(ele => {
          if (ele.SupplyNo.indexOf("RP")!=-1) {
            this.strictArr.push(ele);
          } else {
            this.selfArr.push(ele);
          }
        });
        
      });
    }
  },

  mounted() {
     this.$router.push({
        path: `/classify/self`
      });
    this.getClass()
  }
};
</script>
<style lang="scss" scoped>
.classify {
  .mint-popup {
    width: r(550);
    height: r(200);
    font-size: r(32);
    text-align: center;
    line-height: r(200);
  }
  .classifytab {
    height: r(88);
    border-bottom: 1px solid #d9d9d9;
    text-align: center;
    line-height: r(88);
    font-size: r(32);
    a {
      text-decoration: none;
      color: #000000;
    }
    .tab {
      width: 50%;
      float: left;
    }
    .tab-select {
      border-bottom: 1px solid #1db0b8;
      a {
        color: #1db0b8;
      }
    }
  }
}
</style>