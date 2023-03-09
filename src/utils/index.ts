// 获取文件大小
export const getFileSizeResult = (file: File) => {
  const size = file.size / 1024;
  if (size > 1000) {
    return `${(size / 1024).toFixed(2)}MB`;
  } else {
    return `${size.toFixed(2)}KB`;
  }
};

// 判断文件是否是可以以文本展示
export const checkFileText = (file: File) => {
  if (file.type === "" || file.type.includes("text")) {
    return true;
  } else if (file.type.includes("json")) {
    return true;
  } else {
    return false;
  }
};
