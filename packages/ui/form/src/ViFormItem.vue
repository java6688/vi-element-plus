<template>
  <el-form-item v-if="!item.hidden">
    <slot />
  </el-form-item>
</template>

<script setup lang="ts">
import type { FormItemConfig } from "./types";
import { ElFormItem } from "element-plus";

defineProps<{
  item: FormItemConfig;
}>();
</script>
