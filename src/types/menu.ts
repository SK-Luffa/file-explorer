// 导航菜单类型
export type Menu = {
  key: string;
  title: string;
  children?: Menu[];
  handle?: () => void;
};

export type Menus = Menu[];
