import Vue from 'vue'
import VueRouter from "vue-router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.min.css";

import App from './App.vue'
import List from "./pages/list.vue";
import Home from "./pages/home.vue";

Vue.use(VueRouter);
Vue.use(Antd);
Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/list",
      component: List
    }
  ]
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
