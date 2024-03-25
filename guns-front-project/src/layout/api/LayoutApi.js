import request from '@/utils/request/request';

/**
 * 获取当前登录的用户信息、菜单、权限、角色
 */
export async function getUserInfo() {
  const res = await request.get('/userIndexInfo');
  if (res.data.code === '00000' && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改当前登录的用户密码
 */
export async function updatePassword(data) {
  const res = await request.post('/sysUser/updatePassword', data);
  if (res.data.code === '00000') {
    return res.data.message ?? '修改成功';
  }
  return Promise.reject(new Error(res.data.message));
}
