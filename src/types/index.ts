// 编辑器主题包含属性
export type CodeTheme = {
  key: string;
  title: string;
};

// 编辑器状态枚举
export enum CodeStatus {
  NO_CHOOSE_FILES = 'NO_CHOOSE_FILES', // 未选择文件
  CHOOSE_FILES = 'CHOOSE_FILES', // 已选择文件
}

// 编辑器文件类型
export enum CodeFileType {
  MD = 'md',
  JS = 'js',
  TS = 'ts',
}

// 编辑器文件包含属性
export type CodeFile = {
  name: string; // 文件名(唯一)
  type: CodeFileType; // 文件类型
  content: string; // 文件内容
};

// 文件树类型
export type FileType = {
  key: string; // 文件key(唯一) 路径
  title: string; // 文件名
  fileType?: string; // 文件类型
  file?: File; // 文件
  content?: string; // 文件内容(文本)
  children?: FileType[]; // 子节点
};
// 树形结构所需的属性
export type Tree = {
  key: string; //唯一路径
  title: string; //名称
  item: FileSystemFileHandle; //文件流
  isLeaf: boolean; // 是否是叶子节点
  children?: Tree[]; // 子节点
};

export type ImageType = 'image/png' | 'image/jpeg' | 'image/gif' | 'image/webp';
export const imageTypeEmnu = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
];
