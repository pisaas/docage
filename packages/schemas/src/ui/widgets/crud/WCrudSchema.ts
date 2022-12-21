import type { UIActionSet, UIFormItems, UIActionItems, UITableColumns } from '../../components'

/**
 * 增删改查微件
 * @schema widget
 * @desc 增删改查是目前应用开发中最常用的微件，其主要作用是对列表类型的数据进行查询、展示、操作等功能。
 * 该微件同时也包含部分页面自动布局功能，一般情况必须外部需要套一个容器，通常和Page页面配合使用。
 * @meta {
 *  categories: {
 *    default: {
 *      categories: {
 *        actions: '活动集合',
 *        advanced: {
 *          label: '扩展',
 *          sections: { header: '页头', listener: '监听' }
 *        }
 *      },
 *      search: {
 *        label: '查询'
 *        categories: { items: '查询项', advanced: '扩展' }
 *      },
 *      toolbar: {
 *        label: '工具栏'
 *        categories: { items: '查询项', advanced: '扩展' }
 *      },
 *      table: {
 *        label: '表格'
 *        categories: {
 *          columns: '列',
 *          advanced: {
 *            label: '扩展',
 *            sections: { pager: '分页' }
 *          }
 *        }
 *      }
 *    }
 *  }
 * }
 */
export interface WCrudSchema {
  /**
   * 活动集合
   * @section actions
   * @mergeRef true
   */
  actions?: UIActionSet

  /**
   * 查询监听
   * @section listener
   * @desc 接收特定事件并执行查询
   */
  searchOn?: string[]

  /**
   * 查询
   * @category search
   * @mergeRef true
   */
  search?: UICrudSearch

  /**
   * 工具栏
   * @category toolbar
   * @mergeRef true
   */
  toolbar?: UICrudToolbar

  /**
   * 表格
   * @category table
   * @mergeRef true
   */
  table?: UICrudTable

  /**
   * 扩展配置
   */
  [prop: string]: any
}

/**
 * 查询结构
 */
export interface UICrudSearch {
  /**
   * 表单项
   * @category
   * @mergeRef
   */
  items: UIFormItems

  /**
   * 立即查询
   * @category advanced
   * @desc 组件加载完成后，是否立即执行查询
   * @default false
   */
  immediate?: boolean
}

/**
 * 工具栏结构
 */
export interface UICrudToolbar {
  /**
   * 操作项
   * @category
   * @mergeRef
   */
  items?: UIActionItems

  /**
   * 标题
   * @category advanced
   */
  title?: string
}

/**
 * 表格结构
 */
export interface UICrudTable {
  /**
   * 表格列
   * @category
   * @mergeRef
   */
  columns?: UITableColumns

  /**
   * 操作项
   * @category
   */
  operation?: {
    /**
     * 是否隐藏
     */
    hidden?: boolean

    /**
     * 宽度
     */
    width?: number

    /**
     * 操作项
     */
    items?: UIActionItems
  }
}
