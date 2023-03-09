/**
 * 可安装组件，如插件，加载器，UI等都属于可安装组件
 */

import type { PromiseFunction } from './util'

/**
 * 可安装的
 */
export interface IExtension {
  /**
   * 安装方法
   */
  apply?: PromiseFunction

  [prop: string]: any
}
