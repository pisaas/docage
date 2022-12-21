/**
 * ui项
 * @desc 包含所有ui注解项，理论上所有ui标签都应该包含在这里，可拖拽的项
 */
export enum UIItemTypeEnum {
  /**
   * 图标
   */
  ICON = 'icon',

  /**
   * 提示
   */
  TIP = 'tip',

  /**
   * 组件
   */
  CMPT = 'cmpt',

  /**
   * 内容组件
   * @desc 整合不同类型的组件
   */
  CONTENT = 'content',

  /**
   * 容器
   */
  CONTAINER = 'container',

  //-------- 表单相关 -------->

  /**
   * 表单项
   */
  FORM_ITEM = 'formItem',

  /**
   * 表单项集合
   */
  FORM_ITEMS = 'formItems',

  //-------- 活动相关 -------->

  /**
   * 活动
   */
  ACTION = 'action',

  /**
   * 活动集合
   */
  ACTION_SET = 'actionSet',

  /**
   * 活动项
   */
  ACTION_ITEM = 'actionItem',

  /**
   * 活动项集合
   */
  ACTION_ITEMS = 'actionItems',

  //-------- 表格相关 -------->

  /**
   * 表格列
   */
  TABLE_COLUMN = 'tableColumn',

  /**
   * 表格集合
   */
  TABLE_COLUMNS = 'tableColumns',

  //-------- 页面相关 -------->
  /**
   * 页面
   */
  PAGE = 'page'
}

/**
 * ui项
 */
export enum UIDataTypeEnum {
  /**
   * 样式
   */
  STYLE = 'style',

  /**
   * 日期
   */
  DATE = 'date',

  /**
   * api配置
   */
  API = 'api',

  /**
   * 权限
   */
  PERM = 'perm',

  /**
   * 可变表达式方法
   */
  EXPRESSION = 'expression',

  /**
   * 模版
   */
  TEMPLATE = 'template',

  /**
   * 格式化
   */
  FORMATTER = 'formatter',

  /**
   * 可选项
   */
  OPTOINS = 'options',

  /**
   * boolean string组合类型
   * @desc 一般应用在由boolean确定是否采用默认类型，由string为自定义配置
   */
  BOOLEAN_STRING = 'booleanString',

  /**
   * 包含boolean的组合类型
   * @desc 一般应用在由boolean确定是否采用默认类型，由其他类型采用不同的解析方式
   */
  BOOLEAN_UNION_TYPE = 'booleanUnitType',

  /**
   * 负载
   */
  PAYLOAD = 'payload',

  /**
   * 方法
   */
  FUNCTION = 'function',

  /**
   * 支持应用上下文的负载
   */
  CONTEXT_PAYLOAD = 'contextPayload',

  /**
   * 支持应用上下文的方法
   */
  CONTEXT_FUNCTION = 'contextFunction'
}
