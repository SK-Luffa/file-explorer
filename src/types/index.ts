// 编辑器主题包含属性
export type CodeTheme = {
  key: string;
  title: string;
};

// 编辑器状态枚举
export enum CodeStatus {
  NO_CHOOSE_FILES = "NO_CHOOSE_FILES", // 未选择文件
  CHOOSE_FILES = "CHOOSE_FILES", // 已选择文件
}

// 编辑器文件类型
export enum CodeFileType {
  MD = "md",
  JS = "js",
  TS = "ts",
}

// 编辑器文件包含属性
export type CodeFile = {
  name: string; // 文件名(唯一)
  type: CodeFileType; // 文件类型
  content: string; // 文件内容
};
