<template>
  <div id="app">
    <router-view/>
    <transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
      <login class="animated" v-show="blns"></login>
    </transition>
  </div>
</template>

<script>
import login from "@/components/layout/login";
export default {
  name: "App",
  data() {
    return {
      blns: false
    };
  },
  mounted() {
    this.$store.commit("vueInit", {});
    this.$eventHub.$on("sub", val => {
      this.blns = val.bools;
    });
  },

  components: {
    login
  }
};
</script>

<style>
</style>
