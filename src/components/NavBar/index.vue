<template>
  <nav class="nav-bar-container">
    <div class="title">资源管理器</div>
    <div class="options">操作区</div>
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.nav-bar-container {
  width: 100%;
  height: 28px;
  line-height: 28px;
  display: flex;
  color: var(--color-text);
  font-size: 14px;
  padding: 0 8px;
  .title {
    cursor: pointer;
  }
  .options {
    margin-left: 24px;
  }
}
</style>
