import type { Menus } from "@/types/menu";

export const menus: Menus = [
  {
    key: "file",
    title: "文件",
    children: [
      {
        key: "choose-file",
        title: "选择文件",
        handle: () => {
          console.log("选择文件");
        },
      },
      {
        key: "choose-folder",
        title: "选择文件夹",
        handle: () => {
          console.log("选择文件夹");
        },
      },
    ],
  },
  {
    key: "theme",
    title: "主题",
    children: [
      {
        key: "editor-theme",
        title: "切换编辑器主题",
        handle() {},
      },
    ],
  },
];
