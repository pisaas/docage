/**
 * 钩子模型
 * @desc 钩子模型作为框架生命周期主要扩展模式，在框架运行各阶段被埋入
 */

// 钩子方法
export type HookHandler<T = any> = (context: T, ...args: any[]) => Promise<unknown | void> | unknown | void

// 钩子
export interface IHook<T = any> {
  /**
   * 名称
   */
  name: string

  /**
   * 优先级
   */
  priority?: number

  /**
   * 是否顺序执行
   */
  sequential?: boolean

  /**
   * 方法
   */
  handler?: HookHandler<T>
}
