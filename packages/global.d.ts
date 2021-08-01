// 全局编译时常量
declare var __DEV__: boolean
declare var __TEST__: boolean
declare var __BROWSER__: boolean
declare var __GLOBAL__: boolean
declare var __ESM_BUNDLER__: boolean
declare var __ESM_BROWSER__: boolean
declare var __NODE_JS__: boolean
declare var __COMMIT__: string
declare var __VERSION__: string

// 特定类型对象
declare type GenericObject<T = any> = Record<string, T>

// 通用方法
declare type GenericFunction = (...args: any[]) => any
