<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="商品供应">
        <el-table :data="supplyData" border style="width: 100%">
          <el-table-column prop="id" align="center" label="供应商编号"></el-table-column>
          <el-table-column prop="name" align="center" label="供应商名称"></el-table-column>
          <el-table-column prop="image" align="center" label="供应商图片">
            <template slot-scope="scope">
              <img :src="scope.row.image" />
            </template>
          </el-table-column>
          <el-table-column prop="description" align="center" label="介绍" width="500"></el-table-column>
          <el-table-column prop="option" align="center" width="260" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="detele(scope.row)">删除</el-button>
              <el-button type="success" size="mini" @click="contact(scope.row)">联系</el-button>
            </template>
          </el-table-column>
        </el-table>
        <backtop></backtop>
      </el-tab-pane>
      <el-tab-pane label="店铺周边">
        <el-row :gutter="40">
          <el-col :span="4" v-for="(item, index) in presents" :key="index" class="present">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <img :src="item.image" class="image" />
              <div>{{item.name}}</div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import backtop from '@/components/backtop.vue'
export default {
  components:{backtop},
  data() {
    return {
      supplyData: [],
      presents: []
    };
  },
  methods: {
    edit() {},
    delete() {},
    contact() {},
    init() {
      //数据伪造
      let Random = this.$mock.Random;
      for (let i = 0; i < 56; i++) {
        this.supplyData.push({
          id: Random.increment(1),
          name: Random.first(),
          image: Random.image("100x60"),
          description: Random.paragraph(1)
        });
      }
      for (let i = 0; i < 8; i++) {
        this.presents.push({
          name: Random.first(),
          image: Random.image("100x120")
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
.image {
  width: 100%;
}
.present{
    padding-top: 1em; 
}
</style>