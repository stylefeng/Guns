<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="20">
      <a-col :span="24">
        <a-form-item label="数据库名称:" name="dbName">
          <a-input v-model:value="form.dbName" placeholder="请输入数据库名称" allow-clear autocomplete="off" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="JDBC驱动:" name="jdbcDriver">
          <a-select v-model:value="form.jdbcDriver" defaultActiveFirstOption>
            <a-select-option value="com.mysql.cj.jdbc.Driver">Mysql</a-select-option>
            <a-select-option value="oracle.jdbc.OracleDriver">Oracle</a-select-option>
            <a-select-option value="net.sourceforge.jtds.jdbc.Driver">Sql Server</a-select-option>
            <a-select-option value="org.postgresql.Driver">Postgre SQL</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="JDBC账号:" name="username">
          <a-input v-model:value="form.username" placeholder="请输入JDBC账号" allow-clear autocomplete="off" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="JDBC密码:" name="password">
          <a-input v-model:value="form.password" placeholder="请输入JDBC密码" allow-clear autocomplete="off" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="JDBC URL:" name="jdbcUrl">
          <a-input v-model:value="form.jdbcUrl" placeholder="请输入URL" allow-clear autocomplete="off" />
          <a-tooltip v-for="(url, index) in urlList" :key="index + 'url'">
            <template #title>{{ url.title }}</template>
            <a-tag class="urltag" @click="urlClick(url.title)">{{ url.name }}</a-tag>
          </a-tooltip>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item label="数据源备注:" name="remarks">
          <a-input v-model:value="form.remarks" placeholder="请输入数据源备注" allow-clear autocomplete="off" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup name="DataSourceForm">
import { reactive, ref } from 'vue';

const props = defineProps({
  // 表单数据
  form: Object
});

// 验证规则
const rules = reactive({
  dbName: [{ required: true, message: '请输入数据源名称', type: 'string', trigger: 'blur' }],
  jdbcDriver: [{ required: true, message: '请选择数据源驱动', type: 'string', trigger: 'blur' }],
  username: [{ required: true, message: '请输入jdbc账号', type: 'string', trigger: 'blur' }],
  password: [{ required: true, message: '请输入jdbc密码', type: 'string', trigger: 'blur' }],
  jdbcUrl: [{ required: true, message: '请输入url', type: 'string', trigger: 'blur' }]
});

// url列表
const urlList = ref([
  {
    title:
      'jdbc:mysql://127.0.0.1:3306/guns?autoReconnect=true&useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=CONVERT_TO_NULL&useSSL=false&serverTimezone=CTT',
    name: 'mysql'
  },
  {
    title: 'jdbc:oracle:thin:@127.0.0.1:1521:ORCLCDB',
    name: 'oracle'
  },
  {
    title: 'jdbc:jtds:sqlserver://127.0.0.1:1433;DatabaseName=guns',
    name: 'sql server'
  },
  {
    title: 'jdbc:postgresql://127.0.0.1:5432/guns',
    name: 'postgre sql'
  }
]);

/**
 * 点击jdbc url实现添加路径
 */
const urlClick = url => {
  props.form.jdbcUrl = url;
};
</script>

<style scoped>
.urltag {
  cursor: pointer;
}
</style>
