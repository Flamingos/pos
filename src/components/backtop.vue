<template>
  <div>
    <el-button @click="backtop">backtop</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    backtop() {
      let progress = 0;
      function step() {
        progress++;
        if (progress <= 60) {
          document.documentElement.scrollTop =
            document.documentElement.scrollTop * (1 - progress / 60);
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>