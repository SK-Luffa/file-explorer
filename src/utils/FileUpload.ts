import type { FileType } from "@/types";

export const selectDirectory = () =>
  new Promise<any>((reslove, reject) => {
    try {
      (window as any)
        .showDirectoryPicker()
        .then((handle: FileSystemDirectoryHandle) => {
          processHandle(handle).then((res) => {
            reslove(res);
          });
        });
    } catch (error) {
      // 失败拒绝处理
      console.log(error);
      reject(error);
    }
  });

// 写一个递归方法 将得到文件夹树形句柄转换为antd需要的样子
export const recurrence = (arr: any[], path: string = "/"): FileType[] => {
  const asx: FileType[] = [];
  arr.forEach(async (item) => {
    if (item.kind === "file") {
      // const file = await item.getFile();
      // const reader = new FileReader();
      // reader.readAsText(file, "utf-8");

      reader.onload = () => {
       
      };
    } else if (item.kind === "directory") {
      if (item.children?.length === "0") {
        asx.push({
          key: path + item.name,
          title: item.name,
          kind: item.kind,
          fileType: item.name.split(".").at(-1),
          isLeaf: false,
          children: [],
        });
      } else {
        asx.push({
          key: path + item.name,
          title: item.name,
          kind: item.kind,
          children: recurrence(item.children, `${path}` + `${item.name}/`),
          isLeaf: false,
        });
      }
    }
  });
  return asx;
};

//打开文件
export const fileUpLoadClick = () => {
  (window as any).showOpenFilePicker();
};

// 拿到文件的信息，进行一个处理  handle showDirectoryPicker拿到的文件信息
const processHandle = async (handle: any) => {
  if (handle.kind === "file") {
    return handle;
  }
  handle.children = [];
  // 返回一个异步迭代器
  const iter = handle.entries();
  for await (const item of iter) {
    //   processHandle(item[1]读取的文件或文件夹的第一项是其文件或文件夹的名称
    handle.children.push(await processHandle(item[1]));
  }

  return handle;
};
