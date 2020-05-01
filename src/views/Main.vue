<template>
  <div id="app">
    <div class="left-nav">
      <ul>
        <li @click="toPage('Check')" :class="{select:selected=='Check'}">
          <i class="icon iconfont icon-goumai"></i>
          <div>收银</div>
        </li>

        <li @click="toPage('Store')" :class="{select:selected=='Store'}">
          <i class="icon iconfont icon-dianpu"></i>
          <div>店铺</div>
        </li>

        <li @click="toPage('Goods')" :class="{select:selected=='Goods'}">
          <i class="icon iconfont icon-hanbao"></i>
          <div>商品</div>
        </li>

        <li @click="toPage('Member')" :class="{select:selected=='Member'}">
          <i class="icon iconfont icon-huiyuanqia"></i>
          <div>会员</div>
        </li>

        <li @click="toPage('Statistics')" :class="{select:selected=='Statistics'}">
          <i class="icon iconfont icon-jiangjia"></i>
          <div>统计</div>
        </li>
      </ul>
    </div>
    <div class="main">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "Check"
    };
  },
  components: {},
  methods: {
    toPage(type) {
      if (this.$router.currentRoute.name != type) {
        this.$router.push({ name: type });
        this.selected = type;
      }
    }
  },
  created(){
    this.selected = this.$router.currentRoute.name
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 95%;
  margin-left: 5%;
  background-color: #eff2f7;
  position: relative;
}
.left-nav {
  color: #fff;
  font-size: 10px;
  height: 100vh;
  background-color: #1d8ce0;
  width: 5%;
  position: fixed;
}
.iconfont {
  font-size: 24px;
}
.left-nav ul {
  padding: 0px;
  margin: 0px;
}
.left-nav li {
  list-style: none;
  text-align: center;
  border-bottom: 1px solid #20a0ff;
  padding: 10px;
  cursor: pointer;
}
.select {
  background: #fff;
  color: #1d8ce0;
}
</style>