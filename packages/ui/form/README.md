# @vi-element-plus/form

基于 Element Plus 的高级表单组件库，提供简洁的 API 和强大的功能。

## ✨ 特性

- 🎯 **智能验证**: 自动根据配置生成验证规则
- 🔧 **多种输入类型**: 支持 input、select、cascader 等常用类型
- 📝 **类型安全**: 完整的 TypeScript 类型支持
- 🌍 **国际化**: 支持多语言标签和错误信息
- 🎨 **样式灵活**: 完美兼容 Element Plus 主题
- ⚡ **高性能**: 使用 Vue3 Composition API

## 📦 安装

```bash
# 安装主要依赖
npm install @vi-element-plus/form element-plus

# 或者使用 yarn
yarn add @vi-element-plus/form element-plus
```

## 🚀 快速开始

### ViForm 表单容器

```vue
<template>
  <ViForm
    v-model="formData"
    :items="formItems"
    :i18n="true"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViForm } from '@vi-element-plus/form'

const formData = ref({
  name: '',
  email: '',
  gender: '',
  region: [],
  hobby: []
})

const formItems = [
  {
    prop: 'name',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名',
    required: true
  },
  {
    prop: 'email',
    type: 'input',
    label: '邮箱',
    placeholder: '请输入邮箱地址'
  },
  {
    prop: 'gender',
    type: 'select',
    label: '性别',
    required: true,
    selectConfig: {
      label: 'label',
      value: 'value',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '其他', value: 'other' }
      ]
    }
  },
  {
    prop: 'region',
    type: 'cascader',
    label: '所在地区',
    cascaderConfig: {
      options: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            { value: 'chaoyang', label: '朝阳区' },
            { value: 'haidian', label: '海淀区' }
          ]
        },
        {
          value: 'shanghai',
          label: '上海',
          children: [
            { value: 'huangpu', label: '黄浦区' },
            { value: 'pudong', label: '浦东新区' }
          ]
        }
      ]
    }
  }
]

const handleSubmit = () => {
  console.log('表单数据:', formData.value)
}
</script>
```

### ViFormItem 表单项

```vue
<template>
  <ViForm :model="formData" :items="formItems">
    <!-- 自定义表单项内容 -->
    <ViFormItem :item="customItem">
      <el-input
        v-model="formData.custom"
        placeholder="自定义输入"
      />
    </ViFormItem>
    
    <div class="form-actions">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>
  </ViForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViForm, ViFormItem } from '@vi-element-plus/form'

const formData = ref({
  name: '',
  custom: ''
})

const formItems = [
  {
    prop: 'name',
    label: '姓名',
    required: true
  }
]

const customItem = {
  prop: 'custom',
  label: '自定义字段'
}

const handleSubmit = () => {
  console.log('提交:', formData.value)
}

const handleReset = () => {
  formData.value = {
    name: '',
    custom: ''
  }
}
</script>
```

## 📖 组件 API

### ViForm Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | 表单数据对象（v-model） | `any` | - |
| items | 表单项配置数组 | `FormItemConfig[]` | `[]` |
| i18n | 是否启用国际化 | `boolean` | `true` |

### ViForm Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| validate | 验证表单 | - | `Promise<boolean>` |
| resetFields | 重置表单 | - | `void` |

### ViFormItem Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| item | 表单项配置 | `FormItemConfig` | - |

## 🔧 配置类型

### FormItemConfig

```typescript
interface FormItemConfig {
  // 基础配置
  prop: string;                    // 必填，字段名
  type?: FormItemType;             // 表单类型
  label?: string;                  // 标签文本
  required?: boolean;              // 是否必填，默认 true
  placeholder?: string;            // 占位符文本
  
  // 显示控制
  hidden?: (row: any) => boolean;  // 隐藏条件函数
  classList?: string[];            // 自定义样式类
  
  // 选择器配置
  selectConfig?: {
    label: string;                 // 选项标签字段名
    value: string;                 // 选项值字段名
    options: Option[];             // 选项数据
    visibleChange?: (visible: boolean) => void; // 可见性变化回调
  };
  
  // 级联选择器配置
  cascaderConfig?: {
    options: Option[];             // 选项数据
    props?: CascaderProps;         // Element Plus 级联选择器属性
    change?: (value: any) => void; // 值变化回调
    visibleChange?: (visible: boolean) => void; // 可见性变化回调
  };
}
```

### FormItemType 枚举

```typescript
enum FormItemType {
  INPUT = "input",        // 文本输入
  SELECT = "select",      // 下拉选择
  CASCADER = "cascader"   // 级联选择
}
```

## 📚 使用示例

### 完整表单示例

```vue
<template>
  <div class="form-container">
    <ViForm
      ref="formRef"
      v-model="formData"
      :items="formItems"
      :i18n="true"
    >
      <!-- 自定义底部操作区域 -->
      <div class="form-footer">
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </ViForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ViForm } from '@vi-element-plus/form'

const formRef = ref()

// 表单数据
const formData = reactive({
  userInfo: {
    name: '',
    email: '',
    phone: ''
  },
  preferences: {
    gender: '',
    region: [],
    interests: []
  }
})

// 表单配置
const formItems = [
  // 用户信息组
  {
    prop: 'userInfo.name',
    type: 'input',
    label: '姓名',
    placeholder: '请输入真实姓名',
    required: true
  },
  {
    prop: 'userInfo.email',
    type: 'input',
    label: '邮箱',
    placeholder: '请输入邮箱地址',
    required: true
  },
  {
    prop: 'userInfo.phone',
    type: 'input',
    label: '手机号',
    placeholder: '请输入手机号码'
  },
  
  // 偏好设置组
  {
    prop: 'preferences.gender',
    type: 'select',
    label: '性别',
    selectConfig: {
      label: 'label',
      value: 'value',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '不愿透露', value: 'secret' }
      ]
    }
  },
  {
    prop: 'preferences.region',
    type: 'cascader',
    label: '所在地区',
    cascaderConfig: {
      options: [
        {
          value: 'china',
          label: '中国',
          children: [
            {
              value: 'beijing',
              label: '北京',
              children: [
                { value: 'chaoyang', label: '朝阳区' },
                { value: 'haidian', label: '海淀区' },
                { value: 'dongcheng', label: '东城区' }
              ]
            },
            {
              value: 'shanghai',
              label: '上海',
              children: [
                { value: 'huangpu', label: '黄浦区' },
                { value: 'pudong', label: '浦东新区' },
                { value: 'xuhui', label: '徐汇区' }
              ]
            }
          ]
        }
      ]
    }
  }
]

// 表单验证和提交
const handleSubmit = async () => {
  try {
    const isValid = await formRef.value?.validate()
    if (isValid) {
      console.log('表单数据:', formData)
      // 处理表单提交逻辑
      await submitForm(formData)
    }
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
}

// 模拟提交API
const submitForm = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('提交数据:', data)
      resolve(true)
    }, 1000)
  })
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}
</style>
```

### 动态表单示例

```vue
<template>
  <div>
    <div class="toolbar">
      <el-button @click="addField">添加字段</el-button>
      <el-button @click="removeField">删除字段</el-button>
    </div>
    
    <ViForm
      v-model="dynamicFormData"
      :items="dynamicFormItems"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ViForm } from '@vi-element-plus/form'

const dynamicFormData = reactive({
  name: '',
  email: ''
})

const dynamicFormItems = ref([
  {
    prop: 'name',
    type: 'input',
    label: '姓名',
    required: true
  },
  {
    prop: 'email',
    type: 'input',
    label: '邮箱',
    required: true
  }
])

const addField = () => {
  const fieldCount = dynamicFormItems.value.length + 1
  dynamicFormItems.value.push({
    prop: `field${fieldCount}`,
    type: 'input',
    label: `字段${fieldCount}`,
    placeholder: `请输入字段${fieldCount}`
  })
  dynamicFormData[`field${fieldCount}`] = ''
}

const removeField = () => {
  if (dynamicFormItems.value.length > 1) {
    const lastItem = dynamicFormItems.value.pop()
    delete dynamicFormData[lastItem.prop]
  }
}
</script>
```

## 🔄 动态导入支持

组件支持 Element Plus 的动态导入，无需在 main.ts 中全局注册：

### 按需引入

```typescript
// main.ts - 不需要注册 Element Plus
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

### 全局引入

```typescript
// main.ts - 全局引入 Element Plus
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License