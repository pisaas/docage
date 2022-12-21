import type { UIFormatter, UIStyle, UITip } from '../../shared'
import type { UITableAlignType } from './UITableAlignType'

/**
 * 表格配置
 */
export interface UITableSchema {
  /**
   * 表格列
   */
  columns?: UITableColumns
}

/**
 * 表格列集合
 * @ui tableColumns
 */
export type UITableColumns = Array<UITableColumn>

/**
 * 表格列
 * @ui tableColumn
 */
export interface UITableColumn {
  /**
   * 列标签
   */
  label?: string

  /**
   * 属性字段
   */
  prop?: string

  /**
   * 列宽度
   */
  width?: number

  /**
   * 是否固定
   */
  fixed?: boolean

  /**
   * 对齐
   */
  align?: UITableAlignType

  /**
   * 格式化
   */
  formatter?: UIFormatter

  /**
   * 图标
   * @ui icon
   */
  icon?: string

  /**
   * 列提示
   */
  tip?: UITip

  /**
   * 列头
   */
  header?: {
    /**
     * 提示
     * @ui tip
     */
    tip?: UITip

    /**
     * 样式
     * @ui style
     */
    style?: UIStyle
  }

  /**
   * 汇总
   */
  summary?: {
    /**
     * 汇总列
     * @desc 默认当前列名
     */
    prop?: string

    /**
     * 格式化配置
     */
    formatter?: UIFormatter
  }

  /** 子列 */
  children?: UITableColumns
}

/**
 * 表格操作栏
 */
export interface UITableOperation {}
