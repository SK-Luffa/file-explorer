<script setup lang="ts">
import NavBar from "./components/NavBar/index.vue";
import Code from "./components/Code/index.vue";
import { reactive, ref } from "vue";
import { CodeFileType, CodeStatus, type CodeFile } from "./types";
import { CodeThemeEnum } from "./config/theme";

const state = reactive({
  status: CodeStatus.CHOOSE_FILES,
  themeKey: CodeThemeEnum.ATOM_ONE_DARK,
});
// 传递给 Code 组件的文件列表
const fileList = ref<CodeFile[]>([
  {
    name: "test.js",
    type: CodeFileType.JS,
    content: "console.log('Hello World');",
  },
  {
    name: "index.js",
    type: CodeFileType.JS,
    content: "console.log('test');",
  },
]);
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
      <div class="side"></div>
      <div class="content">
        <Code
          :status="state.status"
          :themeKey="state.themeKey"
          :fileList="fileList"
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
    height: 100%;

    .side {
      width: 200px;
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
