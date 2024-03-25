<template>
  <a-spin :spinning="loading">
    <a-row class="myTransfer">
      <a-col :span="24">
        <a-transfer
          :data-source="sourceField"
          :titles="['未选', '已选']"
          :target-keys="targetField"
          :render="item => item.title"
          @change="handleChange"
        />
      </a-col>
    </a-row>
  </a-spin>
</template>

<script setup name="ConfigData">
import { ref } from 'vue';
import { ThemeTemplateFieldApi } from '@/views/system/backend/theme/attr/api/ThemeTemplateFieldApi';
import { ThemeTemplateRelApi } from '../api/ThemeTemplateRelApi';

// 模板ID
const templateId = ref('');

// 页面是否加载中，用在获取数据时
const loading = ref(false);

// 未选数据
const sourceField = ref([]);

// 已选数据
const targetField = ref([]);

const targetData = ref(null);

/**
 * 打开配置
 *
 * @author fengshuonan
 * @date 2021/12/28 09:13:28
 */
const openConfig = id => {
  templateId.value = id;

  // 获取属性数据
  loadFieldResource();
};

defineExpose({
  openConfig
});

/**
 * 加载数据
 *
 * @author fengshuonan
 * @date 2021/12/28 09:19:59
 */
const loadFieldResource = async () => {
  // 开启加载
  loading.value = true;

  // 获取数据
  let sourceData = await ThemeTemplateFieldApi.findNotRelList({ templateId: templateId.value });
  targetData.value = await ThemeTemplateFieldApi.findRelList({ templateId: templateId.value });

  sourceField.value = [];
  targetField.value = [];
  // 只获取属性编码
  if (sourceData != null) {
    for (const item of sourceData) {
      sourceField.value.push({
        key: item.fieldCode,
        title: item.fieldName
      });
    }
  }

  if (targetData.value != null) {
    for (const item of targetData.value) {
      sourceField.value.push({
        key: item.fieldCode,
        title: item.fieldName
      });
      targetField.value.push(item.fieldCode);
    }
  }

  // 关闭加载
  loading.value = false;
};

/**
 * 处理两栏之间的移动
 *
 * @author fengshuonan
 * @date 2021/12/28 15:59:01
 */
const handleChange = async (nextTargetKeys, direction, moveKeys) => {
  targetData.value = nextTargetKeys;
  if (direction === 'left') {
    await ThemeTemplateRelApi.del({ templateId: templateId.value, fieldCodes: moveKeys });
  } else {
    await ThemeTemplateRelApi.add({ templateId: templateId.value, fieldCodes: moveKeys });
  }

  loadFieldResource();
};
</script>

<style lang="less" scoped>
:deep(.myTransfer) {
  .ant-transfer-list {
    width: 100%;
    height: 400px;
  }
}
</style>
