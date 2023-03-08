<template>
  <div class="file-root">
    <div class="header">资源管理器</div>
    <div class="content">
      <div v-if="props.status === CodeStatus.CHOOSE_FILES">
        <a-directory-tree
          class="file-tree"
          :selectedKeys="props.selectedTreeKey"
          multiple
          :tree-data="props.treeData"
          @select="onTreeSelectChange"
        ></a-directory-tree>
      </div>
      <div v-else class="select-btn">
        <Button :width="300" @click="fileShowDirectoryPicker"> 打开文件夹</Button>
      </div>
      <!-- <div class="selectBtn" @click="fileUpLoadClick">打开文件</div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { CodeStatus, type FileType, type Tree } from "@/types";
import { recurrence, selectDirectory } from "@/utils/file-upload";
import Button from "@/components/Button/index.vue";

type FileSelectProps = {
  status: CodeStatus;
  selectedTreeKey: any[];
  treeData: FileType[];
};
const props = defineProps<FileSelectProps>();

const emit = defineEmits([
  "treeSelectedKeysChange",
  "treeDataChange",
  "statusChange",
  "treeSelectedDataChange",
]);

const fileShowDirectoryPicker = async () => {
  const res = await selectDirectory();
  const treeData = recurrence([res]);
  onTreeDataChange(treeData);
  onStatusChange(CodeStatus.CHOOSE_FILES);
  console.log(treeData, "treeData");
};

const onTreeSelectChange = (keys: any[], e: any) => {
  emit("treeSelectedDataChange", e.selectedNodes[0]);
  emit("treeSelectedKeysChange", keys, e.selectedNodes[0].isLeaf);
};

const onTreeDataChange = (data: Tree[]) => {
  emit("treeDataChange", data);
};

const onStatusChange = (status: CodeStatus) => {
  emit("statusChange", status);
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
