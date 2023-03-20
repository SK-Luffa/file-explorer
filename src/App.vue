<script setup lang="ts">
import NavBar from './components/NavBar/index.vue';
import Code from './components/Code/index.vue';
import { reactive, ref, type Ref } from 'vue';
import { CodeStatus, imageTypeEmnu, type Tree } from './types';
import { CodeThemeEnum } from './config/theme';
import FileSelect from './components/FileSelect/index.vue';
import type { FileType } from '@/types';
import { checkFileText } from './utils';
type State = {
  status: CodeStatus; // 是否选中文件
  themeKey: CodeThemeEnum; // 主题key
  treeData: Tree[]; // 文件树数据
  selectedTreeKeys: string[]; // 选中的文件树的节点key
  selectedTreeData?: Tree; // 选中的文件树的节点data
};
// 侧边栏宽度
type SideWidthType = {
  width: number;
  minWidth: number;
};
const sideWidth: Ref<SideWidthType> = ref({
  width: 300,
  minWidth: 200,
});

const state = reactive<State>({
  status: CodeStatus.NO_CHOOSE_FILES,
  themeKey: CodeThemeEnum.ATOM_ONE_DARK,
  treeData: [],
  selectedTreeKeys: [],
});

const codeState = reactive({
  selectedFileKey: '', // 选中的文件key
  codeFileList: [] as FileType[], // 编辑器区域的文件列表
});

// 选中的文件列表
const onTreeSelectedKeyChange = (keys: string[], isLeaf?: boolean) => {
  state.selectedTreeKeys = keys;
  if (isLeaf) {
    codeState.selectedFileKey = keys[0];
  }
};

// 选中的文件数据
const onTreeSelectedDataChange = async (node: Tree) => {
  state.selectedTreeData = node;
  if (codeState.codeFileList.find((item) => item.key === node.key)) return; // 如果已经存在了就不再加入文件列表
  if (node.isLeaf) {
    const fileType = node.title.split('.').at(-1); // 获取文件类型

    const file = await node.item.getFile(); // 获取文件数据
    const reader = new FileReader();

    const fileData: FileType = {
      key: node.key,
      title: node.title,
      content: (reader.result || undefined) as string | undefined,
      fileType: fileType,
      file,
    };
    if (codeState.codeFileList.length > 5) {
      codeState.codeFileList.splice(5, 0, fileData);
    } else {
      codeState.codeFileList.push(fileData);
    }

    if (imageTypeEmnu.includes(file.type)) {
      // 图片类型
      reader.readAsDataURL(file); // 读取文件(二进制格式)
    } else if (checkFileText(file)) {
      // 文本类型
      reader.readAsText(file, 'utf-8'); // 读取文件(utf-8格式)
    } else if (file.type.includes('video')) {
      // 视频类型
      reader.readAsDataURL(file); // 读取文件(二进制格式)
    } else {
      console.log('其他类型');
      // 其他类型 暂不支持
      // 读取文件(utf-8格式)
      return;
    }

    reader.onload = () => {
      fileData.content = reader.result as string;
      codeState.codeFileList = [
        ...codeState.codeFileList.map((item) => {
          if (item.key === node.key) {
            return fileData;
          }
          return item;
        }),
      ];
    };
  }
};

// 编辑器区域改动选择的文件列表 处理函数
const onCodeSelectedChange = (data: FileType[]) => {
  if (data.length === 0) {
    codeState.codeFileList = [];
    return;
  }
  const res = data.find((item) => item.key === codeState.selectedFileKey);
  if (!res) {
    state.selectedTreeKeys = [];
    codeState.selectedFileKey = data[0].key;
  }
  codeState.codeFileList = data;
};

// 文件树数据改变
const onTreeDataChange = (data: Tree[]) => {
  state.treeData = data;
  if (state.treeData) {
    // 如果选择过文件夹，重置选中的文件列表
    state.selectedTreeKeys = [];
    codeState.selectedFileKey = '';
    codeState.codeFileList = [];
  }
};

// 状态改变
const onStatusChange = (status: CodeStatus) => {
  state.status = status;
};

const fileListMouseDown = (e: any) => {
  if (e.button !== 0) {
    //左键判断
    return;
  }
  // let downX: number = e.pageX;
  window.onmousemove = function (e) {
    sideWidth.value.width = e.pageX;
    e.pageX <= 200 ? (sideWidth.value.width = 200) : '';
  };
  window.onmouseup = window.onmouseleave = function (e) {
    if (e.button === 0) {
      window.onmousemove = null;
    }
  };
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
        class="flie-mouse"
        @mousedown="fileListMouseDown"
        :style="{
          left: sideWidth.width - 2 + 'px',
        }"
      ></div>
      <div
        class="content"
        :style="{
          width: `calc(100% - ${sideWidth.width}px )`,
        }"
      >
        <Code
          :status="state.status"
          :themeKey="state.themeKey"
          :fileList="codeState.codeFileList"
          :selectedFileKey="codeState.selectedFileKey"
          @selectedFileKeychange="(key) => (codeState.selectedFileKey = key)"
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
    height: calc(100% - 36px);

    .side {
      height: 100%;
      background-color: var(--black-soft);
    }

    .content {
      flex: 1 1 auto;
      height: 100%;
      background-color: var(--color-background);
    }
  }

  .flie-mouse {
    width: 4px;
    height: 100%;
    position: absolute;
    top: 2;
  }

  .flie-mouse:hover {
    z-index: 1;
    cursor: col-resize;
    background-color: var(--button-primary-background);
  }
}
</style>
