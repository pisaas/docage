/**
 * 应用验证结果
 */
export interface ValidateResult {
  /**
   * 验证消息，默认存在即失败
   */
  message?: string
}

/**
 * 验证方法
 */
export type ValidateHandler<T = any, O = any> = (value: T, options: O) => Promise<ValidateResult>

/**
 * 应用验证器
 */
export interface Validator {
  /**
   * 验证器名称
   */
  name: string

  /**
   * 是否异步（默认异步）
   * @desc 实际使用时，应用会优先使用async标记位，但也会根据验证方法特性判断是否异步
   */
  async?: boolean

  /**
   * 验证失败后返回消息，如果没有设置则采用验证方法中的消息
   */
  message?: string

  /**
   * 验证方法
   */
  handler?: ValidateHandler
}
