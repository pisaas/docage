import type { Installable } from './installable'

/**
 * 插件
 */
export interface Plugin extends Installable {
  /**
   * 插件名称
   */
  name: string
}
