// 特定类型对象
declare type GenericObject<T = any> = Record<string, T>

// 通用配置对象
declare type GenericOptions<T = any> = Record<string, T>

// 通用方法
declare type GenericFunction = (...args: any[]) => any
