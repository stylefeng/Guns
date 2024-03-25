<!--字典类型选择组件-->
<template>
  <a-select v-model:value="value" @select="selectOption">
    <template v-if="valueType === 'dictTypeId'">
      <a-select-option v-for="dictType in dictTypeList" :key="dictType.dictTypeId" :value="dictType.dictTypeId">
        {{ dictType.dictTypeName }}
      </a-select-option>
    </template>
    <template v-if="valueType === 'dictTypeCode'">
      <a-select-option v-for="dictType in dictTypeList" :key="dictType.dictTypeId" :value="dictType.dictTypeCode">
        {{ dictType.dictTypeName }}
      </a-select-option>
    </template>
  </a-select>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import { SysDictTypeApi } from './api/SysDictTypeApi';

export default {
  name: 'DictTypeSelect',
  props: {
    value: {
      type: String,
      required: false
    },
    valueType: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const data = reactive({
      dictTypeList: null
    });

    onMounted(async () => {
      data.dictTypeList = await SysDictTypeApi.getDictTypeList();
    });

    const selectOption = value => {
      context.emit('update:value', value);
    };

    return {
      ...toRefs(data),
      selectOption
    };
  }
};
</script>
