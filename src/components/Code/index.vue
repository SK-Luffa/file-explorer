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
          @click="state.selectedKey = item.key"
        >
          <div class="text">{{ item.title }}</div>
          <div class="close" v-if="selectedFile?.key === item.key">X</div>
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
    <button>选择文件</button>
    <button>选择文件夹</button>
  </div>
</template>

<script setup lang="ts">
import "./index.scss";
import { reactive, computed } from "vue";
import { CodeStatus, type FileType } from "@/types";
import type { CodeThemeEnum } from "@/config/theme";
const props = defineProps<{
  status: CodeStatus;
  themeKey: CodeThemeEnum;
  fileList?: FileType[];
}>();
defineEmits(["changeTheme"]);

const state = reactive({
  selectedKey: "",
});

const selectedFile = computed(() => {
  const result = props.fileList?.find((item) => item.key === state.selectedKey);
  if (!result && props.fileList?.length) {
    return props.fileList[0];
  }
  return result;
});
</script>

<style lang="scss" scoped></style>
