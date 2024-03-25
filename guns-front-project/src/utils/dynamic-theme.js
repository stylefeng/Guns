/** 支持换主题插件 */

/**
 * 需要修改的 less 变量
 */
const variables = {
  // Blue
  '@blue-1': 'var(--blue-1)',
  '@blue-2': 'var(--blue-2)',
  '@blue-3': 'var(--blue-3)',
  '@blue-4': 'var(--blue-4)',
  '@blue-5': 'var(--blue-5)',
  '@blue-6': 'var(--blue-6)',
  '@blue-7': 'var(--blue-7)',
  '@blue-8': 'var(--blue-8)',
  '@blue-9': 'var(--blue-9)',
  '@blue-10': 'var(--blue-10)',
  // Purple
  '@purple-1': 'var(--purple-1)',
  '@purple-2': 'var(--purple-2)',
  '@purple-3': 'var(--purple-3)',
  '@purple-4': 'var(--purple-4)',
  '@purple-5': 'var(--purple-5)',
  '@purple-6': 'var(--purple-6)',
  '@purple-7': 'var(--purple-7)',
  '@purple-8': 'var(--purple-8)',
  '@purple-9': 'var(--purple-9)',
  '@purple-10': 'var(--purple-10)',
  // Cyan
  '@cyan-1': 'var(--cyan-1)',
  '@cyan-2': 'var(--cyan-2)',
  '@cyan-3': 'var(--cyan-3)',
  '@cyan-4': 'var(--cyan-4)',
  '@cyan-5': 'var(--cyan-5)',
  '@cyan-6': 'var(--cyan-6)',
  '@cyan-7': 'var(--cyan-7)',
  '@cyan-8': 'var(--cyan-8)',
  '@cyan-9': 'var(--cyan-9)',
  '@cyan-10': 'var(--cyan-10)',
  // Green
  '@green-1': 'var(--green-1)',
  '@green-2': 'var(--green-2)',
  '@green-3': 'var(--green-3)',
  '@green-4': 'var(--green-4)',
  '@green-5': 'var(--green-5)',
  '@green-6': 'var(--green-6)',
  '@green-7': 'var(--green-7)',
  '@green-8': 'var(--green-8)',
  '@green-9': 'var(--green-9)',
  '@green-10': 'var(--green-10)',
  // Pink
  '@pink-1': 'var(--pink-1)',
  '@pink-2': 'var(--pink-2)',
  '@pink-3': 'var(--pink-3)',
  '@pink-4': 'var(--pink-4)',
  '@pink-5': 'var(--pink-5)',
  '@pink-6': 'var(--pink-6)',
  '@pink-7': 'var(--pink-7)',
  '@pink-8': 'var(--pink-8)',
  '@pink-9': 'var(--pink-9)',
  '@pink-10': 'var(--pink-10)',
  // Red
  '@red-1': 'var(--red-1)',
  '@red-2': 'var(--red-2)',
  '@red-3': 'var(--red-3)',
  '@red-4': 'var(--red-4)',
  '@red-5': 'var(--red-5)',
  '@red-6': 'var(--red-6)',
  '@red-7': 'var(--red-7)',
  '@red-8': 'var(--red-8)',
  '@red-9': 'var(--red-9)',
  '@red-10': 'var(--red-10)',
  // Orange
  '@orange-1': 'var(--orange-1)',
  '@orange-2': 'var(--orange-2)',
  '@orange-3': 'var(--orange-3)',
  '@orange-4': 'var(--orange-4)',
  '@orange-5': 'var(--orange-5)',
  '@orange-6': 'var(--orange-6)',
  '@orange-7': 'var(--orange-7)',
  '@orange-8': 'var(--orange-8)',
  '@orange-9': 'var(--orange-9)',
  '@orange-10': 'var(--orange-10)',
  // Gold
  '@gold-1': 'var(--gold-1)',
  '@gold-2': 'var(--gold-2)',
  '@gold-3': 'var(--gold-3)',
  '@gold-4': 'var(--gold-4)',
  '@gold-5': 'var(--gold-5)',
  '@gold-6': 'var(--gold-6)',
  '@gold-7': 'var(--gold-7)',
  '@gold-8': 'var(--gold-8)',
  '@gold-9': 'var(--gold-9)',
  '@gold-10': 'var(--gold-10)',
  // Color used by default to control hover and active backgrounds
  '@primary-1': 'var(--primary-1)',
  '@primary-2': 'var(--primary-2)',
  '@primary-3': 'var(--primary-3)',
  '@primary-4': 'var(--primary-4)',
  '@primary-5': 'var(--primary-5)',
  '@primary-6': 'var(--primary-6)',
  '@primary-7': 'var(--primary-7)',
  '@primary-8': 'var(--primary-8)',
  '@primary-9': 'var(--primary-9)',
  '@primary-10': 'var(--primary-10)',
  // Colors
  '@primary-color': 'var(--primary-color)',
  '@primary-color-hover': 'var(--primary-color-hover)',
  '@primary-color-active': 'var(--primary-color-active)',
  '@primary-color-outline': 'var(--primary-color-outline)',
  //
  '@info-color': 'var(--info-color)',
  '@info-color-deprecated-bg': 'var(--primary-1)',
  '@info-color-deprecated-border': 'var(--primary-3)',
  //
  '@success-color': 'var(--success-color)',
  '@success-color-hover': 'var(--success-color-hover)',
  '@success-color-active': 'var(--success-color-active)',
  '@success-color-outline': 'var(--success-color-outline)',
  '@success-color-deprecated-bg': 'var(--green-1)',
  '@success-color-deprecated-border': 'var(--green-3)',
  //
  '@warning-color': 'var(--warning-color)',
  '@warning-color-hover': 'var(--warning-color-hover)',
  '@warning-color-active': 'var(--warning-color-active)',
  '@warning-color-outline': 'var(--warning-color-outline)',
  '@warning-color-deprecated-bg': 'var(--gold-1)',
  '@warning-color-deprecated-border': 'var(--gold-3)',
  //
  '@error-color': 'var(--error-color)',
  '@error-color-hover': 'var(--error-color-hover)',
  '@error-color-active': 'var(--error-color-active)',
  '@error-color-outline': 'var(--error-color-outline)',
  '@error-color-deprecated-bg': 'var(--red-1)',
  '@error-color-deprecated-border': 'var(--red-3)',
  //
  '@highlight-color': 'var(--highlight-color)',
  '@processing-color': 'var(--processing-color)',
  // Background color
  '@body-background': 'var(--body-background)',
  '@component-background': 'var(--component-background)',
  // Popover
  '@popover-background': 'var(--popover-background)',
  '@popover-customize-border-color': 'var(--popover-customize-border-color)',
  // Text Color
  '@text-color': 'var(--text-color)',
  '@text-color-secondary': 'var(--text-color-secondary)',
  '@text-color-inverse': 'var(--text-color-inverse)',
  '@icon-color-hover': 'var(--icon-color-hover)',
  '@heading-color': 'var(--heading-color)',
  // The background colors for active and hover states for things like
  '@item-hover-bg': 'var(--item-hover-bg)',
  // LINK
  '@link-hover-color': '@primary-5',
  '@link-active-color': '@primary-7',
  // Border color
  '@border-color-base': 'var(--border-color-base)',
  '@border-color-split': 'var(--border-color-split)',
  //
  '@background-color-light': 'var(--background-color-light)',
  '@background-color-base': 'var(--background-color-base)',
  // Disabled states
  '@disabled-color': 'var(--disabled-color)',
  '@disabled-bg': 'var(--disabled-bg)',
  '@disabled-color-dark': 'var(--disabled-color-dark)',
  // Shadow
  '@shadow-color': 'var(--shadow-color)',
  '@shadow-color-inverse': 'var(--shadow-color-inverse)',
  '@box-shadow-base': 'var(--box-shadow-base)',
  '@shadow-1-up': 'var(--shadow-1-up)',
  '@shadow-1-down': 'var(--shadow-1-down)',
  '@shadow-1-left': 'var(--shadow-1-left)',
  '@shadow-1-right': 'var(--shadow-1-right)',
  '@shadow-2': 'var(--shadow-2)',
  // Buttons
  '@btn-shadow': 'var(--btn-shadow)',
  '@btn-primary-shadow': 'var(--btn-primary-shadow)',
  '@btn-text-shadow': 'var(--btn-text-shadow)',
  //
  '@btn-default-bg': 'var(--btn-default-bg)',
  '@btn-danger-bg': '@error-color',
  '@btn-danger-border': '@error-color',
  //
  '@btn-default-ghost-color': 'var(--btn-default-ghost-color)',
  '@btn-default-ghost-border': 'var(--btn-default-ghost-border)',
  //
  '@btn-text-hover-bg': 'var(--btn-text-hover-bg)',
  // Checkbox
  '@checkbox-check-bg': 'var(--checkbox-check-bg)',
  // Descriptions
  '@descriptions-bg': 'var(--descriptions-bg)',
  // Divider
  '@divider-color': 'var(--divider-color)',
  // Dropdown
  '@dropdown-menu-submenu-disabled-bg':
    'var(--dropdown-menu-submenu-disabled-bg)',
  // Radio
  '@radio-dot-disabled-color': 'var(--radio-dot-disabled-color)',
  '@radio-solid-checked-color': 'var(--radio-solid-checked-color)',
  // Radio buttons
  '@radio-disabled-button-checked-bg':
    'var(--radio-disabled-button-checked-bg)',
  '@radio-disabled-button-checked-color':
    'var(--radio-disabled-button-checked-color)',
  // Layout
  '@layout-body-background': 'var(--layout-body-background)',
  '@layout-header-background': 'var(--layout-header-background)',
  '@layout-trigger-background': 'var(--layout-trigger-background)',
  // Dropdown
  '@dropdown-menu-bg': 'var(--dropdown-menu-bg)',
  // Input
  '@input-placeholder-color': 'var(--input-placeholder-color)',
  '@input-icon-color': 'var(--input-icon-color)',
  '@input-bg': 'var(--input-bg)',
  '@input-number-handler-active-bg': 'var(--input-number-handler-active-bg)',
  '@input-icon-hover-color': 'var(--input-icon-hover-color)',
  // Mentions
  '@mentions-dropdown-bg': 'var(--mentions-dropdown-bg)',
  // Select
  '@select-dropdown-bg': 'var(--select-dropdown-bg)',
  '@select-background': 'var(--select-background)',
  '@select-clear-background': 'var(--select-clear-background)',
  '@select-selection-item-bg': 'var(--select-selection-item-bg)',
  '@select-selection-item-border-color':
    'var(--select-selection-item-border-color)',
  '@select-multiple-disabled-background':
    'var(--select-multiple-disabled-background)',
  '@select-multiple-item-disabled-color':
    'var(--select-multiple-item-disabled-color)',
  '@select-multiple-item-disabled-border-color':
    'var(--select-multiple-item-disabled-border-color)',
  // Cascader
  '@cascader-bg': 'var(--cascader-bg)',
  '@cascader-menu-bg': 'var(--cascader-menu-bg)',
  '@cascader-menu-border-color-split':
    'var(--cascader-menu-border-color-split)',
  // Tooltip
  '@tooltip-bg': 'var(--tooltip-bg)',
  // Popover
  '@popover-bg': 'var(--popover-bg)',
  // Modal
  '@modal-header-bg': 'var(--modal-header-bg)',
  '@modal-header-border-color-split': 'var(--modal-header-border-color-split)',
  '@modal-content-bg': 'var(--modal-content-bg)',
  '@modal-footer-border-color-split': 'var(--modal-footer-border-color-split)',
  // Progress
  '@progress-steps-item-bg': 'var(--progress-steps-item-bg)',
  // Menu
  '@menu-popup-bg': 'var(--menu-popup-bg)',
  '@menu-dark-bg': 'var(--menu-dark-bg)',
  '@menu-dark-inline-submenu-bg': 'var(--menu-dark-inline-submenu-bg)',
  // Table
  '@table-header-bg': 'var(--table-header-bg)',
  '@table-header-sort-bg': 'var(--table-header-sort-bg)',
  '@table-body-sort-bg': 'var(--table-body-sort-bg)',
  '@table-row-hover-bg': 'var(--table-row-hover-bg)',
  '@table-selected-row-hover-bg': '@primary-1',
  '@table-expanded-row-bg': 'var(--table-expanded-row-bg)',
  '@table-header-cell-split-color': 'var(--table-header-cell-split-color)',
  '@table-header-sort-active-bg': 'var(--table-header-sort-active-bg)',
  '@table-header-filter-active-bg': 'var(--table-header-filter-active-bg)',
  '@table-filter-btns-bg': 'var(--table-filter-btns-bg)',
  '@table-filter-dropdown-bg': 'var(--table-filter-dropdown-bg)',
  '@table-expand-icon-bg': 'var(--table-expand-icon-bg)',
  // TimePicker
  '@picker-bg': 'var(--picker-bg)',
  '@picker-basic-cell-hover-with-range-color': 'var(--primary-2)',
  '@picker-basic-cell-disabled-bg': 'var(--picker-basic-cell-disabled-bg)',
  '@picker-border-color': 'var(--picker-border-color)',
  '@picker-date-hover-range-border-color': 'var(--primary-4)',
  // Calendar
  '@calendar-bg': 'var(--calendar-bg)',
  '@calendar-input-bg': 'var(--calendar-input-bg)',
  '@calendar-border-color': 'var(--calendar-border-color)',
  '@calendar-column-active-bg': '@calendar-item-active-bg',
  '@calendar-full-bg': 'var(--calendar-full-bg)',
  // Badge
  '@badge-text-color': '@white',
  // Rate
  '@rate-star-bg': 'var(--rate-star-bg)',
  // Card
  '@card-actions-background': 'var(--card-actions-background)',
  '@card-skeleton-bg': 'var(--card-skeleton-bg)',
  '@card-shadow': 'var(--card-shadow)',
  // Comment
  '@comment-bg': 'var(--comment-bg)',
  '@comment-author-time-color': 'var(--comment-author-time-color)',
  '@comment-action-hover-color': 'var(--comment-action-hover-color)',
  // BackTop
  '@back-top-bg': 'var(--back-top-bg)',
  '@back-top-hover-bg': 'var(--back-top-hover-bg)',
  // Avatar
  '@avatar-bg': 'var(--avatar-bg)',
  // Switch
  '@switch-bg': 'var(--switch-bg)',
  // Pagination
  '@pagination-item-bg': 'var(--pagination-item-bg)',
  '@pagination-item-bg-active': 'var(--pagination-item-bg-active)',
  '@pagination-item-link-bg': 'var(--pagination-item-link-bg)',
  '@pagination-item-disabled-color-active':
    'var(--pagination-item-disabled-color-active)',
  '@pagination-item-disabled-bg-active':
    'var(--pagination-item-disabled-bg-active)',
  '@pagination-item-input-bg': 'var(--pagination-item-input-bg)',
  // PageHeader
  '@page-header-back-color': 'var(--page-header-back-color)',
  '@page-header-ghost-bg': 'var(--page-header-ghost-bg)',
  // Slider
  '@slider-rail-background-color': 'var(--slider-rail-background-color)',
  '@slider-rail-background-color-hover':
    'var(--slider-rail-background-color-hover)',
  '@slider-handle-color-focus': '@primary-5',
  '@slider-handle-color-focus-shadow': 'var(--primary-2)',
  '@slider-dot-border-color': 'var(--slider-dot-border-color)',
  '@slider-dot-border-color-active': 'var(--slider-dot-border-color)',
  // Tree
  '@tree-bg': 'var(--tree-bg)',
  // Skeleton
  '@skeleton-to-color': 'var(--skeleton-to-color)',
  // Transfer
  '@transfer-item-hover-bg': 'var(--transfer-item-hover-bg)',
  '@transfer-item-selected-hover-bg': '@primary-1',
  // Message
  '@message-notice-content-bg': 'var(--message-notice-content-bg)',
  // Alert
  '@alert-success-border-color': '@green-3',
  '@alert-success-bg-color': '@green-1',
  '@alert-success-icon-color': '@success-color',
  '@alert-info-border-color': '@primary-3',
  '@alert-info-bg-color': '@primary-1',
  '@alert-info-icon-color': '@primary-color',
  '@alert-warning-border-color': '@gold-3',
  '@alert-warning-bg-color': '@gold-1',
  '@alert-warning-icon-color': '@warning-color',
  '@alert-error-border-color': '@red-3',
  '@alert-error-bg-color': '@red-1',
  '@alert-error-icon-color': '@error-color',
  // List
  '@list-customize-card-bg': 'var(--list-customize-card-bg)',
  // Drawer
  '@drawer-bg': 'var(--drawer-bg)',
  // Timeline
  '@timeline-color': 'var(--timeline-color)',
  '@timeline-dot-color': 'var(--timeline-dot-color)',
  // Image
  '@image-preview-operation-disabled-color':
    'var(--image-preview-operation-disabled-color)',
  // Steps
  '@steps-nav-arrow-color': 'var(--steps-nav-arrow-color)',
  '@steps-background': 'var(--steps-background)',
  // Notification
  '@notification-bg': 'var(--notification-bg)',
  //
  '@gradient-min': 'var(--gradient-min)',
  '@gradient-max': 'var(--gradient-max)',
  // 滚动条
  '@scrollbar-thumb-color': 'var(--scrollbar-thumb-color)',
  '@scrollbar-thumb-hover-color': 'var(--scrollbar-thumb-hover-color)',
  '@scrollbar-track-color': 'var(--scrollbar-track-color)',
  // 侧栏
  '@sidebar-background': 'var(--sidebar-background)',
  '@sidebar-light-background': 'var(--sidebar-light-background)',
  '@sidebar-light-shadow': 'var(--sidebar-light-shadow)',
  '@sidebar-dark-shadow': 'var(--sidebar-dark-shadow)',
  '@sidebar-scrollbar-thumb-color': 'var(--sidebar-scrollbar-thumb-color)',
  '@sidebar-scrollbar-thumb-hover-color':
    'var(--sidebar-scrollbar-thumb-hover-color)',
  '@sidebar-scrollbar-track-color': 'var(--sidebar-scrollbar-track-color)',
  '@sidebar-light-scrollbar-thumb-color':
    'var(--sidebar-light-scrollbar-thumb-color)',
  '@sidebar-light-scrollbar-thumb-hover-color':
    'var(--sidebar-light-scrollbar-thumb-hover-color)',
  '@sidebar-light-scrollbar-track-color':
    'var(--sidebar-light-scrollbar-track-color)',
  // 顶栏
  '@header-background': 'var(--header-background)',
  '@header-light-background': 'var(--header-light-background)',
  '@header-light-shadow': 'var(--header-light-shadow)',
  '@header-dark-shadow': 'var(--header-dark-shadow)',
  '@header-tool-hover-bg': 'var(--header-tool-hover-bg)',
  '@header-dark-tool-hover-bg': 'var(--header-dark-tool-hover-bg)',
  // logo
  '@logo-light-shadow': 'var(--logo-light-shadow)',
  '@logo-dark-shadow': 'var(--logo-dark-shadow)'
};

/**
 * 需要替换的内容
 */
const replaces = {
  // style/color/colorPalette.less
  'this.colorPalette = function(color, index) {': `this.colorPalette = function(color, index) {
    if(color.indexOf('var(--') === 0) {
      if(color === 'var(--primary-color)' || color === 'var(--info-color)') {
        return 'var(--primary-' + index + ')';
      }
      if(color === 'var(--error-color)' || color === 'var(--highlight-color)') {
        return 'var(--red-' + index + ')';
      }
      if(color === 'var(--warning-color)') {
        return 'var(--gold-' + index + ')';
      }
      if(color === 'var(--success-color)') {
        return 'var(--green-' + index + ')';
      }
      return color.replace(')', '-unknown)');
    }`,
  // input/style/mixin.less
  'fade(@borderColor, @outline-fade)':
    'replace(~"@{borderColor}", "-color", "-color-outline")',
  // notification/style/index-pure.less
  'shade(@text-color-secondary, 40%)': '@text-color',
  // popover/style/index-pure.less
  "box-shadow: ~'0 0 8px @{shadow-color} \\9';": '',
  // switch/style/index-pure.less
  'box-shadow: 0 0 0 2px fade(@disabled-color, 10%)':
    'box-shadow: 0 0 0 2px var(--primary-2)',
  // button/style/mixin.less
  'fadein(@btn-text-hover-bg, 1%)': 'var(--btn-text-active-bg)',
  // table\style\index-pure.less
  'darken(@shadow-color, 5%)': '@shadow-color',
  'lighten(@table-border-color, 80%)': '@component-background',
  // date-picker/style/panel.less
  'fade(@text-color-inverse, 50%)': 'fade(@white, 50%)',
  // tabs\style\position.less
  'fade(@shadow-color, 8%)': '@shadow-color'
};

/**
 * 修改 less 变量的预处理器
 */
class AntdLessPreProcessor {
  variables;
  replaces;

  constructor(
    variables,
    replaces
  ) {
    this.variables = variables || {};
    this.replaces = replaces || {};
  }

  process(src) {
    let result = src;
    Object.keys(this.variables).forEach((key) => {
      const value = this.variables[key];
      if (typeof value === 'string') {
        result = result.replace(
          new RegExp(key + ':[^;]*;', 'g'),
          key + ': ' + this.variables[key] + ';'
        );
      }
    });
    Object.keys(this.replaces).forEach((key) => {
      const value = this.replaces[key];
      if (typeof value === 'string') {
        result = result.split(key).join(value);
      }
    });
    return result;
  }
}

/**
 * 转换 antd 变量的 less 插件
 */
class DynamicAntdLess {
  options;

  constructor(options) {
    this.options = {
      variables: { ...variables, ...options?.variables },
      replaces: { ...replaces, ...options?.replaces }
    };
  }

  install(_less, manager, _functions) {
    // 添加预处理器
    manager.addPreProcessor(
      new AntdLessPreProcessor(this.options.variables, this.options.replaces),
      2000
    );
  }
}

export { DynamicAntdLess };
