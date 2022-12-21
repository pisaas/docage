import type { AppContextPayload, AppContextFunction, ApiRequestAction, PageLink } from '../../../core'
import type { UICmptComponent, UIPerm } from '../../shared'
import type { UIActionType } from './UIActionType'

/**
 * 活动集合
 * @data set
 * @desc 键为活动名称, 值为活动定义
 * @ui actionSet
 */
export interface UIActionSet {
  [prop: string]: MixedUIActions
}

/**
 * 混合活动
 * @description 需要根据Action特点判断action类型
 */
export type MixedUIActions =
  | UIApiAction
  | UIDialogAction
  | UIEventAction
  | UIExportAction
  | UIImportAction
  | UILinkAction
  | UIDownloadAction
  | UICmptAction
  | UICustomAction

/** 行为 */
export interface UIAction {
  /**
   * 行为类型
   */
  type?: UIActionType

  /**
   * 行为名称
   * @priority 1
   * @desc 类似行为编码，用于唯一识别行为
   */
  name?: string

  /**
   * 负载
   * @priority 3
   * @ui contextPayload
   * @desc 包括请求参数，弹框数据等
   */
  payload?: AppContextPayload

  /**
   * 权限设置
   * @mergeRef
   * @desc 根据约定如果是接口行为，默认自定义权限名与接口名称保持一致
   */
  perm?: UIPerm

  /**
   * 成功提示
   * @desc 操作成功后提示成功的消息，不设置将采用默认提示
   * @ui booleanString
   */
  successMessage?: boolean | string

  /**
   * 行为触发方法
   * @ui contextFunction
   * @desc 此方法将替换行为自身的默认处理方法
   */
  trigger?: AppContextFunction

  /**
   * 触发前调用方法
   * @ui contextFunction
   */
  beforeTrigger?: AppContextFunction

  /**
   * 触发后调用方法
   * @ui contextFunction
   */
  afterTrigger?: AppContextFunction

  /** 扩展属性 */
  [prop: string]: any
}

/**
 * Api请求
 * @ui action
 */
export interface ApiUIAction extends UIAction {
  /**
   * Api配置
   * @priority 2
   * @ui api
   * @desc 执行当前行为所需要执行的api请求
   */
  api: ApiRequestAction

  /**
   * Api附加参数
   * @ui contextPayload
   * @desc 此参数有最高优先级，将覆盖所有参数
   */
  extData?: Record<string, any>
}

export type PartialUIAction<T extends UIAction> = Partial<Omit<T, 'type'>>

/**
 * Api请求
 * @ui action
 */
export interface UIApiAction extends ApiUIAction {
  type: UIActionType.API
}

/**
 * 弹框
 * @ui action
 */
export interface UIDialogAction extends ApiUIAction {
  type: UIActionType.DIALOG

  /**
   * 弹窗
   */
  dialog?: UIActionDialog
}

/**
 * 活动对话框
 */
export interface UIActionDialog {}

/**
 * 导出
 * @ui action
 */
export interface UIExportAction extends ApiUIAction {
  type: UIActionType.EXPORT

  /**
   * 导出类型
   */
  exportType?: string

  /**
   * 完成后是否打开导出窗口
   */
  openDialogAfterSuccess?: boolean
}

/**
 * 导入
 * @ui action
 */
export interface UIImportAction extends ApiUIAction {
  type: UIActionType.IMPORT

  /** 导入模版资源名 */
  template?: string

  /**
   * 最大导入数
   * @default 1000
   */
  maxCount?: number

  /**
   * 额外提示
   */
  extraTip?: string
}

/**
 * 事件
 * @ui action
 */
export interface UIEventAction extends UIAction {
  type: UIActionType.EVENT
  event?: string | UIActionEvent
}

/**
 * 活动事件
 */
export interface UIActionEvent {}

/**
 * 链接
 * @ui action
 */
export interface UILinkAction extends UIAction {
  type: UIActionType.LINK

  /**
   * 下载/跳转链接
   * @desc 这里的link为跳转链接
   */
  link?: string | PageLink
}

/**
 * 下载
 * @ui action
 */
export interface UIDownloadAction extends UIAction {
  type: UIActionType.DOWNLOAD

  /**
   * 链接
   */
  url?: string
}

/**
 * 组件
 * @ui action
 */
export interface UICmptAction extends UIAction, UICmptComponent {
  type: UIActionType.CMPT
}

/**
 * 自定义
 * @ui action
 */
export interface UICustomAction extends UIAction {
  type: UIActionType.CUSTOM
}
