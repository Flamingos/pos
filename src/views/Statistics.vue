<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="订单统计">
        <el-row>
          <el-col :span="16">
            <el-date-picker
              class="picker"
              v-model="date"
              type="date"
              :picker-options="pickerOptions"
              @change="query"
              placeholder="选择日期"
            ></el-date-picker>
            <el-table :data="orderData" style="width: 100%">
              <el-table-column prop="id" label="订单编号"></el-table-column>
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="goods" label="购买商品"></el-table-column>
              <el-table-column prop="originPrice" align="right" label="原价"></el-table-column>
              <el-table-column prop="discount" align="right" label="折扣"></el-table-column>
              <el-table-column prop="price" align="right" label="价格"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="8">
              <div ref="chart1" id="chart1"></div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品统计"></el-tab-pane>
      <el-tab-pane label="会员统计"></el-tab-pane>
      <el-tab-pane label="采购统计"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      orderData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      myChart:{}
    };
  },
  methods: {
    query() {
      console.log(this.date);
    },
    //页面数据的初始化
    init() {
      //数据伪造
      let Random = this.$mock.Random;
      for (let i = 0; i < 56; i++) {
        this.orderData.push({
          id: Random.increment(1),
          date: Random.date("2019-MM-dd"),
          name: Random.first(),
          goods: Random.last(),
          originPrice: Random.natural(8, 299)+'￥',
          discount: Random.integer(0, 50) + "%",
          price: Random.natural(8, 299)+'￥'
        });
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    //ref绑定，减少获取DOM节点的消耗
    this.myChart = this.$echarts.init(this.$refs.chart1);
    this.option = {
        title: {
          text: "订单统计"
        },
        tooltip: {},
        grid: {},
        xAxis: {
            
          data: ["一月", "二月", "三月", "四月", "五月", "六月"],
          axisLabel: {
            rotate: 0,
            interval: 0,
            inside: false
          },
          z: 10
        },
        yAxis: {
          axisLabel: {
            rotate: 0,
            interval: 0,
            inside: false
          }
          //z: 10
        },
        series: [
          {
            type: "line",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      this.myChart.setOption(this.option);
  }
};
</script>

<style lang="scss" scoped>
.picker {
  float: left;
}
#chart1{
    width: 400px;
    height: 300px;
}
</style>