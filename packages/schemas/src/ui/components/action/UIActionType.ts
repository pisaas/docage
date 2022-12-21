/** 活动类型 */
export enum UIActionType {
  /** api */
  API = 'api',

  /** 事件 */
  EVENT = 'event',

  /** 确认 */
  CONFIRM = 'confirm',

  /** 弹框 */
  DIALOG = 'dialog',

  /** 导入 */
  IMPORT = 'import',

  /** 导出 */
  EXPORT = 'export',

  /** 上传 */
  UPLOAD = 'upload',

  /** 下载 */
  DOWNLOAD = 'download',

  /** 跳转 */
  LINK = 'link',

  /** 组件 */
  CMPT = 'cmpt',

  /** 自定义 */
  CUSTOM = 'custom',

  /**
   * 消息活动
   * @deprecated 由confirm活动代替
   */
  MESSAGE = 'message'
}
