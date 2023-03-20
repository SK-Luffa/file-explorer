<template>
  <button
    class="my-button"
    :style="{
      width: width,
      backgroundColor: `var(--button-${type}-background)`,
    }"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type ButtonProps = {
  width?: string;
  type?: "primary" | "success" | "error" | "default";
};

withDefaults(defineProps<ButtonProps>(), {
  type: "primary",
});
const emit = defineEmits(["click"]);
</script>

<style lang="scss" scoped>
.my-button {
  background-color: var(--button-primary-background);
  border: none;
  color: var(--text-file-color);
  padding: 8px 16px;
  outline: none;

  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
}
</style>
