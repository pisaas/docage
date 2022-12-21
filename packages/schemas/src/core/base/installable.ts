import type { PromiseFunction } from '../../common'

/**
 * 可安装的
 */
export interface Installable {
  /**
   * 安装方法
   */
  install?: PromiseFunction

  [prop: string]: any
}
