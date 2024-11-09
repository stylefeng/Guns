<!--字典选择组件-->
<template>
  <a-checkbox-group :disabled="disabled" v-model:value="modelValue" @change="changeOption">
    <a-checkbox
      v-for="dict in dictList"
      :key="valueType === 'dictId' ? dict.dictId : dict.dictCode"
      :value="valueType === 'dictId' ? dict.dictId : dict.dictCode"
    >
      {{ dict.dictName }}
    </a-checkbox>
  </a-checkbox-group>
</template>

<script>
import { onMounted, reactive, toRefs, watch } from 'vue';
import { SysDictTypeApi } from './api/SysDictTypeApi';

export default {
  name: 'DictCheckbox',
  emits: ['update:value', 'change'],
  props: {
    // 字典类型编码，通过字典类型编码来获取下拉选择的字典
    dictTypeCode: {
      type: String,
      required: false
    },
    // 字典类型id，通过字典类型id来获取下拉选择的字典
    dictTypeId: {
      type: String,
      required: false
    },
    // 传递进来的字典值
    value: {
      type: [String, Array],
      required: true,
      default: ''
    },
    // 传递进来的值是字典编码还是字典id
    valueType: {
      type: String,
      required: true,
      default: 'dictCode'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否正常保存，不是转json格式
    normal: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const data = reactive({
      dictList: null,
      modelValue: []
    });

    onMounted(async () => {
      setModeValue();
      // 如果传递了字典编码，则根据字典编码查询
      if (props.dictTypeCode) {
        data.dictList = await SysDictTypeApi.getDictListByParams({ dictTypeCode: props.dictTypeCode });
      }

      // 如果传递了字典类型的id，则根据字典类型id查询
      if (props.dictTypeId) {
        data.dictList = await SysDictTypeApi.getDictListByParams({ dictTypeId: props.dictTypeId });
      }
    });

    const changeOption = value => {
      let valueData = props.normal ? value : JSON.stringify(value);
      context.emit('update:value', valueData);
      context.emit('change', valueData);
    };

    // 设置值
    const setModeValue = () => {
      if (props.value) {
        data.modelValue = props.normal ? props.value : JSON.parse(props.value);
      } else {
        data.modelValue = [];
      }
    };

    watch(
      () => props.value,
      val => {
        setModeValue();
      },
      { deep: true }
    );

    watch(
      () => props.dictTypeCode,
      async () => {
        // 如果传递了字典编码，则根据字典编码查询
        if (props.dictTypeCode) {
          data.dictList = await SysDictTypeApi.getDictListByParams({ dictTypeCode: props.dictTypeCode });
        }
      },
      { deep: true }
    );
    watch(
      () => props.dictTypeId,
      async () => {
        // 如果传递了字典id，则根据字典id查询
        if (props.dictTypeId) {
          data.dictList = await SysDictTypeApi.getDictListByParams({ dictTypeId: props.dictTypeId });
        }
      },
      { deep: true }
    );

    return {
      ...toRefs(data),
      changeOption,
      setModeValue
    };
  }
};
</script>
