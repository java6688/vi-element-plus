<template>
  <el-popconfirm
    title="确认执行该操作？"
    @confirm="onConfirm"
  >
    <template #reference>
      <el-button
        v-if="config.popconfirm && !isHidden"
        v-perms="config.auth ? config.auth : []"
        :type="config.type"
        :size="config.size"
        >{{ config.text }}</el-button
      >
    </template>
  </el-popconfirm>
  <el-button
    v-if="!config.popconfirm && !isHidden"
    v-perms="config.auth ? config.auth : []"
    :type="config.type"
    :size="config.size"
    @click="onClick"
    >{{ config.text }}</el-button
  >
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ActionConfig } from "./types";
import { ElButton, ElPopconfirm } from 'element-plus'

const props = defineProps<{
  config: ActionConfig;
  row: any;
}>();

const isHidden = computed(() => {
  return props.config.hidden && props.config.hidden(props.row);
});

const onClick = () => {
  props.config.click?.(props.row);
};

const onConfirm = () => {
  props.config.popconfirm?.onConfirm?.(props.row);
};
</script>
