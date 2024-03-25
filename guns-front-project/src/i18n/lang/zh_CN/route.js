/* 菜单路由 */
export default {
  login: { _name: '登录' },
  forget: { _name: '忘记密码' },
  dashboard: {
    _name: '控制面板',
    workplace: { _name: '工作台' },
    analysis: { _name: '分析页' },
    monitor: { _name: '监控页' }
  },
  system: {
    _name: '系统用户',
    user: {
      _name: '用户管理',
      add: { _name: '添加用户' },
      edit: { _name: '修改用户' },
      details: { _name: '' }
    },
    role: { _name: '角色管理' },
    menu: { _name: '菜单管理' },
    dictionary: { _name: '字典管理' },
    organization: { _name: '机构管理' },
    loginRecord: { _name: '登录日志' },
    operationRecord: { _name: '操作日志' },
    file: { _name: '文件管理' }
  },
  form: {
    _name: '表单页面',
    basic: { _name: '基础表单' },
    advanced: { _name: '复杂表单' },
    step: { _name: '分步表单' }
  },
  list: {
    _name: '列表页面',
    basic: {
      _name: '基础列表',
      add: { _name: '添加用户' },
      edit: { _name: '修改用户' },
      details: {
        ':id': { _name: '' }
      }
    },
    advanced: { _name: '复杂列表' },
    card: {
      _name: '卡片列表',
      project: { _name: '项目列表' },
      application: { _name: '应用列表' },
      article: { _name: '文章列表' }
    }
  },
  result: {
    _name: '结果页面',
    success: { _name: '成功页' },
    fail: { _name: '失败页' }
  },
  exception: {
    _name: '异常页面',
    403: { _name: '403' },
    404: { _name: '404' },
    500: { _name: '500' }
  },
  user: {
    _name: '个人中心',
    profile: { _name: '个人资料' },
    message: { _name: '我的消息' }
  },
  extension: {
    _name: '扩展组件',
    tag: { _name: '标签组件' },
    dialog: { _name: '拖拽弹窗' },
    file: { _name: '文件列表' },
    upload: { _name: '图片上传' },
    dragsort: { _name: '拖拽排序' },
    colorPicker: { _name: '颜色选择' },
    regions: { _name: '城市选择' },
    printer: { _name: '打印插件' },
    excel: { _name: 'excel插件' },
    countUp: { _name: '滚动数字' },
    tableSelect: { _name: '表格下拉' },
    player: { _name: '视频播放' },
    map: { _name: '地图组件' },
    qrCode: { _name: '二维码' },
    barCode: { _name: '条形码' },
    editor: { _name: '富文本框' },
    markdown: { _name: 'markdown' },
    dashboard: { _name: '仪表盘' },
    tour: { _name: '引导组件' },
    watermark: { _name: '水印组件' },
    split: { _name: '分割面板' }
  },
  example: {
    _name: '常用实例',
    table: { _name: '表格实例' },
    menuBadge: { _name: '菜单徽章' },
    eleadmin: { _name: '内嵌页面' },
    eleadminDoc: { _name: '内嵌文档' },
    document: { _name: '案卷调整' },
    choose: { _name: '批量选择' }
  },
  'https://eleadminCom/goods/9': { _name: '获取授权' }
};
