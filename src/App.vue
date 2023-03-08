<script setup lang="ts">
import NavBar from "./components/NavBar/index.vue";
import Code from "./components/Code/index.vue";
import { reactive, ref, type Ref } from "vue";
import { CodeStatus } from "./types";
import { CodeThemeEnum } from "./config/theme";
import FileSelect from "./components/FileSelect/index.vue";
import type { FileType } from "@/types";
type State = {
  status: CodeStatus;
  themeKey: CodeThemeEnum;
  treeData: FileType[];
  selectedTreeKey: any[];
  selectedTreeData?: FileType;
};
type SideWidthType = {
  width: string
  minWidth:string
 
};
const side_width: Ref<SideWidthType> = ref({ width: "500px", minWidth: '200px'});
const state = reactive<State>({
  status: CodeStatus.NO_CHOOSE_FILES,
  themeKey: CodeThemeEnum.ATOM_ONE_DARK,
  treeData: [],
  selectedTreeKey: [],
});

const codeFileList = ref<FileType[]>([]);

// 选中的文件列表
const onTreeSelectedChange = (keys: any[]) => {
  state.selectedTreeKey = keys;
};
// 选中的文件数据
const onTreeSelectedDataChange = (node: any) => {
  state.selectedTreeData = node;
  if (node.kind === "file") {
    if (codeFileList.value.find((item) => item.key === node.key)) return;
    codeFileList.value.push(node);
  }
};
const onTreeDataChange = (data: FileType[]) => {
  console.log(data, "data");
  state.treeData = data;
};

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
      ></NavBar>
    </header>
    <div class="wrapper">
      <div class="side" :style="side_width">
        <FileSelect
          :status="state.status"
          :selectedTreeKey="state.selectedTreeKey"
          :treeData="state.treeData"
          @treeSelectedChange="onTreeSelectedChange"
          @treeSelectedDataChange="onTreeSelectedDataChange"
          @treeDataChange="onTreeDataChange"
          @statusChange="onStatusChange"
        />
      </div>
      <div class="content">
        <Code
          :status="state.status"
          :themeKey="state.themeKey"
          :fileList="codeFileList"
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
