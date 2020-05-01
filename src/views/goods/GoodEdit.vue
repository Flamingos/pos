<template>
  <div>
    <el-form :model="form()" label-width="5em" class="form">
      <el-form-item label="商品ID">
        <el-input v-model="form().id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form().name"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <img :src="form().image" />
      </el-form-item>
      <el-form-item label="商品售价">
        <el-input v-model="form().price">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="是否新品">
        <el-radio v-model="form().new" :label="true">新品</el-radio>
        <el-radio v-model="form().new" :label="false">非新品</el-radio>
      </el-form-item>
      <el-form-item label="是否在售">
        <el-radio v-model="form().sell" :label="true">在售</el-radio>
        <el-radio v-model="form().sell" :label="false">未售</el-radio>
      </el-form-item>
      <el-form-item label="上架时间">
        <span>{{form().date}}</span>
      </el-form-item>
      <el-form-item label="详细介绍">
        <el-input v-model="form().description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary" @click="dialogVisible = true">更新商品</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
          <span>确定更新吗？该操作将无法撤销！</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="update">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    form() {
      return this.$store.state.goodDetail;
    },
    update() {
      this.dialogVisible = false

    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  text-align: left;
}
</style>