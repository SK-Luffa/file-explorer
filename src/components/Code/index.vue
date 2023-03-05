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
          :class="{ active: chooseFile?.name === item.name }"
          v-for="item in props.fileList"
          :key="item.name"
          @click="state.chooseName = item.name"
        >
          <div class="text">{{ item.name }}</div>
          <div class="close" v-if="chooseFile?.name === item.name">X</div>
        </li>
      </ul>
    </div>
    <div class="editor">
      <highlightjs
        v-if="chooseFile"
        :language="chooseFile?.type"
        :code="chooseFile?.content"
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
import { CodeStatus } from "@/types";
import type { CodeFile } from "@/types";
import type { CodeThemeEnum } from "@/config/theme";
const props = defineProps<{
  status: CodeStatus;
  themeKey: CodeThemeEnum;
  fileList?: CodeFile[];
}>();
defineEmits(["changeTheme"]);

const state = reactive({
  chooseName: "",
});

const chooseFile = computed(() => {
  const result = props.fileList?.find((item) => item.name === state.chooseName);
  if (!result && props.fileList?.length) {
    return props.fileList[0];
  }
  return result;
});
</script>

<style lang="scss" scoped></style>
