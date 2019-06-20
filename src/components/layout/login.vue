<template>
  <!-- 登录注册 -->
  <div class="user">
    <mt-popup v-model="bln1">{{cont}}</mt-popup>
    <div class="user-cont">
      <div class="ret">
        <i @click="bool"></i>
      </div>
      <div class="login" v-show="bln==true">
        <p>密码登录</p>

        <div>
          <p>账号</p>
          <input type="text" v-model="username">
        </div>
        <div>
          <p>
            密码
            <i>显示</i>
          </p>
          <input type="password" v-model="password">
        </div>

        <div class="btn">
          <span @click="cut">切换快速注册</span>
          <button @click="go">></button>
        </div>
      </div>
      <div class="regist" v-show="bln==false">
        <p>用户注册</p>

        <div>
          <p>账号</p>
          <input type="text" v-model="uname">
        </div>
        <div>
          <p>
            密码
            <i>显示</i>
          </p>
          <input type="password" v-model="upwd">
        </div>
        <div>
          <p>
            确认密码
            <i>显示</i>
          </p>
          <input type="password" v-model="upwd1">
        </div>
        <div class="btn">
          <span @click="bln=true">切换快速登录</span>
          <button @click="regist">></button>
        </div>
      </div>
    </div>
    <div class="tishi" v-show="tes">
      <span>错误</span>
      <span>{{title}}</span>
      <span @click="empty">x</span>
    </div>
  </div>
</template>
<script>
import Store from "storejs";
export default {
  data() {
    return {
      bln1: false,
      bln: true,
      username: "",
      password: "",
      uname: "",
      upwd: "",
      upwd1: "",
      tes: false,
      title: "",
      cont: "请稍等..."
    };
  },
  methods: {
    cut() {
      this.bln = false;
      this.empty();
    },
    bool() {
      this.$eventHub.$emit("sub", { bools: false });
    },
    go(e) {
      this.bln1 = true;
      this.cont = "请稍等...";
      if (this.username.trim() == "" || this.password.trim() == "") {
        this.title = "接头暗号错误，请重新输入帐号或密码:-)";
        $(".user").css("background", "#F05B5B");
        $(e.target).css("color", "#F05B5B");
        this.tes = true;
        this.bln1 = false;
        return;
      }
      var data = {
        username: this.username,
        password: this.password
      };

      this.$apis.mokeLogin(data).then(res => {
        if (res.data.code == 500) {
          this.title = res.data.msg;
          $(".user").css("background", "#F05B5B");
          $(e.target).css("color", "#F05B5B");

          this.tes = true;
          this.bln1 = false;
        } else if (res.data.code == 200) {
          this.$store.state.mine = JSON.parse(res.config.data);
          this.empty();
          this.bln1 = false;
          this.$store.state.isLogin = true;
          this.$eventHub.$emit("sub", { bools: false });

          this.$router.push({
            path: "/mine"
          });
        }
      });
    },
    empty() {
      $(".user").css("background", " #02d4d7");
      $(".btn")
        .children("button")
        .css("color", "#02d4d7");
      this.username = "";
      this.password = "";
      this.tes = false;
    },
    regist() {
       if (this.upwd=='' || this.uname=="") {
         this.bln1 = true;
        this.cont = "用户名或密码不能为空";
        setTimeout(() => {
          this.bln1 = false;
        }, 200);
         return
       }
      if (this.upwd1 != this.upwd) {
        this.bln1 = true;
        this.cont = "两次密码不一致";
        setTimeout(() => {
          this.bln1 = false;
        }, 200);
        return;
      }
      var data = {
        id:Number(new Date()),
        username: this.uname,
        password: this.upwd
      };
      console.log(data)
      this.$apis.mokeRegist(data).then(res => {
        if (res.status == 200) {
          this.bln1 = true;
          this.cont = "注册成功";
          setTimeout(() => {
            this.uname = "";
            this.upwd = "";
            this.upwd1 = "";
            this.bln1 = false;
            this.bln = true;
          }, 200);

          return;
        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.user {
  .mint-popup {
    width: r(550);
    height: r(200);
    font-size: r(32);
    text-align: center;
    line-height: r(200);
  }
  width: 100%;
  height: 100%;
  background: #02d4d7;
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
  .tishi {
    height: r(100);
    width: 100%;
    background: #fff;
    line-height: r(100);
    color: #666;
    position: fixed;
    bottom: 0;
    right: 0;
    span {
      font-size: r(30);
      &:nth-child(1) {
        color: #f05b5b;
        margin-left: r(30);
        margin-right: r(8);
      }
      &:nth-child(3) {
        float: right;
        margin-right: r(30);
      }
    }
  }
  .user-cont {
    .ret {
      i {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        margin-top: r(20);
        margin-left: r(20);
        left: r(4 * 750/100);
        border-left: r(6) solid;
        border-bottom: r(6) solid;
        transform: rotate(45deg);
        border-color: #fff;
      }
      margin-bottom: r(20);
    }
    .login,
    .regist {
      margin: 0 r(40);
      > p {
        text-align: center;
        font-size: r(64);
        color: #fff;
        margin-bottom: r(20);
      }

      div {
        p {
          font-size: r(30);
          color: #fff;
          margin-bottom: r(15);
          i {
            float: right;
          }
        }
        input {
          outline: none;
          color: #fff;
          font-size: r(32);
          width: 100%;
          height: r(80);
          background: transparent;
          border: none;
          border-bottom: r(1) solid #fff;
          margin-bottom: r(25);
        }
      }
      .btn {
        margin-top: r(20);
        span {
          width: r(244);
          height: r(60);
          color: #fff;
          font-size: r(34);
          display: inline-block;
          border: r(1) solid #fff;
          text-align: center;
          line-height: r(60);
          border-top-left-radius: r(40);
          border-top-right-radius: r(40);
          border-bottom-left-radius: r(40);
          border-bottom-right-radius: r(40);
          margin-top: r(20);
        }
        button {
          float: right;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          width: r(92);
          height: r(92);
          text-align: center;
          line-height: r(92);
          color: #02d4d7;
          font-size: r(48);
          font-weight: bold;
          border-radius: 50%;
          outline: none;
        }
      }
    }
  }
}
</style>
