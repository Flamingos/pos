<template>
  <div>
    <el-tabs type="border-card" :value="nameFun()" @tab-click="tab">
      <el-tab-pane label="商品列表" :name="names[0]">
          <GoodsList></GoodsList>
      </el-tab-pane>
      <el-tab-pane label="商品上架" :name="names[1]">
          <GoodPutaway></GoodPutaway>
      </el-tab-pane>
      <el-tab-pane label="商品编辑" :name="names[2]">
          <GoodEdit></GoodEdit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import GoodsList from '@/views/GoodsList.vue'
import GoodEdit from '@/views/GoodEdit.vue'
import GoodPutaway from '@/views/GoodPutaway.vue'
export default {
    data(){
        return{
            names: ['list','putaway','edit'],
        }
    },
    components:{
        GoodsList,
        GoodEdit,
        GoodPutaway
    },
    methods:{
        //tab上使用value，使用v-model起不到效果
        nameFun(){
            return this.$store.state.tabName
        },
        tab(targetName){
            this.$store.commit('changeTab',targetName.name)
        }
    }
};
</script>

<style lang="scss" scoped>
.border-card{
    overflow: hidden;
}
</style>