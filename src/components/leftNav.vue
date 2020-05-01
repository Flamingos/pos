<template>
  <div class="left-nav">
    <ul>
      <li @click="toPage('Check')" :class="{select:selected=='Check'}">
        <i class="icon iconfont icon-goumai"></i>
        <div>收银</div>
      </li>

      <li>
        <i class="icon iconfont icon-dianpu"></i>
        <div>店铺</div>
      </li>

      <li @click="toPage('Goods')" :class="{select:selected=='Goods'}">
        <i class="icon iconfont icon-hanbao"></i>
        <div>商品</div>
      </li>

      <li>
        <i class="icon iconfont icon-huiyuanqia"></i>
        <div>会员</div>
      </li>

      <li>
        <i class="icon iconfont icon-jiangjia"></i>
        <div>统计</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "leftNav",
  data() {
    return {
        selected:'Check'
    };
  },
  methods:{
      toPage(type){
          switch(type){
              case 'Goods':{
                  if(this.$router.currentRoute.name!=type){
                      this.$router.push({name:type});
                        this.selected = type;
                  }
                  }
              break;
              case 'Check':{
                  if(this.$router.currentRoute.name!=type){
                      this.$router.push({name:type});
                        this.selected = type;
                  }
              }
              break;
          }
      }
  }
};
</script>

<style lang="scss" scoped>
.left-nav {
  color: #fff;
  font-size: 10px;
  height: 100vh;
  background-color: #1d8ce0;
  float: left;
  width: 5%;
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
}
.select{
    background: #fff;
    color: #1d8ce0;
}
</style>