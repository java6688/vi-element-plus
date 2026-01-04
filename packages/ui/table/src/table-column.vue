<template>
  <el-table-column
    v-if="data.type === 'index'"
    type="index"
    label="#"
    align="center"
  />
  <el-table-column v-else-if="data.type === 'expand'">
    <template #default="{ row }: { row: any; $index: number }">
      <RenderCell v-if="data.render" :render="data.render" :row="row" />
    </template>
  </el-table-column>
  <el-table-column v-else-if="data.type === 'switch'">
    <template #default="{ row }: { row: any; $index: number }">
      <el-switch
        :model-value="row[data.prop!]"
        :inline-prompt="data.switchConfig?.inlinePrompt"
        :active-text="data.switchConfig?.activeText"
        :inactive-text="data.switchConfig?.inactiveText"
        @change="(value) => {data.switchConfig?.onChange?.(row, value)}"
      />
    </template>
  </el-table-column>
  <el-table-column v-else-if="data.type === 'tag'">
    <template #default="{ row }: { row: any; $index: number }">
      <el-tag
        :type="
          data.tagConfig?.formatType
            ? data.tagConfig.formatType(row)
            : data.tagConfig?.type
        "
      >
        {{
          data.formatValue ? data.formatValue(row[data.prop!]) : row[data.prop!]
        }}
      </el-tag>
    </template>
  </el-table-column>
  <el-table-column v-else>
    <template #default="{ row }: { row: any; $index: number }">
      <RenderCell v-if="data.render" :render="data.render" :row="row" />
      <span v-else-if="data.prop">{{
        data.formatValue ? data.formatValue(row[data.prop]) : row[data.prop]
      }}</span>
      <div v-if="data.buttons && data.buttons.length > 0" class="btns">
        <!-- <el-button
          v-for="(btn, index) in data.buttons"
          :key="index"
          v-perms="btn.auth ? btn.auth : []"
          :type="btn.type"
          :size="btn.size"
          @click="btn.click(row)"
          >{{ btn.text }}</el-button
        > -->
        <ViAction
          v-for="(btn, index) in data.buttons"
          :key="index"
          :config="btn"
          :row="row"
        />
      </div>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import type { TableColumnConfig } from "./types";
import RenderCell from "./render-cell.vue";
import ViAction from "./action.vue";
import { ElTableColumn, ElTag, ElSwitch } from 'element-plus'

defineProps<{
  data: TableColumnConfig;
}>();
</script>
