/**
 * 提供者模型
 * @desc 提供者作为基础扩展模式，为框架主要扩展主体
 */

// 提供者类型
export type ProviderType = string

/**
 * 适配器
 * @desc 用于对各api进行适配
 */
export interface IProvider {
  /** 类型 */
  type: ProviderType

  /** 名称 */
  name: string
}
