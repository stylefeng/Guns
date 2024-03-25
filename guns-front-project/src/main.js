import { createApp } from 'vue';
import store from './store';
import i18n from './i18n';
import App from './App.vue';
import router from './router';
import './styles/index.less';
import Antd from 'ant-design-vue';
import './assets/iconfont/iconfont';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css'
import permission from './utils/permission';
import * as antIcons from '@ant-design/icons-vue';
const app = createApp(App);

app.use(store);
app.use(i18n);
app.use(router);
app.use(permission);
app.use(VXETable);

app.use(Antd).mount('#app');

// 注册图标组件到全局
Object.keys(antIcons).forEach(key => {
  app.component(key, antIcons[key]);
});
app.config.globalProperties.$antIcons = antIcons;
