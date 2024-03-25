<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="24">
        <a-form-item label="选择应用:" name="appId">
          <div class="list">
            <div
              class="list-item"
              v-for="appItem in appList"
              :key="appItem.appId"
              :class="form.appId && form.appId == appItem.appId ? 'active' : ''"
              @click="appClick(appItem)"
            >
              <img :src="appItem.appIconWrapper" alt="" class="img" />
              <span>{{ appItem.appName }}</span>
            </div>
          </div>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="菜单名称:" name="menuName">
          <a-input v-model:value="form.menuName" allow-clear placeholder="请输入菜单名称" @change="menuNameBlur" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="菜单编码:" name="menuCode">
          <a-input v-model:value="form.menuCode" allow-clear placeholder="请输入菜单编码" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="上级菜单：" name="menuParentName">
          <a-input v-model:value="form.menuParentName" allow-clear placeholder="请输入上机菜单" disabled />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="排序:" name="menuSort">
          <a-input-number
            v-model:value="form.menuSort"
            :min="0"
            style="width: 100%"
            placeholder="请输入排序"
            allow-clear
            autocomplete="off"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="菜单图标:" name="antdvIcon">
          <icon-select v-model:value="form.antdvIcon" placeholder="请选择图标"></icon-select>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="菜单类型:" name="menuType">
          <div class="list">
            <div
              class="list-item"
              v-for="typeItem in menuTypeList"
              :key="typeItem.id"
              :class="form.menuType && form.menuType == typeItem.id ? 'active' : ''"
              @click="typeClick(typeItem)"
            >
              <i class="iconfont" :class="typeItem.icon" :style="{ color: typeItem.color, fontSize: '16px', marginRight: '10px' }"></i>
              <span>{{ typeItem.name }}</span>
            </div>
            <a-tooltip>
              <template #title
                >后台菜单：后台管理系统菜单，页面左侧是菜单。<br />
                纯前端路由界面：无菜单的纯净版界面，前端完全自定义的界面。<br />
                内部链接：后台管理系统，点击菜单直接在内部打开链接。<br />
                外部链接：点击菜单后跳转到新的浏览器tab标签页打开。<br />
                应用设计：绑定应用设计的业务展示
              </template>
              <question-circle-outlined />
            </a-tooltip>
          </div>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <div class="card-title">Vue前端组件配置</div>
      </a-col>
      <a-col :span="12" v-if="props.form.menuType != 40">
        <a-form-item name="antdvRouter">
          <template #label>
            <span style="margin-right: 10px">路由地址:</span>
            <a-tooltip>
              <template #title>路由地址就是浏览器访问的URL地址 </template>
              <question-circle-outlined />
            </a-tooltip>
          </template>
          <a-input v-model:value="form.antdvRouter" allow-clear placeholder="请输入路由地址" />
        </a-form-item>
      </a-col>
      <a-col :span="12" v-if="props.form.menuType == 40">
        <a-form-item name="antdvRouter">
          <template #label>
            <span style="margin-right: 10px">链接地址:</span>
            <a-tooltip>
              <template #title>链接地址请以：http://开头 </template>
              <question-circle-outlined />
            </a-tooltip>
          </template>
          <a-input v-model:value="form.antdvRouter" allow-clear placeholder="请输入链接地址" />
        </a-form-item>
      </a-col>
      <a-col :span="12" v-if="[10, 20].includes(props.form.menuType)">
        <a-form-item name="antdvComponent">
          <template #label>
            <span style="margin-right: 10px">组件代码路径:</span>
            <a-tooltip>
              <template #title>组件代码路径为views目录下的组件路径 </template>
              <question-circle-outlined />
            </a-tooltip>
          </template>
          <a-input v-model:value="form.antdvComponent" allow-clear placeholder="请输入组件代码路径" />
        </a-form-item>
      </a-col>
      <a-col :span="12" v-if="props.form.menuType == 30">
        <a-form-item name="antdvComponent">
          <template #label>
            <span style="margin-right: 10px">链接地址:</span>
            <a-tooltip>
              <template #title>链接地址请以：http://开头 </template>
              <question-circle-outlined />
            </a-tooltip>
          </template>
          <a-input v-model:value="form.antdvComponent" allow-clear placeholder="请输入组件代码路径" />
        </a-form-item>
      </a-col>
      <a-col :span="12" v-if="[10, 20].includes(props.form.menuType)">
        <a-form-item name="antdvVisible">
          <template #label>
            <span style="margin-right: 10px">是否显示:</span>
            <a-tooltip>
              <template #title>不显示在左侧菜单上 </template>
              <question-circle-outlined />
            </a-tooltip>
          </template>
          <vxe-switch v-model="form.antdvVisible" open-value="Y" close-value="N"></vxe-switch>
        </a-form-item>
      </a-col>
      <a-col :span="12" v-if="props.form.menuType == 10">
        <a-form-item name="antdvActiveUrl">
          <template #label>
            <span style="margin-right: 10px">激活地址:</span>
            <a-tooltip>
              <template #title>打开本界面时激活的菜单路由，这里需要填写需要激活的菜单的路由地址 </template>
              <question-circle-outlined />
            </a-tooltip>
          </template>
          <a-input v-model:value="form.antdvActiveUrl" allow-clear placeholder="请输入激活地址" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup name="MenuForm">
import { onMounted, reactive, ref } from 'vue';
import { AppApi } from '../../app/api/AppApi';
import { MenuApi } from '../api/MenuApi';

const props = defineProps({
  // 表单数据
  form: Object,
  // 是否是编辑
  isUpdate: Boolean
});

// 应用列表
const appList = ref([]);
// 菜单类型列表
const menuTypeList = ref([
  {
    id: 10,
    name: '后台菜单',
    icon: 'icon-menu-type-backend',
    color: '#594d9c'
  },
  {
    id: 20,
    name: '纯前台路由界面',
    icon: 'icon-menu-type-single-page',
    color: 'green'
  },
  {
    id: 30,
    name: '内部链接',
    icon: 'icon-menu-type-inner-link',
    color: 'var(--primary-color)'
  },
  {
    id: 40,
    name: '外部链接',
    icon: 'icon-menu-type-waibulianjie',
    color: 'red'
  }
]);

// 验证规则
const rules = reactive({
  appId: [{ required: true, message: '请选择应用', type: 'string', trigger: 'blur' }],
  menuName: [{ required: true, message: '请输入菜单名称', type: 'string', trigger: 'blur' }],
  menuCode: [{ required: true, message: '请输入菜单编码', type: 'string', trigger: 'blur' }],
  menuParentName: [{ required: true, message: '请选择上级菜单', type: 'string', trigger: 'change' }],
  menuSort: [{ required: true, message: '请输入排序', type: 'number', trigger: 'blur' }],
  antdvRouter: [{ required: true, message: '请输入路由地址', type: 'string', trigger: 'blur' }],
  antdvLinkUrl: [{ required: true, message: '请输入链接地址', type: 'string', trigger: 'blur' }],
  antdvVisible: [{ required: true, message: '请选择是否显示', type: 'string', trigger: 'change' }],
});

onMounted(() => {
  getAppList();
});

const getAppList = () => {
  AppApi.list().then(res => {
    appList.value = res;
  });
};

// 应用切换
const appClick = item => {
  if (!props.isUpdate) {
    props.form.appId = item.appId;
  }
};

// 类型切换
const typeClick = item => {
  props.form.menuType = item.id;
  if (props.form.menuType == 20) {
    props.form.antdvVisible = 'N';
  }
};

// 菜单名称
const menuNameBlur = () => {
  if (props.form.menuName) {
    MenuApi.getPinyin({ name: props.form.menuName }).then(res => {
      props.form.menuCode = res;
    });
  }
};
</script>

<style scoped lang="less">
.card-title {
  width: 100%;
  border-left: 5px solid;
  border-color: var(--primary-color);
  padding-left: 10px;
  margin-bottom: 20px;
}
.list {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .list-item {
    border: 1px solid #ccc;
    padding: 5px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    .img {
      width: 14px;
      height: 14px;
      margin-right: 10px;
    }
    span {
      font-weight: bold;
    }
    &:hover {
      box-shadow: 0px 0px 10px 0px rgba(42, 130, 228, 0.9714285714285714);
    }
  }
  .active {
    box-shadow: 0px 0px 10px 0px rgba(42, 130, 228, 0.9714285714285714);
  }
}
</style>
