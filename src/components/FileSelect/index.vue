<template>
  <div class="Fileroot">
    <div v-if="!chosen_if" class="selectBtn" @click="File_showDirectoryPicker">
      打开文件夹
    </div>
    <!-- <div class="selectBtn" @click="fileUpLoadClick">打开文件</div> -->

    <div v-if="chosen_if">
      <a-directory-tree
        class="File_tree"
        v-model:selectedKeys="selectedKeys"
        multiple
        :tree-data="treeData"
      ></a-directory-tree>
    </div>
  </div>
</template>
<script setup lang="ts">
import "./index.scss";
import { ref } from "vue";

let chosen_if: any = ref(false); //是否选中文件或文件夹，用来控制打开文件按钮和树形结构的切换

const selectedKeys = ref([]);
let treeData: [] = [];

const File_showDirectoryPicker = async () => {
  //打开文件夹文件夹
  try {
    const handle = await window.showDirectoryPicker();
    const handleList = await processHandle(handle);
    treeData = recurrence(handleList.children);
    chosen_if.value = true;
    console.log(treeData);
  } catch (error) {
    // 失败拒绝处理
  }
};

// 写一个递归方法 将得到文件夹树形句柄转换为antd需要的样子
const recurrence = (arr: any[]): any => {
  let asx: any = [];
  arr.forEach((item) => {
    if (item.kind === "file") {
      asx.push({ title: item.name, isLeaf: true });
    } else if (item.kind === "directory") {
      if (item.children.length === "0") {
        asx.push({
          title: item.name,
          isLeaf: false,
          children: [],
        });
      } else {
        asx.push({
          title: item.name,
          children: recurrence(item.children),
          isLeaf: false,
        });
      }
    }
  });
  return asx;
};

// const fileUpLoadClick = () => {//打开文件
//     window.showOpenFilePicker()
// }

// 拿到文件的信息，进行一个处理  handle showDirectoryPicker拿到的文件信息
const processHandle = async (handle: any) => {
  if (handle.kind === "file") {
    return handle;
  }
  handle.children = [];
  // 返回一个异步迭代器
  const iter = handle.entries();
  for await (const item of iter) {
    //   processHandle(item[1]读取的文件或文件夹的第一项是其文件或文件夹的名称
    handle.children.push(await processHandle(item[1]));
  }

  return handle;
};
</script>
