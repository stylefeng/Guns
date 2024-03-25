import { createIframeComponent } from './iframe-component';
import { formatTreeData } from '@/components/layout/util';
/**
 * 菜单数据转成路由数据
 * @param menus 菜单数据
 * @param getComponent 加载组件的方法
 * @param added 已添加的路由
 * @param redirectPath 刷新路由的地址
 * @param redirectComponent 刷新路由的组件
 * @param redirectPathMatch 刷新路由的匹配表达式
 * @param parentPath 父级路由地址
 */
export function menuToRoutes(menus, getComponent, added, redirectPath, redirectComponent, redirectPathMatch, parentPath) {
  if (!(menus == null ? void 0 : menus.length)) {
    return;
  }
  const routes = [];
  const addedRoutes = added ? [...added] : [];
  menus.forEach(item => {
    const route = menuToRoute(item, getComponent, addedRoutes, redirectPath, redirectComponent, redirectPathMatch);
    if (route) {
      routes.push(route);
    }
  });
  if (routes.length && redirectPath && redirectComponent) {
    const pathMatch = redirectPathMatch ?? '/:path(.*)';
    const temp = {
      path: (parentPath ?? '') + redirectPath + pathMatch,
      meta: { hideFooter: true }
    };
    const route = menuToRoute(temp, () => redirectComponent, []);
    if (route) {
      routes.push(route);
    }
  }
  return routes;
}
/**
 * 菜单数据转成路由数据
 * @param menu 菜单数据
 * @param getComponent 加载组件的方法
 * @param added 已添加的路由
 * @param redirectPath 刷新路由的地址
 * @param redirectComponent 刷新路由的组件
 * @param redirectPathMatch 刷新路由的匹配表达式
 */
export function menuToRoute(menu, getComponent, added, redirectPath, redirectComponent, redirectPathMatch) {
  const meta = { ...menu.meta };
  const p = meta.routePath || menu.path;
  let path = (p == null ? void 0 : p.includes('?')) ? p.substring(0, p.indexOf('?')) : p;
  if (path && !isExternalLink(path) && !pathIsAdd(path, added)) {
    const name = menu.name || camelCase(path);
    let component;
    if (menu.component && isExternalLink(menu.component)) {
      component = createIframeComponent(name, menu.component);
      meta.iframe = menu.component;
      meta.hideFooter = true;
    } else {
      component = getComponent(menu.component, menu, name);
    }
    added.push({ path });
    return {
      name,
      path,
      meta,
      component,
      redirect: menu.redirect,
      children: menuToRoutes(menu.children, getComponent, added, redirectPath, redirectComponent, redirectPathMatch, path)
    };
  }
}

export function pathIsAdd(path, data) {
  let isAdd = false;
  eachTreeData(data, item => {
    if (path === item.path) {
      isAdd = true;
      return false;
    }
  });
  return isAdd;
}

export function camelCase(str) {
  const val = str.replace(/[-|/](\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
  return val.charAt(0).toUpperCase() + val.slice(1);
}

/**
 * 格式化菜单数据
 * @param data 数据
 * @param childField 子级的字段名称
 */
export function formatMenus(data, childField = 'children') {
  let homePath;
  let homeTitle;
  const menus = formatTreeData(
    data,
    item => {
      var _a, _b;
      const meta = typeof item.meta === 'string' ? JSON.parse(item.meta || '{}') : item.meta;
      let path = (meta == null ? void 0 : meta.fullPath) || item.fullPath || item.path;
      if (item.appDesignBusinessId && (!item.children || item.children.length == 0)) {
        path = path + '?businessId=' + item.appDesignBusinessId;
      }
      const component = ((_a = item.component) == null ? void 0 : _a.startsWith('/')) ? item.component.substring(1) : item.component;
      const menu = {
        path,
        component,
        name: (meta == null ? void 0 : meta.name) || item.name,
        redirect: item.redirect,
        meta: {
          title: item.title,
          icon: item.icon,
          color: item.color,
          hide: item.hide,
          active: item.active,
          breadcrumb: item.breadcrumb,
          hideFooter: item.hideFooter,
          hideSidebar: item.hideSidebar,
          tabUnique: item.tabUnique,
          closable: item.closable,
          keepAlive: item.keepAlive,
          routePath: item.path,
          ...meta
        }
      };
      const children =
        (_b = item[childField]) == null
          ? void 0
          : _b.filter(d => {
              var _a2;
              return !(((_a2 = d.meta) == null ? void 0 : _a2.hide) ?? d.hide);
            });
      if (!(children == null ? void 0 : children.length)) {
        if (!homePath && path && !isExternalLink(path)) {
          homePath = path;
          homeTitle = menu.meta.title;
        }
      } else {
        const childPath = children[0].path || children[0].fullPath;
        if (childPath) {
          if (!menu.redirect) {
            menu.redirect = childPath;
          }
          if (!menu.path) {
            menu.path = childPath.substring(0, childPath.lastIndexOf('/'));
          }
        }
      }
      if (!path) {
        console.error('菜单 path 不能为空且要唯一: ', item);
        return;
      }
      return menu;
    },
    childField
  );
  return { menus, homePath, homeTitle };
}

/**
 * 判断是否是外链
 * @param url 地址
 */
export function isExternalLink(url) {
  return !!(url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')));
}

/**
 * 遍历 children 形式数据
 * @param data 需要遍历的数据
 * @param callback 回调
 * @param childrenField children 字段名
 */
export function eachTreeData(data = [], callback, childrenField = 'children', parent) {
  if (data) {
    data.forEach((d, i) => {
      if (callback && callback(d, i, parent) !== false && d[childrenField]?.length) {
        eachTreeData(d[childrenField], callback, childrenField, d);
      }
    });
  }
}
/**
 * parentId 形式数据转 children 形式参数
 * @param {*} option 
 * @returns 
 */
export function toTreeData(option) {
  const data = option.data;
  const idField = option.idField || "id";
  const parentIdField = option.parentIdField || "parentId";
  const childrenField = option.childrenField || "children";
  const parentIdIsNull = option.parentId == null;
  const parentId = parentIdIsNull ? [] : option.parentId;
  const addParentIds = option.addParentIds;
  const parentIdsField = option.parentIdsField || "parentIds";
  const parentIds = option.parentIds;
  if (data == null) {
    return [];
  }
  if (parentIdIsNull) {
    data.forEach((d) => {
      let flag = true;
      for (let i = 0; i < data.length; i++) {
        if (d[parentIdField] == data[i][idField]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        parentId.push(d[parentIdField]);
      }
    });
  }
  const result = [];
  data.forEach((d) => {
    if (d[idField] == d[parentIdField]) {
      throw new Error(
        [
          "data error: {",
          idField + ": ",
          JSON.stringify(d[idField]),
          parentIdField + ": ",
          JSON.stringify(d[parentIdField]),
          "}"
        ].join("")
      );
    }
    if (Array.isArray(parentId) ? parentId.includes(d[parentIdField]) : d[parentIdField] == parentId) {
      const r = { ...d };
      const children = toTreeData({
        data,
        idField,
        parentIdField,
        childrenField,
        parentId: d[idField],
        addParentIds,
        parentIdsField,
        parentIds: (parentIds != null ? parentIds : []).concat([d[idField]])
      });
      if (children.length > 0) {
        r[childrenField] = children;
      }
      if (addParentIds) {
        r[parentIdsField] = parentIds != null ? parentIds : [];
      }
      result.push(r);
    }
  });
  return result;
}
