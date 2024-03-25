/**
 * axios 实例
 */
import axios from 'axios';
import { unref } from 'vue';
import router from '@/router';
import { Modal, message } from 'ant-design-vue/es';
import { API_BASE_PREFIX, TOKEN_HEADER_NAME } from '@/config/setting';
import { getToken, setToken } from '../token-util';
import { logout } from '../page-tab-util';

const service = axios.create({
  baseURL: API_BASE_PREFIX
});

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 添加 token 到 header
    const token = getToken();
    if (token && config.headers) {
      config.headers[TOKEN_HEADER_NAME] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  res => {
    // 请求成功，token自动续期
    if (res.data?.code === '00000') {
      const token = res.headers[TOKEN_HEADER_NAME.toLowerCase()];
      if (token) {
        setToken(token, true);
      }
      return res;
    }

    // 处理响应错误，请求异常自动提示错误信息，如果是B0301就跳转到登录界面
    return processErrorResponse(res);
  },
  error => {
    // 处理响应错误
    return processErrorResponse(error.response);
  }
);

/**
 * 处理错误响应
 */
const processErrorResponse = function (response) {
  // 如果是非B0301，则提示错误信息
  if (response.data.code !== 'B0301') {
    message.error(response.data.message);
  } else {
    // 如果是B0301，则跳转登录界面
    const currentPath = unref(router.currentRoute).path;
    if (currentPath === '/') {
      logout(true);
    } else {
      Modal.destroyAll();
      Modal.info({
        title: '系统提示',
        content: '登录状态已过期, 请退出重新登录!',
        okText: '重新登录',
        onOk: () => {
          logout(false, currentPath);
        }
      });
    }
  }
  return Promise.reject(response.data);
};
export default service;
