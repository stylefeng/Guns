/**
 * token 操作封装
 */
import { TOKEN_STORE_NAME } from '@/config/setting';

/**
 * 获取缓存的 token
 */
export function getToken() {
  const token = localStorage.getItem(TOKEN_STORE_NAME);
  if (!token) {
    return sessionStorage.getItem(TOKEN_STORE_NAME);
  }
  return token;
}

/**
 * 缓存 token
 * @param token token
 * @param remember 是否永久存储
 */
export function setToken(token, remember) {
  removeToken();
  if (token) {
    if (remember) {
      localStorage.setItem(TOKEN_STORE_NAME, token);
    } else {
      sessionStorage.setItem(TOKEN_STORE_NAME, token);
    }
  }
}

/**
 * 移除 token
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_STORE_NAME);
  sessionStorage.removeItem(TOKEN_STORE_NAME);
  sessionStorage.removeItem('ACTIVE_APP');
}
