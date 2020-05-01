<template>
  <div>
    <el-tabs type="border-card" v-model="tabName">
      <el-tab-pane label="商品列表" :name="names[0]">
        <el-form>
          <el-form :inline="true" :model="queryData" class="queryForm">
            <el-form-item>
              <el-input v-model="queryData.id" placeholder="请输入商品id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="queryData.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="showData" border style="width: 100%">
            <el-table-column align="center" prop="id" label="商品ID"></el-table-column>
            <el-table-column align="center" prop="name" label="名称"></el-table-column>
            <el-table-column align="center" prop="image" label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.image" />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="detail" label="详情">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="detail(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="price" label="价格"></el-table-column>
            <el-table-column align="center" label="是否新品">
              <template slot-scope="scope">
                <div>
                  <el-tag v-if="scope.row.new" type="warning">新品</el-tag>
                  <el-tag v-else>非新品</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sell" label="是否在售">
              <template slot-scope="scope">
                <div>
                  <el-tag v-if="scope.row.sell" type="success">在售</el-tag>
                  <el-tag v-else type="info">未售</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="date" label="上架时间"></el-table-column>
            <el-table-column align="center" prop="option" label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="delGood(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <footer class="footer">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="listData.length"
            ></el-pagination>
          </footer>
        </el-form>
        <el-dialog title="商品详情" :visible.sync="dialog">
          <div class="single-detail">
            <ul>
              <li>
                <span>商品ID</span>
                {{singleDetail.id}}
              </li>
              <li>
                <span>商品介绍</span>
                <p>{{singleDetail.description}}</p>
              </li>
              <li>
                <span>商品名称</span>
                {{singleDetail.name}}
              </li>
              <li>
                <span>上架日期</span>
                {{singleDetail.date}}
              </li>
            </ul>
          </div>
        </el-dialog>
        <backtop></backtop>
      </el-tab-pane>
      <el-tab-pane label="商品上架" :name="names[1]">
        <el-form
          :model="putawayDetail"
          :rules="rules"
          ref="putawayForm"
          label-width="6em"
          class="form"
        >
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="putawayDetail.name"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-input v-model="putawayDetail.image"></el-input>
          </el-form-item>
          <el-form-item label="商品售价" prop="price">
            <el-input v-model.number="putawayDetail.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="是否新品">
            <el-radio v-model="putawayDetail.new" :label="true">新品</el-radio>
            <el-radio v-model="putawayDetail.new" :label="false">非新品</el-radio>
          </el-form-item>
          <el-form-item label="是否在售">
            <el-radio v-model="putawayDetail.sell" :label="true">在售</el-radio>
            <el-radio v-model="putawayDetail.sell" :label="false">未售</el-radio>
          </el-form-item>
          <el-form-item label="详细介绍">
            <el-input v-model="putawayDetail.description" :autosize="{ minRows: 2, maxRows: 10}" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancelPutaway">取消</el-button>
            <el-button type="primary" @click="putaway('putawayForm')">上架</el-button>
            <el-button @click="resetForm('putawayForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品编辑" :name="names[2]" :disabled="tabDisabled">
        <el-form :model="goodDetail" label-width="5em" class="form">
          <el-form-item label="商品ID">
            <el-input v-model="goodDetail.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="goodDetail.name"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <img :src="goodDetail.image" />
          </el-form-item>
          <el-form-item label="商品售价">
            <el-input v-model.number="goodDetail.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="是否新品">
            <el-radio v-model="goodDetail.new" :label="true">新品</el-radio>
            <el-radio v-model="goodDetail.new" :label="false">非新品</el-radio>
          </el-form-item>
          <el-form-item label="是否在售">
            <el-radio v-model="goodDetail.sell" :label="true">在售</el-radio>
            <el-radio v-model="goodDetail.sell" :label="false">未售</el-radio>
          </el-form-item>
          <el-form-item label="上架时间">
            <span>{{goodDetail.date}}</span>
          </el-form-item>
          <el-form-item label="详细介绍">
            <el-input v-model="goodDetail.description" :autosize="{ minRows: 2, maxRows: 10}" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancelUpdate">取消</el-button>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getGoods } from '@/api/api';
import backtop from '@/components/backtop.vue'
export default {
  components:{backtop},
  data() {
    return {
      tabName: "list",
      names: ["list", "putaway", "edit"],
      tabDisabled: true,
      queryData: {
        //查询条件
        id: "",
        name: ""
      },
      totalData: [], //所有数据，主要做查询用
      listData: [], //需要渲染的数据
      showData: [], //当前页显示的数据，从listData中获取
      currentPage: 1, //当前页码
      pageSize: 10, //页面展示条目数量
      pageSizes: [10, 20, 30, 40], //可选择的单页展示数量
      dialog: false, //弹出框，展示详情
      singleDetail: {}, //该商品详情
      putawayDetail: {
          id:'',
        name: "",
        image: "",
        price: '',
        new: true,
        sell: true,
        description: ""
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        price: [{ type: 'number', required: true, message: "请输入正确的商品售价", trigger: "blur" }]
      },
      goodDetail: {}, //编辑商品详情
      dialogVisible: false
    };
  },
  methods: {
    //页面数据的初始化
    init() {
      //数据伪造
      let Random = this.$mock.Random;
      for (let i = 0; i < 56; i++) {
        this.listData.push({
          id: Random.increment(1),
          name: Random.first(),
          image: Random.image("60x60"),
          price: Random.natural(8, 99),
          new: Random.boolean(),
          sell: Random.boolean(),
          date: Random.date("2019-MM-dd"),
          description: Random.paragraph(3)
        });
      }
      this.totalData = this.listData;
      this.showData = this.listData.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      );
      this.currentPage = 1;
      this.pageSize = 10;
    },
    handleSizeChange(val) {
      //改变每页显示条数
      this.pageSize = val;
      this.showData = this.listData.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      );
    },
    handleCurrentChange(val) {
      //翻页
      this.currentPage = val;
      this.showData = this.listData.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      );
    },
    detail(data) {
      //获取商品详情
      this.dialog = true;
      this.singleDetail = data;
    },
    query() {
      //查询商品
      if (this.queryData.id == "" && this.queryData.name == "") {
        this.listData = this.totalData;
        this.currentPage = 1;
        this.pageSize = 10;
        this.showData = this.listData.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        );
      } else {
        let tempData = [];
        for (let item of this.totalData) {
          if (this.queryData.id != "") {
            if (
              item.id == this.queryData.id &&
              item.name.includes(this.queryData.name)
            ) {
              tempData.push(item);
            }
          } else {
            if (item.name.includes(this.queryData.name)) {
              tempData.push(item);
            }
          }
        }
        this.listData = tempData;
        this.currentPage = 1;
        this.pageSize = 10;
        this.showData = this.listData.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        );
      }
    },
    edit(data) {
      //编辑商品
      this.tabName = this.names[2];
      this.goodDetail = data;
    },
    delGood(data) {
      //删除商品
      let delSingle = function(arr) {
        for (let item of arr) {
          if (item.id == data.id) {
            arr.splice(arr.indexOf(item), 1);
          }
        }
      };
      delSingle(this.totalData);
      delSingle(this.listData);
      delSingle(this.showData);
      this.$message.success("删除成功！");
    },
    update() {
      this.dialogVisible = false;
      for (let [index, item] of this.totalData.entries()) {
        if (item.id == this.goodDetail.id) {
          this.totalData.splice(index, 1, this.goodDetail);
        }
      }
      this.listData = this.totalData;
      this.currentPage = 1;
      this.pageSize = 10;
      this.showData = this.listData.slice(
        this.pageSize * (this.currentPage - 1),
        this.pageSize * this.currentPage
      );
      this.$message.success("更新成功！");
      this.tabName = this.names[0];
    },
    cancelUpdate() {
      this.$message.warning("编辑已取消...");
      this.tabName = this.names[0];
    },
    putaway(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.putawayDetail.id = this.$mock.Random.increment(1);
          this.totalData.splice(0,0,this.putawayDetail);
          this.listData = this.totalData;
          this.currentPage = 1;
          this.pageSize = 10;
          this.showData = this.listData.slice(
            this.pageSize * (this.currentPage - 1),
            this.pageSize * this.currentPage
          );
          this.$message.success("商品上架成功！");
          this.tabName = this.names[0];
        } else {
          this.$message.error("商品上架失败！");
          return false;
        }
      });
    },
    cancelPutaway() {
      this.$message.warning("上架操作已取消...");
      this.tabName = this.names[0];
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.init();
    getGoods().then(res=>{
      console.log(res.data.data)
    })
  }
};
</script>

<style lang="scss" scoped>
.border-card {
  overflow: hidden;
}

.footer {
  margin-top: 2em;
  margin-bottom: 1em;
}
.queryForm {
  float: left;
}
ul {
  padding: 0px;
  margin: 0px;
}
li {
  list-style: none;
}
.drawer {
  overflow: scroll;
}
.single-detail {
  text-align: left;
  padding: 2em;
  line-height: 1.5em;
  span {
    display: inline-block;
    width: 6em;
    color: rgb(136, 152, 177);
  }
  li {
    margin: 1em 0;
  }
  p {
    display: inline-block;
    text-indent: 2em;
    width: calc(100% - 6em);
    margin-left: 6em;
    margin-top: -1.5em;
  }
}
.form {
  text-align: left;
}
</style>