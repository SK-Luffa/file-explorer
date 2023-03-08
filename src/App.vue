<script setup lang="ts">
import NavBar from "./components/NavBar/index.vue";
import Code from "./components/Code/index.vue";
import { reactive, ref, type Ref } from "vue";
import { CodeStatus, type Tree } from "./types";
import { CodeThemeEnum } from "./config/theme";
import FileSelect from "./components/FileSelect/index.vue";
import type { FileType } from "@/types";
type State = {
  status: CodeStatus; // 是否选中文件
  themeKey: CodeThemeEnum; // 主题key
  treeData: Tree[]; // 文件树数据
  selectedTreeKeys: string[]; // 选中的文件树的节点key
  selectedTreeData?: Tree; // 选中的文件树的节点data
  selectedFileKey: string; // 选中的文件key
};
// 侧边栏宽度
type SideWidthType = {
  width: number;
  minWidth: number;
};
const sideWidth: Ref<SideWidthType> = ref({
  width: 500,
  minWidth: 200,
});

const state = reactive<State>({
  status: CodeStatus.NO_CHOOSE_FILES,
  themeKey: CodeThemeEnum.ATOM_ONE_DARK,
  treeData: [],
  selectedTreeKeys: [],
  selectedFileKey: "",
});

const codeFileList = ref<FileType[]>([]); // 编辑器区域的文件列表

// 选中的文件列表
const onTreeSelectedKeyChange = (keys: string[], isLeaf?: boolean) => {
  state.selectedTreeKeys = keys;
  console.log(isLeaf);
  if (isLeaf) {
    state.selectedFileKey = keys[0];
  }
};

// 选中的文件数据
const onTreeSelectedDataChange = async (node: Tree) => {
  state.selectedTreeData = node;
  if (codeFileList.value.find((item) => item.key === node.key)) return; // 如果已经存在了就不再加入文件列表
  if (node.isLeaf) {
    const file = await node.item.getFile(); // 获取文件数据
    const reader = new FileReader();
    reader.readAsText(file, "utf-8"); // 读取文件(utf-8格式)
    const fileType = (node.title.split(".") as any).at(-1); // 获取文件类型
    reader.onload = () => {
      const fileData: FileType = {
        key: node.key,
        title: node.title,
        content: reader.result as string,
        fileType: fileType,
      };
      codeFileList.value.push(fileData);
    };
  }
};

// 编辑器区域改动选择的文件列表 处理函数
const onCodeSelectedChange = (data: FileType[]) => {
  if (data.length === 0) {
    state.selectedTreeKeys = [];
  }
  codeFileList.value = data;
};

// 文件树数据改变
const onTreeDataChange = (data: Tree[]) => {
  state.treeData = data;
  if (state.treeData) {
    // 如果选择过文件夹，重置选中的文件列表
    state.selectedTreeKeys = [];
    state.selectedFileKey = "";
    codeFileList.value = [];
  }
};

// 状态改变
const onStatusChange = (status: CodeStatus) => {
  state.status = status;
};
</script>

<template>
  <div class="container">
    <header class="header">
      <NavBar
        :themeKey="state.themeKey"
        @changeTheme="(key) => (state.themeKey = key)"
        @treeDataChange="onTreeDataChange"
        @statusChange="onStatusChange"
      ></NavBar>
    </header>
    <div class="wrapper">
      <div
        class="side"
        :style="{
          width: sideWidth.width + 'px',
          minWidth: sideWidth.minWidth + 'px',
        }"
      >
        <FileSelect
          :status="state.status"
          :selectedTreeKey="state.selectedTreeKeys"
          :treeData="state.treeData"
          @treeSelectedKeysChange="onTreeSelectedKeyChange"
          @treeSelectedDataChange="onTreeSelectedDataChange"
          @treeDataChange="onTreeDataChange"
          @statusChange="onStatusChange"
        />
      </div>
      <div
        class="content"
        :style="{
          width: `calc(100% - ${sideWidth.width}px )`,
        }"
      >
        <Code
          :status="state.status"
          :themeKey="state.themeKey"
          :fileList="codeFileList"
          :selectedFileKey="state.selectedFileKey"
          @selectedFileKeychange="(key) => (state.selectedFileKey = key)"
          @selectedDataChange="onCodeSelectedChange"
          @status-change="onStatusChange"
          @tree-data-change="onTreeDataChange"
        ></Code>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: var(--color-background);
  .header {
    background-color: var(--color-background-mute);
  }
  .wrapper {
    display: flex;
    width: 100%;
    height: calc(100% - 28px);

    .side {
      height: 100%;
      background-color: var(--black-soft);
    }
    .content {
      flex: 1 1 auto;
      height: 100%;
    }
  }
}
</style>
