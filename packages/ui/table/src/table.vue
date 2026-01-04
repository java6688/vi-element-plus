<template>
  <el-table
    ref="TableRef"
    :data="data"
    v-loading="loading"
    class="vi-table"
    style="width: 100%"
    header-row-class-name="table-header"
  >
    <slot name="first" />
    <ViTableColumn
      v-for="item in columns"
      :key="item.prop"
      :prop="item.prop"
      :label="getLabel(item)"
      :type="item.type"
      :width="item.width"
      :data="item"
      :align="item.align ? item.align : align"
    />
    <slot />
    <slot name="last" />
  </el-table>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import ViTableColumn from "./table-column.vue";
import type { TableColumnConfig } from "./types";
import { ElTable, vLoading } from 'element-plus'

withDefaults(
  defineProps<{
    data: any[];
    loading?: boolean;
    columns?: TableColumnConfig[];
    align?: "left" | "center" | "right";
  }>(),
  {
    loading: false,
    align: "center"
  }
);

const getLabel = (item: TableColumnConfig) => {
  return item.label ?? item.prop;
};

const TableRef = useTemplateRef("TableRef");

const updateKeyChildren = <T = any,>(key: string, data: T[]) => {
  TableRef.value?.updateKeyChildren(key, data);
};
defineExpose({
  updateKeyChildren
});
</script>
