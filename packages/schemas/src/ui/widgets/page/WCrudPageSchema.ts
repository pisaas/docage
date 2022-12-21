import type { UIActionSet } from '../../components'

import type { UICrudSearch, UICrudTable, UICrudToolbar } from '../crud'

/**
 * 增删改查页面
 * @schema widget
 * @target WCrudPage
 * @desc 增删改查是目前应用开发中最常用的微件，其主要作用是对列表类型的数据进行查询、展示、操作等功能。
 * 该微件同时也包含部分页面自动布局功能，一般情况必须外部需要套一个容器，通常和Page页面配合使用。
 * @ui page
 * @meta: {
 *  categories: {
 *    "default": { label: '常规', index: 1 }
 *    "default.actions": { label: '集合', index: 1 }
 *  }
 * }
 */
export interface WCrudPageSchema {
  /**
   * 活动
   * @category default.actions
   * @default { query: { api: 'query/api' } }
   * @mergeRef true
   */
  actions?: UIActionSet

  /**
   * 头部
   * @category default.advanced
   * @data sub
   * @desc 页面头部相关配置
   * @mergeRef true
   */
  header?: UICrudPageHeader

  /**
   * 查询
   * @category
   * @data sub
   * @mergeRef true
   */
  search?: UICrudSearch

  /**
   * 表格
   * @category
   * @data sub
   * @mergeRef true
   */
  table?: UICrudTable

  /**
   * 工具栏
   * @category
   * @data sub
   * @mergeRef true
   */
  toolbar?: UICrudToolbar

  /**
   * 扩展配置
   */
  [prop: string]: any
}

/**
 * 页头
 * @desc 页头描述信息
 */
export interface UICrudPageHeader {
  /**
   * 页面标题
   */
  title?: string

  /**
   * 页面提示
   * @section header
   */
  tip?: string

  /**
   * 不支持返回
   * @section header
   */
  noBack?: boolean
}
