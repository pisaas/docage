import type { IExtension } from '../core'

/**
 * 插件
 */
export interface Plugin extends IExtension {
  /**
   * 插件名称
   */
  name: string
}
