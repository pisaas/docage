/**
 * 消息类型
 */
export enum UIMessageType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

/**
 * 消息
 */
export interface UIMessage {
  /**
   * 消息类型
   */
  type?: UIMessageType

  /**
   * 消息标题
   */
  title?: string

  /**
   * 消息内容
   */
  message?: string

  /**
   * 消息图标
   * @ui icon
   */
  icon?: string

  /**
   * 是否居中
   */
  center?: boolean

  /**
   * 是否显示关闭
   */
  showClose?: boolean

  /**
   * 显示取消按钮
   * @default false
   */
  showCancelButton?: boolean

  /**
   * 显示确认按钮
   * @default true
   */
  showConfirmButton?: boolean
}

/**
 * 确认消息
 */
export interface UIConfirmMessage extends UIMessage {
  /**
   * 显示取消按钮
   * @default true
   */
  showCancelButton?: boolean
}
