<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      singleDetail: {} //该商品详情
    };
  },
  methods: {
    //页面数据的初始化
    init() {
      //数据伪造
      let Random = this.$mock.Random;
      for (let i = 0; i < 56; i++) {
        this.listData.push({
          id: Random.increment(100),
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
      this.$store.commit("changeTab", "edit");
      this.$store.commit("getDetail", data);
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
    }
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
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
</style>