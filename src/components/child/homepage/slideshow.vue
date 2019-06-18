<template>
  <div class="chart">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <img :src="host+item.ImgUrl" alt>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      host: "https://res.bestcake.com",
      list: []
    };
  },
  methods: {
    GetBannerList() {
      var data = {
        v: Number(new Date()),
        c: "Index",
        m: "GetBannerList",
        Type: "2",
        City: this.$store.state["city"]
      };
      this.$apis.GetList(data).then(res => {
        this.list = res.data.Tag.List;
      });
    }
  },
  mounted() {
    this.GetBannerList();
  }
};
</script>

<style lang="scss" scoped>
.chart {
  .mint-swipe {
    height: r(380);
    .mint-swipe-items-wrap {
      .mint-swipe-item {
        img {
          width: 100%;
          height: 100%;
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
}
</style>
