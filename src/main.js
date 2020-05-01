import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Row,
  Col,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Button,
  Message,
  Tag,
  Pagination,
  Form,
  FormItem,
  Input,
  Dialog,
  Radio,
  Popconfirm,
  DatePicker,
  Card
} from 'element-ui';

Vue.use(Row).use(Col).use(Table).use(TableColumn).use(Tabs).use(TabPane).use(Button).use(Tag).use(Pagination).use(Form).use(FormItem).use(Input).use(Dialog).use(Radio).use(Popconfirm).use(DatePicker).use(Card)
Vue.prototype.$message = Message;
Vue.config.productionTip = false
Vue.prototype.$echarts = require('echarts')
Vue.prototype.$mock = require('mockjs')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')