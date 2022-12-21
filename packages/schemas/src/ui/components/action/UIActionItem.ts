import type { MixedUIActions } from './UIAction'

/**
 * 活动项列表
 * @ui actionItems
 */
export type UIActionItems = Array<UIActionItem>

/**
 * 活动项
 * @ui actionItem
 */
export interface UIActionItem {
  /**
   * 活动名
   */
  action: string

  /**
   * 活动配置
   * @data partial
   */
  config?: MixedUIActions

  /**
   * 子活动项
   */
  children?: UIActionItems
}
