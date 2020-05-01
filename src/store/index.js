import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabName:'list',//打开哪一个tab，用于编辑按钮点击后自动跳转
    goodDetail:{},
    totalGoods:[]
  },
  mutations: {
    changeTab(state,name){
      state.tabName = name
    },
    getDetail(state,goodDetail){
      state.goodDetail = goodDetail
    }
  },
  actions: {
  },
  modules: {
  }
})
