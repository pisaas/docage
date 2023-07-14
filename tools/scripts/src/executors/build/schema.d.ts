export type LibraryFormats = 'es' | 'esm' | 'cjs' | 'umd' | 'iife';

/** 构建结构 */
export interface BuildExecutorSchema {
  type?: DocageProjectType;
  name?: string;
  main: string;
  outputPath: string;
  tsConfig: string;
  format: LibraryFormats[];
}
