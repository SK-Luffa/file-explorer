<template>
  <div class="file-root">
    <div class="header">资源管理器</div>
    <div class="content">
      <div v-if="props.status === CodeStatus.CHOOSE_FILES">
        <a-directory-tree
          class="file-tree"
          :selectedKeys="props.selectedTreeKey"
          multiple
          v-model:expandedKeys="state.treeExpandedKeys"
          :tree-data="props.treeData"
          @select="onTreeSelectChange"
        ></a-directory-tree>
      </div>
      <div v-else class="select-btn">
        <Button :width="300" @click="fileShowDirectoryPicker">
          打开文件夹</Button
        >
      </div>
      <!-- <div class="selectBtn" @click="fileUpLoadClick">打开文件</div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { CodeStatus, type FileType, type Tree } from "@/types";
import { recurrence, selectDirectory } from "@/utils/file-upload";
import Button from "@/components/Button/index.vue";
import { reactive } from "vue";

type FileSelectProps = {
  status: CodeStatus;
  selectedTreeKey: string[];
  treeData: FileType[];
};
const props = defineProps<FileSelectProps>();

const state = reactive({
  treeExpandedKeys: [] as string[],
});

const emit = defineEmits([
  "treeSelectedKeysChange",
  "treeDataChange",
  "statusChange",
  "treeSelectedDataChange",
]);

const fileShowDirectoryPicker = async () => {
  const res = await selectDirectory(); // 选择文件夹
  const treeData = recurrence([res]); // 递归文件夹获取树形结构数组
  onTreeDataChange(treeData);
  onStatusChange(CodeStatus.CHOOSE_FILES);
  state.treeExpandedKeys = [treeData[0].key]; // 默认展开第一个文件夹
};

// 点击某个文件/文件夹
const onTreeSelectChange = (keys: string[], e: any) => {
  emit("treeSelectedDataChange", e.selectedNodes[0]);
  emit("treeSelectedKeysChange", keys, e.selectedNodes[0].isLeaf);
};

// 选择文件夹
const onTreeDataChange = (data: Tree[]) => {
  emit("treeDataChange", data);
};

// 是否选择文件夹状态改变
const onStatusChange = (status: CodeStatus) => {
  emit("statusChange", status);
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
