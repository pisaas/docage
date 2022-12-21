/**
 * 运行时供应者类型
 */
export enum RuntimeProviderType {
  /**
   * 事件
   */
  EVENT = 'event',

  /**
   * 钩子
   */
  HOOK = 'hook',

  /**
   * 权限
   */
  AUTH = 'auth',

  /**
   * 路由
   */
  ROUTER = 'router',

  /**
   * 状态
   */
  STATE = 'state',

  /**
   * 存储
   */
  STORAGE = 'storage',

  /**
   * 渲染器
   */
  RENDERER = 'renderer',

  /**
   * 模版引擎
   */
  TEMPLATE = 'template',

  /**
   * 表达式
   */
  EXPRESSION = 'expression',
}

/**
 * 应用提供者类型
 */
export enum AppProviderType {
  /**
   * Api
   */
  API = 'api',

  /**
   * 页面
   */
  PAGE = 'page',

  /**
   * 元应用适配器
   */
  MEAT_APP = 'meta',

  /**
   * 实时监控（埋点）
   */
  TRACE = 'trace',

  /**
   * 网络文件系统
   */
  OFS = 'ofs',

  /**
   * 扩展适配器
   */
  EXTENSION = 'extension',
}

/**
 * 合并美剧
 */
export const ProviderType = Object.freeze({
  ...RuntimeProviderType,
  ...AppProviderType,
})

/**
 * 应用提供者类型
 */
export type ProviderType = RuntimeProviderType | AppProviderType

/**
 * 默认适配器名称
 */
export const DEFAULT_PROVIDER_NAME = 'default'

/**
 * 适配器
 * @desc 用于对各api进行适配
 */
export interface Provider {
  /** 类型 */
  type: ProviderType

  /** 名称 */
  name: string

  /** 所属插件名称 */
  pluginName?: string
}

export interface AppProvider extends Provider {
  /** 类型 */
  type: AppProviderType
}

export interface RuntimeProvider extends Provider {
  /** 类型 */
  type: RuntimeProviderType
}
