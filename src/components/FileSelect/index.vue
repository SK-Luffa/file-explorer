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
      <div v-else class="select-btn" @click="fileShowDirectoryPicker">
        打开文件夹
      </div>
      <!-- <div class="selectBtn" @click="fileUpLoadClick">打开文件</div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { CodeStatus, type FileType } from "@/types";
import { recurrence, selectDirectory } from "@/utils/fileUpload";

type FileSelectProps = {
  status: CodeStatus;
  selectedTreeKey: any[];
  treeData: FileType[];
};
const props = defineProps<FileSelectProps>();

const emit = defineEmits([
  "treeSelectedChange",
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
  console.log(keys, "keys");
  emit("treeSelectedDataChange", e.selectedNodes);
  emit("treeSelectedChange", keys);
};

const onTreeDataChange = (data: FileType[]) => {
  emit("treeDataChange", data);
};

const onStatusChange = (status: CodeStatus) => {
  emit("statusChange", status);
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
