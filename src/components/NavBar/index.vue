<template>
  <nav class="nav-bar-container">
    <div>
      <a href="https://github.com/SK-Luffa/file-explorer" target="_blank">
        <FireOutlined
      /></a>
    </div>
    <ul class="menus">
      <li v-for="item in menus" :key="item.key" class="menu">
        {{ item.title }}
        <div class="children-container">
          <div
            v-for="child in item.children"
            :key="child.key"
            class="child"
            @click="() => child.handle && child.handle()"
          >
            {{ child.title }}
          </div>
        </div>
      </li>
    </ul>

    <div class="modal" v-if="state.modal.visible" @click.stop="">
      <div class="theme" v-if="state.modal.type === 'theme'">
        <div
          class="theme-item"
          :class="themeKey === item.key ? 'active' : ''"
          v-for="item in codeTheme"
          :key="item.key"
          @click="$emit('changeTheme', item.key)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <div
      class="mask"
      v-if="state.modal.visible"
      @click="state.modal.visible = false"
    ></div>
  </nav>
</template>

<script setup lang="ts">
import { codeTheme, CodeThemeEnum } from '@/config/theme';
import { reactive } from 'vue';
import type { Menus } from '@/types/menu';
import { CodeStatus, type Tree } from '@/types';
import { selectDirectory, recurrence } from '@/utils/file-upload';
import { FireOutlined } from '@ant-design/icons-vue';

type NavBarProps = {
  themeKey: CodeThemeEnum;
};

type NavBarState = {
  // 弹窗
  modal: {
    visible: boolean;
    type: 'theme'; //后续会扩展
  };
};

const menus: Menus = [
  {
    key: 'file',
    title: '文件',
    children: [
      // {
      //   key: "choose-file",
      //   title: "选择文件",
      //   handle: () => {
      //     console.log("选择文件");
      //   },
      // },
      {
        key: 'choose-folder',
        title: '选择文件夹',
        handle: () => {
          fileShowDirectoryPicker();
        },
      },
    ],
  },
  {
    key: 'theme',
    title: '主题',
    children: [
      {
        key: 'editor-theme',
        title: '切换编辑器主题',
        handle() {
          state.modal.visible = true;
          state.modal.type = 'theme';
        },
      },
    ],
  },
];

defineProps<NavBarProps>();
const emit = defineEmits(['changeTheme', 'treeDataChange', 'statusChange']);

const state = reactive<NavBarState>({
  modal: {
    visible: false,
    type: 'theme',
  },
});

const fileShowDirectoryPicker = async () => {
  const res = await selectDirectory();
  const treeData = recurrence([res]);
  onTreeDataChange(treeData);
  onStatusChange(CodeStatus.CHOOSE_FILES);
};

const onTreeDataChange = (data: Tree[]) => {
  emit('treeDataChange', data);
};

const onStatusChange = (status: CodeStatus) => {
  emit('statusChange', status);
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
