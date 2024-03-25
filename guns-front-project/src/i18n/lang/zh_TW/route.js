/* 菜单路由 */
export default {
  login: { _name: '登入' },
  forget: { _name: '忘記密碼' },
  dashboard: {
    _name: 'Dashboard',
    workplace: { _name: '工作臺' },
    analysis: { _name: '分析頁' },
    monitor: { _name: '監控頁' }
  },
  system: {
    _name: '系統管理',
    user: {
      _name: '用戶管理',
      add: { _name: '添加用戶' },
      edit: { _name: '編輯用戶' },
      details: { _name: '' }
    },
    role: { _name: '角色管理' },
    menu: { _name: '選單管理' },
    dictionary: { _name: '字典管理' },
    organization: { _name: '機构管理' },
    loginRecord: { _name: '登入日誌' },
    operationRecord: { _name: '操作日誌' },
    file: { _name: '檔案管理' }
  },
  form: {
    _name: '表單頁面',
    basic: { _name: '基礎表單' },
    advanced: { _name: '複雜表單' },
    step: { _name: '分步表單' }
  },
  list: {
    _name: '清單頁面',
    basic: {
      _name: '基礎清單',
      add: { _name: '添加用戶' },
      edit: { _name: '編輯用戶' },
      details: {
        ':id': { _name: '' }
      }
    },
    advanced: { _name: '複雜清單' },
    card: {
      _name: '卡片清單',
      project: { _name: '項目清單' },
      application: { _name: '應用清單' },
      article: { _name: '文章清單' }
    }
  },
  result: {
    _name: '結果頁面',
    success: { _name: '成功頁' },
    fail: { _name: '失敗頁' }
  },
  exception: {
    _name: '异常頁面',
    403: { _name: '403' },
    404: { _name: '404' },
    500: { _name: '500' }
  },
  user: {
    _name: '個人中心',
    profile: { _name: '個人資料' },
    message: { _name: '我的消息' }
  },
  extension: {
    _name: '擴展組件',
    tag: { _name: '標籤組件' },
    dialog: { _name: '拖拽彈窗' },
    file: { _name: '檔案清單' },
    upload: { _name: '圖片上傳' },
    dragsort: { _name: '拖拽排序' },
    colorPicker: { _name: '顏色選擇' },
    regions: { _name: '城市選擇' },
    printer: { _name: '列印挿件' },
    excel: { _name: 'excel挿件' },
    countUp: { _name: '滾動數字' },
    tableSelect: { _name: '表格下拉' },
    player: { _name: '視頻播放' },
    map: { _name: '地圖組件' },
    qrCode: { _name: '二維碼' },
    barCode: { _name: '條形碼' },
    editor: { _name: '富文本框' },
    markdown: { _name: 'markdown' },
    dashboard: { _name: '儀錶盤' },
    tour: { _name: '引導組件' },
    watermark: { _name: '水印組件' },
    split: { _name: '水印组件' }
  },
  example: {
    _name: '常用實例',
    table: { _name: '表格實例' },
    menuBadge: { _name: '選單徽章' },
    eleadmin: { _name: '內嵌頁面' },
    eleadminDoc: { _name: '内嵌文檔' },
    document: { _name: '案卷調整' },
    choose: { _name: '批量選擇' }
  },
  'https://eleadminCom/goods/9': { _name: '獲取授權' }
};
