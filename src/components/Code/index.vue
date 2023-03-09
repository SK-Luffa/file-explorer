<template>
  <div
    v-if="status === CodeStatus.CHOOSE_FILES"
    class="code-container"
    :class="themeKey"
  >
    <div class="code-header" v-if="props.fileList?.length">
      <ul class="list no-scroller">
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
            @click.stop="onSelectedDataChange(item.key)"
          >
            <CloseOutlined />
          </div>
        </li>
      </ul>
    </div>
    <div class="content" v-if="selectedFile">
      <template v-if="imageTypeEmnu.includes(selectedFile?.file?.type || '')">
        <div class="image-container">
          <div class="file-size" v-if="selectedFile.file">
            文件大小：{{ getFileSizeResult(selectedFile.file) }}
          </div>
          <img :src="selectedFile?.content" :title="selectedFile?.file?.name" />
        </div>
      </template>
      <template v-else-if="checkFileText(selectedFile?.file as File)">
        <highlightjs
          v-if="selectedFile.content"
          :code="selectedFile?.content"
        />
      </template>
      <template v-else-if="selectedFile?.file?.type.includes('video')">
        <div class="file-size" v-if="selectedFile.file">
          文件大小：{{ getFileSizeResult(selectedFile.file) }}
        </div>
        <div class="video-wrapper">
          <video class="video" :src="selectedFile.content" controls></video>
        </div>
      </template>
      <template v-else>
        <div class="empty">
          <div class="text">暂不支持该文件类型</div>
        </div>
      </template>
    </div>
    <div class="no-choose-file-empty" v-else>
      <div class="text">选中文件进行查看</div>
    </div>
  </div>
  <div v-else class="no-choose-folder-empty">
    <!-- <button>选择文件</button> -->
    <Button @click="fileShowDirectoryPicker">选择文件夹</Button>
  </div>
</template>

<script setup lang="ts">
import "./index.scss";
import { computed } from "vue";
import { CodeStatus, imageTypeEmnu, type FileType, type Tree } from "@/types";
import type { CodeThemeEnum } from "@/config/theme";
import { CloseOutlined } from "@ant-design/icons-vue";
import { recurrence, selectDirectory } from "@/utils/file-upload";
import Button from "@/components/Button/index.vue";
import { checkFileText, getFileSizeResult } from "@/utils";

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
  if (!result && props.fileList?.length === 1) {
    return props.fileList[0];
  }
  return result;
});

// 选择文件夹
const fileShowDirectoryPicker = async () => {
  const res = await selectDirectory(); // 选择文件夹
  const treeData = recurrence([res]); // 递归文件夹获取树形结构数组
  onTreeDataChange(treeData);
  onStatusChange(CodeStatus.CHOOSE_FILES);
};

// 树形结构变化
const onTreeDataChange = (data: Tree[]) => {
  emit("treeDataChange", data);
};
// 是否选择文件状态变化
const onStatusChange = (status: CodeStatus) => {
  emit("statusChange", status);
};
// 选中的文件变化
const onSelectedDataChange = (key: string) => {
  const data = props.fileList?.filter((item) => item.key !== key);
  emit("selectedDataChange", data);
};
</script>

<style lang="scss" scoped></style>
