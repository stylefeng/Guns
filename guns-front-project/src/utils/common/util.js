import JSEncrypt from 'jsencrypt';
import { CommonHrApi } from '@/api/CommonHrApi';

// 定义公钥
const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCochIaKWEh6IIK1pJQcJPsYhZ2AJmGNc12XeC2lsj3dHkMO9vGrXN4ZJiN3qNLlO3hERtY0UZdN8Uz18zoiL60XoOclMuuwf1TwiMA3/4Vy2NOaQdX/RgLQ8XiRobVPLMe/JTteZ6eoPrWVC5jf4kdWD7LWwgdWrnzGs/4UiWnsQIDAQAB`;

//深度克隆
export function deepClone(obj) {
  let result;
  if (Array.isArray(obj)) {
    result = [];
  } else if (typeof obj === 'object' && obj !== null) {
    result = {};
  } else {
    return obj;
  }
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = deepClone(obj[key]);
    } else {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * rsa加密
 * @author: nxy
 * @Date: 2022-10-16 21:53:44
 */
export function RsaEncry(data) {
  // 使用 RSA 公钥加密 请求响应解密的key
  const myEncrypt = new JSEncrypt();
  myEncrypt.setPublicKey(publicKey);
  const cryptRespKeyStr = myEncrypt.encrypt(data);
  return cryptRespKeyStr;
}

/**
 * 查找树
 * @param {number} param
 * @returns {number}
 */
export function findTree(treeData = [], search, matchKey = 'id', childrenKey = 'children') {
  let result = [];
  treeData.forEach(treeItem => {
    let resultItem = {};
    if (treeItem[childrenKey] && treeItem[childrenKey].length) {
      resultItem[childrenKey] = findTree(treeItem[childrenKey], search, matchKey, childrenKey);
    }
    if (search === treeItem[matchKey]) {
      resultItem = { ...treeItem };
    }
    if (resultItem[matchKey]) {
      result.push(resultItem);
    }
    if (resultItem[childrenKey] && resultItem[childrenKey].length) {
      resultItem = { ...treeItem, childrenKey: resultItem[childrenKey] };
      result.push(resultItem);
    }
  });
  return result;
}

//驼峰转下划线
export function camelToUnderline(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

//下划线转驼峰
export function underlineToCamel(str) {
  return str.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());
}

/**
 * 下载文件
 * @param fileName
 * @param content
 */
export function downloadFile(fileName, content) {
  if (!content) {
    return;
  }
  if (!fileName) {
    fileName = 'noname.json';
  }
  if (typeof content === 'object') {
    content = JSON.stringify(content);
  }
  let blob = new Blob([content], { type: 'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
}

/**
 * 是否是移动端
 * @returns
 */
export function isMobile() {
  if (
    window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    return true; // 移动端
  } else {
    return false; // PC端
  }
}

/**
 * 获取随机数
 * @param {*} number 
 * @returns 
 */
export function getRandomNumber(number) {
  var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = 0; i < number; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}


/**
 * 生成key
 * @param [formItem] 需要生成 key 的控件，可选，如果不传，默认返回一个唯一 key
 */
export async function getBusinessMaxSort(code) {
  if (code) {
    const res = await CommonHrApi.getBusinessMaxSort(code);
    return Number(res);
  }
  return 1000;
}
