# vi-element-plus

基于 Element Plus 封装的 Vue3 组件库，提供更便捷的表单和表格组件使用方式。

[![npm version](https://img.shields.io/npm/v/vi-element-plus.svg)](https://www.npmjs.com/package/vi-element-plus)
[![Vue3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.x-blue.svg)](https://element-plus.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 🎯 **简化使用**: 基于 Element Plus 封装，提供更简洁的 API
- 🔧 **动态导入**: 支持全局引入和按需引入两种使用方式
- 📦 **类型安全**: 完整的 TypeScript 类型支持
- 🌍 **国际化**: 内置多语言支持
- ⚡ **高性能**: 使用 Vue3 Composition API 和异步组件
- 🎨 **样式兼容**: 完美兼容 Element Plus 主题

## 📦 安装

```bash
# 使用 npm
npm install vi-element-plus element-plus

# 使用 yarn
yarn add vi-element-plus element-plus

# 使用 pnpm
pnpm add vi-element-plus element-plus
```

## 🚀 快速开始

### 方式一：全局引入 Element Plus

```typescript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

### 方式二：按需引入 Element Plus

```typescript
// main.ts - 不需要注册 Element Plus
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

## 📋 组件列表

### 表单组件

- [ViForm](#viform-表单容器) - 高级表单容器组件
- [ViFormItem](#viformitem-表单项) - 智能表单项组件

### 表格组件

- [ViTable](#vitable-表格容器) - 高性能表格容器
- [ViTableColumn](#vitablecolumn-表格列) - 灵活的表格列配置
- [ViAction](#yaction-操作按钮) - 智能操作按钮组

## 📖 组件文档

### ViForm 表单容器

高级表单容器组件，支持多种表单元素类型和智能验证。

#### 基础用法

```vue
<template>
  <ViForm v-model="formData" :items="formItems" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViForm } from 'vi-element-plus'

const formData = ref({
  name: '',
  gender: '',
  region: []
})

const formItems = [
  {
    prop: 'name',
    type: 'input',
    label: '姓名',
    placeholder: '请输入姓名'
  },
  {
    prop: 'gender',
    type: 'select',
    label: '性别',
    selectConfig: {
      label: 'label',
      value: 'value',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ]
    }
  },
  {
    prop: 'region',
    type: 'cascader',
    label: '地区',
    cascaderConfig: {
      options: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            { value: 'chaoyang', label: '朝阳区' },
            { value: 'haidian', label: '海淀区' }
          ]
        }
      ]
    }
  }
]
</script>
```

#### API

**Props**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 表单数据对象 | `any` | - |
| items | 表单项配置数组 | `FormItemConfig[]` | - |
| i18n | 是否启用国际化 | `boolean` | `true` |

**暴露方法**

| 方法名 | 说明 | 返回值 |
|--------|------|--------|
| validate | 验证表单 | `Promise<boolean>` |
| resetFields | 重置表单 | `void` |

### ViFormItem 表单项

智能表单项组件，自动处理标签和验证。

#### 基础用法

```vue
<template>
  <ViFormItem :item="formItem">
    <el-input v-model="formData.name" />
  </ViFormItem>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViFormItem } from 'vi-element-plus'

const formData = ref({ name: '' })
const formItem = {
  prop: 'name',
  label: '姓名',
  required: true
}
</script>
```

#### API

**Props**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| item | 表单项配置 | `FormItemConfig` | - |

### ViTable 表格容器

高性能表格容器，支持复杂列配置。

#### 基础用法

```vue
<template>
  <ViTable
    v-model="tableData"
    :columns="columns"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViTable } from 'vi-element-plus'

const loading = ref(false)
const tableData = ref([
  { id: 1, name: '张三', status: 'active' },
  { id: 2, name: '李四', status: 'inactive' }
])

const columns = [
  {
    prop: 'id',
    label: 'ID',
    type: 'index'
  },
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'status',
    label: '状态',
    type: 'tag',
    tagConfig: {
      formatType: (value: string) => {
        return value === 'active' ? 'success' : 'danger'
      }
    }
  }
]
</script>
```

#### API

**Props**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 表格数据数组 | `any[]` | - |
| columns | 列配置数组 | `TableColumnConfig[]` | - |
| loading | 是否加载中 | `boolean` | `false` |
| align | 列对齐方式 | `'left' \| 'center' \| 'right'` | `'center'` |

### ViTableColumn 表格列

灵活的表格列配置，支持多种列类型和自定义渲染。

#### 多种列类型

```vue
<template>
  <ViTable :data="tableData" :columns="columns">
    <template #first>
      <el-table-column type="expand">
        <template #default="{ row }">
          <p>详细信息：{{ row.description }}</p>
        </template>
      </el-table-column>
    </template>
  </ViTable>
</template>

<script setup lang="ts">
const columns = [
  // 索引列
  {
    prop: 'id',
    label: '序号',
    type: 'index'
  },

  // 开关列
  {
    prop: 'status',
    label: '状态',
    type: 'switch',
    switchConfig: {
      activeText: '启用',
      inactiveText: '禁用',
      onChange: (row: any, value: boolean) => {
        console.log('状态变更:', row, value)
      }
    }
  },

  // 标签列
  {
    prop: 'category',
    label: '分类',
    type: 'tag',
    tagConfig: {
      formatType: (value: string) => {
        const typeMap: Record<string, string> = {
          'hot': 'danger',
          'new': 'primary',
          'sale': 'warning'
        }
        return typeMap[value] || 'info'
      }
    }
  },

  // 自定义渲染列
  {
    prop: 'name',
    label: '用户名',
    render: ({ row }: any) => {
      return h('span', { style: 'color: #409eff' }, row.name)
    }
  },

  // 操作列
  {
    prop: 'actions',
    label: '操作',
    buttons: [
      {
        text: '编辑',
        type: 'primary',
        size: 'small',
        click: (row: any) => {
          console.log('编辑:', row)
        }
      },
      {
        text: '删除',
        type: 'danger',
        size: 'small',
        popconfirm: {
          title: '确认删除该记录？',
          onConfirm: (row: any) => {
            console.log('删除:', row)
          }
        }
      }
    ]
  }
]
</script>
```

#### API

**Props**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 列配置 | `TableColumnConfig` | - |

### ViAction 操作按钮

智能操作按钮组件，支持权限控制和确认对话框。

#### 基础用法

```vue
<template>
  <ViAction
    v-for="action in actions"
    :key="action.text"
    :config="action"
    :row="currentRow"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViAction } from 'vi-element-plus'

const currentRow = ref({ id: 1, name: '张三' })

const actions = [
  {
    text: '查看',
    type: 'primary',
    auth: ['user:view'],
    click: (row: any) => {
      console.log('查看:', row)
    }
  },
  {
    text: '编辑',
    type: 'warning',
    auth: ['user:edit'],
    click: (row: any) => {
      console.log('编辑:', row)
    }
  },
  {
    text: '删除',
    type: 'danger',
    auth: ['user:delete'],
    popconfirm: {
      title: '确认删除该用户？',
      onConfirm: (row: any) => {
        console.log('删除:', row)
      }
    }
  }
]
</script>
```

#### API

**Props**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| config | 按钮配置 | `ActionConfig` | - |
| row | 当前行数据 | `any` | - |

## 🔧 配置类型

### FormItemConfig

```typescript
interface FormItemConfig {
  prop: string;                    // 字段名
  type?: FormItemType;             // 表单类型：input、select、cascader
  label?: string;                  // 标签文本
  required?: boolean;              // 是否必填
  placeholder?: string;            // 占位符
  hidden?: (row: any) => boolean;  // 隐藏条件
  classList?: string[];            // 自定义样式类
  selectConfig?: {                 // 选择器配置
    label: string;                 // 选项标签字段
    value: string;                 // 选项值字段
    options: Option[];             // 选项数据
    visibleChange?: (visible: boolean) => void; // 可见性变化回调
  };
  cascaderConfig?: {               // 级联选择器配置
    options: Option[];             // 选项数据
    props?: CascaderProps;         // Element Plus 级联选择器属性
    change?: (value: any) => void; // 值变化回调
    visibleChange?: (visible: boolean) => void; // 可见性变化回调
  };
}
```

### TableColumnConfig

```typescript
interface TableColumnConfig {
  prop?: string;                   // 字段名
  label?: string;                  // 列标题
  type?: 'index' | 'switch' | 'expand' | 'tag'; // 列类型
  formatValue?: (value: any) => any; // 值格式化函数
  render?: (row: any) => any;      // 自定义渲染函数
  align?: 'left' | 'center' | 'right'; // 对齐方式
  width?: string | number;         // 列宽
  buttons?: ActionConfig[];        // 操作按钮配置
  switchConfig?: {                 // 开关配置
    inlinePrompt?: boolean;        // 内联提示
    activeText?: string;           // 激活文本
    inactiveText?: string;         // 未激活文本
    onChange?: (row: any, value: any) => void; // 值变化回调
  };
  tagConfig?: {                    // 标签配置
    type?: string;                 // 标签类型
    formatType?: (value: any) => any; // 类型格式化函数
  };
}
```

### ActionConfig

```typescript
interface ActionConfig {
  auth?: string;                   // 权限标识
  text: string;                    // 按钮文本
  type?: string;                   // 按钮类型
  size?: string;                   // 按钮大小
  icon?: string;                   // 图标
  disabled?: boolean;              // 是否禁用
  hidden?: (row: any) => boolean;  // 隐藏条件
  popconfirm?: {                   // 确认对话框配置
    title?: string;                // 确认标题
    onConfirm?: (row: any) => void; // 确认回调
  };
  click?: (row: any) => void;      // 点击回调
}
```

## 🌍 国际化

组件库支持多语言切换：

```typescript
// 设置语言
import { viElementPlusLocale } from 'vi-element-plus'
import { ElLocale } from 'element-plus'

// 中文
app.use(ElementPlus, {
  locale: ElLocale.zhCn
})

// 英文
app.use(ElementPlus, {
  locale: ElLocale.en
})
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发环境设置

```bash
# 克隆项目
git clone https://github.com/java6688/vi-element-plus.git

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 构建
pnpm build
```

## 📄 许可证

MIT License

## 🙏 致谢

感谢以下优秀的开源项目：

- [Vue.js](https://vuejs.org/) - Progressive JavaScript Framework
- [Element Plus](https://element-plus.org/) - Vue 3 UI Library
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

## 📞 联系我们

- 作者：微澜
- 项目地址：[https://github.com/java6688/vi-element-plus](https://github.com/java6688/vi-element-plus)
- 问题反馈：[https://github.com/java6688/vi-element-plus/issues](https://github.com/java6688/vi-element-plus/issues)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！