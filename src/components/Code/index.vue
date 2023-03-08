<template>
  <div
    v-if="status === CodeStatus.CHOOSE_FILES"
    class="code-container"
    :class="themeKey"
  >
    <div class="code-header">
      <ul class="list">
        <li
          class="file"
          :class="{ active: selectedFile?.key === item.key }"
          v-for="item in props.fileList"
          :key="item.title"
          @click="() => emit('selectedFileKeychange', item.key)"
        >
          <div class="text">{{ item.title }}</div>
          <div
            class="close"
            :class="{ active: selectedFile?.key === item.key }"
            @click="onSelectedDataChange(item.key)"
          >
            <CloseOutlined />
          </div>
        </li>
      </ul>
    </div>
    <div class="editor">
      <highlightjs
        v-if="selectedFile"
        :language="selectedFile.fileType"
        :code="selectedFile?.content"
      />
    </div>
  </div>
  <div v-else class="empty">
    <!-- <button>选择文件</button> -->
    <Button @click="fileShowDirectoryPicker">选择文件夹</Button>
  </div>
</template>

<script setup lang="ts">
import "./index.scss";
import { computed } from "vue";
import { CodeStatus, type FileType, type Tree } from "@/types";
import type { CodeThemeEnum } from "@/config/theme";
import { CloseOutlined } from "@ant-design/icons-vue";
import { recurrence, selectDirectory } from "@/utils/file-upload";
import Button from "@/components/Button/index.vue";
const props = defineProps<{
  status: CodeStatus;
  themeKey: CodeThemeEnum;
  selectedFileKey?: string; // 选中的文件key
  fileList?: FileType[]; // 文件列表
}>();
const emit = defineEmits([
  "changeTheme",
  "selectedFileKeychange",
  "selectedDataChange",
  "treeDataChange",
  "statusChange",
]);

// 选中的文件
const selectedFile = computed(() => {
  const result = props.fileList?.find(
    (item) => item.key === props.selectedFileKey
  );
  if (!result && props.fileList?.length) {
    return props.fileList[0];
  }
  return result;
});

// 选择文件夹
const fileShowDirectoryPicker = async () => {
  const res = await selectDirectory();
  const treeData = recurrence([res]);
  onTreeDataChange(treeData);
  onStatusChange(CodeStatus.CHOOSE_FILES);
  console.log(treeData, "treeData");
};

const onTreeDataChange = (data: Tree[]) => {
  emit("treeDataChange", data);
};

const onStatusChange = (status: CodeStatus) => {
  emit("statusChange", status);
};

const onSelectedDataChange = (key: string) => {
  const data = props.fileList?.filter((item) => item.key !== key);
  emit("selectedDataChange", data);
};
</script>

<style lang="scss" scoped></style>
