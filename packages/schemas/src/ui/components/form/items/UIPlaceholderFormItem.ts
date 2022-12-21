import type { UIFormItem } from '../UIFormItem'

/**
 * 占位
 * @ui formItem
 * @default { invisible: true }
 * @desc 由于Zpage表单是自动布局，在特殊情况下会导致布局错位，可通过添加占位在对齐表单项
 */
export interface UIPlaceholderFormItem {
  /**
   * 跨度
   * @default 6
   * @desc 表单项占一行(24)的跨度
   */
  span?: number
}
