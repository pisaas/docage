import type { UIFormItem } from './UIFormItem'

export interface UIForm<T extends UIFormItem = UIFormItem> {
  /**
   * 跨度
   * @default 6
   * @desc 表单项跨度值(全宽24格)
   */
  span?: number

  /**
   * 查询表单项
   */
  items?: Array<T>
}
