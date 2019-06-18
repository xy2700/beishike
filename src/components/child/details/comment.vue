<template>
  <div class="comment">
    <div class="com-cont" v-for="(item,index) in list" :key="index">
      <div class="cont-img">
        <div>
          <img :src="item.HeadImgPath?item.HeadImgPath:url" alt>
        </div>
      </div>
      <div class="cont-phone">
        <p>{{item.name}}</p>
        <a v-for="ind in item.score" :key="ind">
          <img src="https://res.bestcake.com\m-images\order\mw-reviews_3.png?v=1" alt>
        </a>
      </div>
      <div class="cont-time">
        <div class="time">{{ timestampToTime(parseInt(item.CmtTime.substr(6, 13))) }}</div>
      </div>
    </div>
     加载时
    <div class="ico" v-if="bln">
      <img src="https://res.bestcake.com/images/loading.gif" alt>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: 0,
      url: "http://m.bestcake.com/images/icon_user.jpg",
      list: [],
      bln:true
    };
  },
  methods: {
    getCakeCmtList(id) {
      var data = {
        ID: id,
        c: "Item",
        m: "getCakeCmtList",
        pageNo: 0,
        pageSize: 10,
        v: Number(new Date())
      };
      this.$apis.GetList(data).then(res => {
        this.list = res.data.Tag;
        this.bln=false
      });
    },

    timestampToTime(cjsj) {
      var date = new Date(cjsj);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    }
  },
  mounted() {
    this.getCakeCmtList(this.$route.params.id);
  }
};
</script>
<style lang="scss" scoped>
.comment {
  .com-cont {
    overflow: hidden;
    margin-left: r(30);
    padding: r(30) 0;
    padding-right: r(30);
    border-bottom: 0.26vw solid #ddd;
    .cont-img {
      float: left;
      margin-right: r(30);
      div {
        width: r(70);
        height: r(70);

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .cont-phone {
      float: left;
      p {
        line-height: r(42);
        font-size: r(30);
        margin-bottom: r(30);
      }
      a {
        img {
          width: r(40);
          margin-left:r(15);
        }
      }
    }
    .cont-time {
      float: right;
      .time {
        font-size: r(24);
        line-height: r(32);
        margin-top: r(7);
      }
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
