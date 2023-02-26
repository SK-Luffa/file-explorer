<script setup lang="ts">
import NavBar from "./components/NavBar/index.vue"
</script>

<template>
  <div class="container">
    <header class="header">
      <NavBar></NavBar>
    </header>
    <div class="wrapper">
      <div class="side"></div>
      <div class="content"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
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
