/**
 * 按钮级权限控制
 */
import { useUserStore } from '@/store/modules/user';

/* 判断数组是否有某些值 */
function arrayHas(array, value) {
  if (!value) {
    return true;
  }
  if (!array) {
    return false;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (array.indexOf(value[i]) === -1) {
        return false;
      }
    }
    return true;
  }
  return array.indexOf(value) !== -1;
}

/* 判断数组是否有任意值 */
function arrayHasAny(array, value) {
  if (!value) {
    return true;
  }
  if (!array) {
    return false;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (array.indexOf(value[i]) !== -1) {
        return true;
      }
    }
    return false;
  }
  return array.indexOf(value) !== -1;
}

/**
 * 是否有某些权限
 * @param value 权限字符或字符数组
 */
export function hasPermission(value) {
  const userStore = useUserStore();
  return arrayHas(userStore?.authorities, value);
}

/**
 * 是否有任意权限
 * @param value 权限字符或字符数组
 */
export function hasAnyPermission(value) {
  const userStore = useUserStore();
  return arrayHasAny(userStore?.authorities, value);
}

export default {
  install(app) {
    // 添加自定义指令
    app.directive('role', {
      mounted: (el, binding) => {
        if (!hasRole(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      }
    });
    app.directive('any-role', {
      mounted: (el, binding) => {
        if (!hasAnyRole(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      }
    });
    app.directive('permission', {
      mounted: (el, binding) => {
        if (!hasPermission(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      }
    });
    app.directive('any-permission', {
      mounted: (el, binding) => {
        if (!hasAnyPermission(binding.value)) {
          el.parentNode?.removeChild(el);
        }
      }
    });
  }
};
