<template>
  <div class="home">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <lay_footer></lay_footer>
   
  </div>
</template>
<script>
import lay_footer from "./layout/lay_footer";

export default {
  name: "home",
  data() {
    return {
      bool:false
    };
  },
  components: {
    lay_footer,
   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
 
}
</style>
