<template>
  <el-form ref="form" :model="model" :rules="rules" @submit.prevent>
    <ViFormItem
      v-for="item in items"
      :key="item.prop"
      :label="getLabel(item)"
      :prop="item.prop"
      :required="item.required ?? true"
      :item="item"
    >
      <el-input
        v-if="!item.type || item.type === FormItemType.INPUT"
        v-model="formData[item.prop]"
      />
      <el-select
        v-else-if="item.type === FormItemType.SELECT && item.selectConfig"
        v-model="formData[item.prop]"
        @visible-change="item.selectConfig?.visibleChange"
      >
        <el-option
          v-for="option in item.selectConfig?.options"
          :key="option[item.selectConfig.value]"
          :label="option[item.selectConfig.label]"
          :value="option[item.selectConfig.value]!"
        />
      </el-select>
      <el-cascader
        v-else-if="item.type === FormItemType.CASCADER && item.cascaderConfig"
        v-model="formData[item.prop]"
        :class="item.classList"
        :options="item.cascaderConfig.options"
        :props="item.cascaderConfig.props"
        @visible-change="item.cascaderConfig.visibleChange"
      />
    </ViFormItem>
    <slot />
  </el-form>
</template>

<script setup lang="ts">
import { useTemplateRef, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { FormItemType, type FormItemConfig } from "./types";
import ViFormItem from "./ViFormItem.vue";
import { ElForm, ElInput, ElCascader, ElOption, ElSelect } from "element-plus";

const props = withDefaults(
  defineProps<{
    model: any;
    items?: FormItemConfig[];
    i18n?: boolean;
  }>(),
  {
    i18n: true
  }
);

const form = useTemplateRef<FormInstance>("form");
const formData = computed(() => props.model);

const rules = computed<FormRules<any>>(() => {
  const arr = props.items?.reduce((acc: any, item) => {
    if ((item.required || item.required) ?? true) {
      acc[item.prop] = [
        {
          required: true,
          message: item.label ?? item.prop + "不能为空",
          trigger: "blur"
        }
      ];
    }
    return acc;
  }, {});
  console.log("arr", arr);
  console.log("props.items", props.items);
  return arr;
});

const validate = () => {
  return form.value?.validate();
};

const getLabel = (item: FormItemConfig) => {
  return item.label ?? item.prop;
};

defineExpose({
  validate,
  resetFields: () => form.value?.resetFields()
});
</script>
