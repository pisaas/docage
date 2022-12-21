import type { CmptConfigType, AppContextFunction } from '../../core'
import type { UIVariableExpression } from './UIExpression'

/**
 * Cmpt
 * @ui cmpt
 */
export interface UICmpt {
  /** 组件类型 */
  type?: string

  /**
   * 组件配置
   */
  config?: CmptConfigType
}

/**
 * Content组件属性
 * @ui content
 */
export interface UIContent {
  /**
   * 内容
   */
  content?: string | AppContextFunction<UIContent>

  /**
   * 组件配置
   */
  cmpt?: CmptConfigType

  /**
   * 模版
   */
  tpl?: string

  /**
   * html
   */
  html?: string

  /**
   * 文本
   */
  text?: string
}

/**
 * 提示
 * @ui tip
 */
export interface UITip {
  /**
   * 提示标题
   * @ui template
   */
  title?: string

  /**
   * 提示内容
   * @ui template
   */
  content?: string
}

/**
 * 接收Cmpt参数的组件
 * @desc 可通过cmpt设置替换组件内主要部件的组件
 */
export interface UICmptComponent {
  cmpt?: UICmpt
}

/**
 * 具有上下文组件
 */
export interface UIContextComponent {
  /**
   * 上下文数据
   */
  contextData?: any
}

/**
 * 可变表达式，支持失效、隐藏表达式
 */
export interface UIVariableComponent extends UIDisablableComponent, UIInvisibleComponent {}

/**
 * 权限设置
 * @ui perm
 */
export type PermConfig = boolean | string | string[]

/**
 * 可失效组件
 */
export interface UIDisablableComponent {
  /**
   * 已失效
   * @default false
   */
  disabled?: boolean

  /**
   * 失效表达式
   * @mergeRef
   */
  disabledOn?: UIVariableExpression
}

/**
 * 可隐藏组件
 */
export interface UIInvisibleComponent {
  /**
   * 可以性
   * @default true
   */
  visible?: boolean

  /**
   * 可见表达式
   * @mergeRef
   */
  visibleOn?: UIVariableExpression
}
