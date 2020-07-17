import Vue from 'vue';
import App from './App.vue';
import Router from './router';
import Store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/libs/env';
import '@/libs/util';
import '@/libs/http';
import '@/libs/common';

Vue.use(ElementUI);

new Vue({
  router: Router,
  store: Store,
  render: h => h(App)
}).$mount('#app');
