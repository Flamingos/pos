<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="会员列表">
          <el-form :inline="true" :model="queryData" class="queryForm">
            <el-form-item>
              <el-input v-model="queryData.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
          </el-form>
        <el-table :data="vipData" style="width: 100%">
          <el-table-column prop="id" label="会员编号"></el-table-column>
          <el-table-column prop="joindate" label="加入时间"></el-table-column>
          <el-table-column prop="enddate" label="到期时间"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="score" label="累计积分"></el-table-column>
          <el-table-column prop="discount" label="享受折扣"></el-table-column>
          <el-table-column prop="option" width="260" label="操作">
            <template slot-scope="scope">
              <el-button type="success" size="mini" @click="renew(scope.row)">续费</el-button>
              <el-button type="primary" size="mini" @click="exchange(scope.row)">积分兑换</el-button>
              <el-button type="danger" size="mini" @click="edit(scope.row)">信息修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="新增会员">
        <el-form :model="vipDetail" :rules="rules" ref="vipForm" label-width="6em" class="form">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="vipDetail.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="vipDetail.phone"></el-input>
          </el-form-item>
          <el-form-item label="会员时长" prop="duration">
            <el-input v-model.number="vipDetail.duration">
              <template slot="append">年</template>
            </el-input>
          </el-form-item>
          <el-form-item label="享受折扣" prop="discount">
            <el-input v-model.number="vipDetail.discount">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancelAddvip">取消</el-button>
            <el-button type="primary" @click="addvip('vipForm')">添加</el-button>
            <el-button @click="resetForm('vipForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
        queryData: {name:''},
      vipData: [],
      vipDetail: {
        name: "",
        phone: "",
        duration: "",
        discount: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        duration: [
          {
            type: "number",
            min: 1,
            max: 5,
            required: true,
            message: "请输入正确的时长",
            trigger: "blur"
          },
          {
            min: 1,
            max: 5,
            required: true,
            message: "请输入1-5之间的整数",
            trigger: "blur"
          }
        ],
        discount: [
          {
            type: "number",
            required: true,
            message: "请输入正确的折扣",
            trigger: "blur"
          },
          {
            min: 5,
            max: 25,
            required: true,
            message: "请输入5-25之间的整数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    renew() {},
    exchange() {},
    //页面数据的初始化
    init() {
      //数据伪造
      let Random = this.$mock.Random;
      for (let i = 0; i < 56; i++) {
        this.vipData.push({
          id: Random.increment(1),
          joindate: Random.date("2019-MM-dd"),
          enddate: Random.date("2020-MM-dd"),
          name: Random.first(),
          score: Random.natural(100, 2000),
          discount: Random.integer(5, 25) + "%"
        });
      }
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.queryForm{
    float: left;
}
</style>