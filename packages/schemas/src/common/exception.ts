/**
 * 异常模型
 * @desc 异常被用于框架错误管理
 */

/** 基础错误 */
export interface IException {
  name: string
  message: string
  stack?: string
}
