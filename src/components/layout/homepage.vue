<template>
  <div class="homepage">
    <!-- 所在城市 -->
    <location></location>
    <!-- 轮播图 -->
    <slideshow></slideshow>
    <!-- 主体内容 -->
    <subject></subject>
    <!-- 价格说明 -->
    <price-description></price-description>
   
  </div>
</template>
<script>
import slideshow from "@/components/child/homepage/slideshow";
import location from "@/components/child/homepage/location";
import subject from "@/components/child/homepage/subject";

export default {
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  components: {
    slideshow,
    location,
    subject,

  }
};
</script>
<style lang="scss" scoped>
.homepage {
  overflow: auto;
 
}
</style>
