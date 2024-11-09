<!--字典选择组件-->
<template>
  <!--带多选-->
  <a-select
    :disabled="disabled"
    v-model:value="modelValue"
    @change="changeOption"
    :placeholder="placeholder"
    mode="multiple"
    v-if="multiple"
  >
    <a-select-option
      v-for="dict in dictList"
      :key="valueType === 'dictId' ? dict.dictId : dict.dictCode"
      :value="valueType === 'dictId' ? dict.dictId : dict.dictCode"
    >
      {{ dict.dictName }}
    </a-select-option>
  </a-select>
  <!--不带多选-->
  <a-select :disabled="disabled" v-model:value="modelValue" @select="selectOption" :placeholder="placeholder" v-else>
    <a-select-option
      v-for="dict in dictList"
      :key="valueType === 'dictId' ? dict.dictId : dict.dictCode"
      :value="valueType === 'dictId' ? dict.dictId : dict.dictCode"
    >
      {{ dict.dictName }}
    </a-select-option>
  </a-select>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from 'vue';
import { SysDictTypeApi } from './api/SysDictTypeApi';

export default {
  name: 'DictSelect',
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
    // 是否可以多选
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: true,
      default: '请选择'
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
      modelValue: null
    });

    onMounted(async () => {
      setModelValue();
      // 如果传递了字典编码，则根据字典编码查询
      if (props.dictTypeCode) {
        data.dictList = await SysDictTypeApi.getDictListByParams({ dictTypeCode: props.dictTypeCode });
      }

      // 如果传递了字典类型的id，则根据字典类型id查询
      if (props.dictTypeId) {
        data.dictList = await SysDictTypeApi.getDictListByParams({ dictTypeId: props.dictTypeId });
      }
    });

    // 设置值
    const setModelValue = () => {
      data.modelValue = props.normal ? props.value : props.multiple && props.value ? JSON.parse(props.value) : props.value || [];
    };

    const selectOption = value => {
      let valueData = props.normal ? value : props.multiple ? JSON.stringify(value) : value;
      context.emit('update:value', valueData);
      context.emit('change', valueData);
    };

    const changeOption = value => {
      let valueData = props.normal ? value : props.multiple ? JSON.stringify(value) : value;
      context.emit('update:value', valueData);
      context.emit('change', valueData);
    };

    watch(
      () => props.value,
      val => {
        setModelValue();
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
      selectOption,
      changeOption,
      setModelValue
    };
  }
};
</script>
