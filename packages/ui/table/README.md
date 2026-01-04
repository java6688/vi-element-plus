# @vi-element-plus/table

基于 Element Plus 的高级表格组件库，提供强大的表格功能和灵活的配置选项。

## ✨ 特性

- 🎯 **多种列类型**: 支持 index、switch、tag、expand 等多种列类型
- 🔧 **智能操作**: 内置操作按钮组件，支持权限控制和确认对话框
- 📝 **自定义渲染**: 支持自定义 render 函数和格式化显示
- 📊 **状态管理**: 支持开关状态、标签类型等状态显示
- ⚡ **高性能**: 使用 Vue3 Composition API 和异步组件
- 🎨 **主题兼容**: 完美兼容 Element Plus 主题

## 📦 安装

```bash
# 安装主要依赖
npm install @vi-element-plus/table element-plus

# 或者使用 yarn
yarn add @vi-element-plus/table element-plus
```

## 🚀 快速开始

### ViTable 基础表格

```vue
<template>
  <ViTable
    :data="tableData"
    :columns="columns"
    :loading="loading"
    :align="'center'"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViTable } from '@vi-element-plus/table'

const loading = ref(false)
const tableData = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    status: 'active',
    role: 'admin'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    status: 'inactive',
    role: 'user'
  }
])

const columns = [
  {
    prop: 'id',
    label: 'ID',
    type: 'index'
  },
  {
    prop: 'name',
    label: '姓名',
    align: 'left'
  },
  {
    prop: 'email',
    label: '邮箱'
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

### ViTableColumn 多样化列类型

```vue
<template>
  <ViTable :data="tableData" :columns="columns">
    <!-- 展开行内容 -->
    <template #first>
      <el-table-column type="expand">
        <template #default="{ row }">
          <div class="expand-content">
            <h4>用户详情</h4>
            <p><strong>创建时间：</strong>{{ row.createTime }}</p>
            <p><strong>最后登录：</strong>{{ row.lastLogin }}</p>
            <p><strong>备注：</strong>{{ row.remark || '无' }}</p>
          </div>
        </template>
      </el-table-column>
    </template>
    
    <!-- 表格末尾插槽 -->
    <template #last>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </template>
  </ViTable>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { ViTable } from '@vi-element-plus/table'

const tableData = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    status: 'active',
    role: 'admin',
    createTime: '2024-01-01',
    lastLogin: '2024-01-15',
    remark: '管理员用户'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    status: 'inactive',
    role: 'user',
    createTime: '2024-01-02',
    lastLogin: '2024-01-10',
    remark: ''
  }
])

const columns = [
  // 索引列
  {
    prop: 'id',
    label: '序号',
    type: 'index'
  },
  
  // 开关列 - 用于状态切换
  {
    prop: 'status',
    label: '启用状态',
    type: 'switch',
    switchConfig: {
      activeText: '启用',
      inactiveText: '禁用',
      inlinePrompt: true,
      onChange: (row: any, value: boolean) => {
        console.log(`用户 ${row.name} 状态变更为:`, value)
        // 这里可以调用API更新状态
      }
    }
  },
  
  // 标签列 - 用于分类显示
  {
    prop: 'role',
    label: '角色',
    type: 'tag',
    tagConfig: {
      formatType: (value: string) => {
        const typeMap = {
          'admin': 'danger',
          'manager': 'warning',
          'user': 'info'
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
      return h('span', {
        style: {
          color: '#409eff',
          fontWeight: 'bold'
        }
      }, row.name)
    }
  },
  
  // 格式化显示列
  {
    prop: 'email',
    label: '邮箱地址',
    formatValue: (value: string) => {
      return value.replace('@', '@\n')
    }
  }
]
</script>

<style scoped>
.expand-content {
  padding: 20px;
  background-color: #f5f7fa;
}

.expand-content h4 {
  margin: 0 0 10px 0;
  color: #303133;
}

.expand-content p {
  margin: 5px 0;
  color: #606266;
}
</style>
```

### ViAction 操作按钮组件

```vue
<template>
  <div>
    <ViTable :data="tableData" :columns="columns">
      <template #default="{ row }">
        <div class="action-buttons">
          <ViAction
            v-for="action in getRowActions(row)"
            :key="action.text"
            :config="action"
            :row="row"
          />
        </div>
      </template>
    </ViTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViTable, ViAction } from '@vi-element-plus/table'

const tableData = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    status: 'active'
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: 'user',
    status: 'inactive'
  }
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
    prop: 'role',
    label: '角色',
    type: 'tag'
  }
]

// 根据行数据动态生成操作按钮
const getRowActions = (row: any) => {
  const actions = []
  
  // 查看按钮 - 所有用户可见
  actions.push({
    text: '查看',
    type: 'primary',
    size: 'small',
    click: (row: any) => {
      console.log('查看用户:', row)
      // 打开查看对话框
    }
  })
  
  // 编辑按钮 - 管理员和当前用户可见
  if (row.role === 'admin' || row.id === 1) {
    actions.push({
      text: '编辑',
      type: 'warning',
      size: 'small',
      click: (row: any) => {
        console.log('编辑用户:', row)
        // 打开编辑对话框
      }
    })
  }
  
  // 删除按钮 - 仅管理员可见，且不能删除自己
  if (row.role === 'admin' && row.id !== 1) {
    actions.push({
      text: '删除',
      type: 'danger',
      size: 'small',
      popconfirm: {
        title: '确认删除该用户？此操作不可恢复！',
        onConfirm: async (row: any) => {
          console.log('删除用户:', row)
          // 调用删除API
          await deleteUser(row.id)
          // 刷新表格数据
        }
      }
    })
  }
  
  // 启用/禁用按钮 - 管理员可见
  if (row.role === 'admin') {
    const isActive = row.status === 'active'
    actions.push({
      text: isActive ? '禁用' : '启用',
      type: isActive ? 'warning' : 'success',
      size: 'small',
      click: async (row: any) => {
        console.log(`${isActive ? '禁用' : '启用'}用户:`, row)
        // 调用状态更新API
        await updateUserStatus(row.id, isActive ? 'inactive' : 'active')
      }
    })
  }
  
  return actions
}

// 模拟API调用
const deleteUser = async (userId: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`用户 ${userId} 已删除`)
      resolve(true)
    }, 1000)
  })
}

const updateUserStatus = async (userId: number, status: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`用户 ${userId} 状态已更新为: ${status}`)
      resolve(true)
    }, 500)
  })
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
```

## 📖 组件 API

### ViTable Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 表格数据数组 | `any[]` | - |
| columns | 列配置数组 | `TableColumnConfig[]` | `[]` |
| loading | 是否显示加载状态 | `boolean` | `false` |
| align | 列对齐方式 | `'left' \| 'center' \| 'right'` | `'center'` |

### ViTable Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| updateKeyChildren | 更新子节点数据 | `(key: string, data: T[])` | `void` |

### ViTableColumn Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 列配置对象 | `TableColumnConfig` | - |

### ViAction Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| config | 按钮配置对象 | `ActionConfig` | - |
| row | 当前行数据 | `any` | - |

## 🔧 配置类型

### TableColumnConfig

```typescript
interface TableColumnConfig {
  // 基础配置
  prop?: string;                      // 字段名
  label?: string;                     // 列标题
  type?: 'index' | 'switch' | 'expand' | 'tag'; // 列类型
  align?: 'left' | 'center' | 'right'; // 对齐方式
  width?: string | number;            // 列宽
  
  // 显示格式化
  formatValue?: (value: any) => any;  // 值格式化函数
  render?: (row: any) => any;         // 自定义渲染函数
  
  // 操作按钮配置
  buttons?: ActionConfig[];           // 操作按钮数组
  
  // 开关配置（type为switch时使用）
  switchConfig?: {
    inlinePrompt?: boolean;           // 内联提示
    activeText?: string;              // 激活状态文本
    inactiveText?: string;            // 未激活状态文本
    onChange?: (row: any, value: any) => void; // 状态变化回调
  };
  
  // 标签配置（type为tag时使用）
  tagConfig?: {
    type?: string;                    // 标签类型
    formatType?: (value: any) => any; // 类型格式化函数
  };
}
```

### ActionConfig

```typescript
interface ActionConfig {
  // 基础配置
  text: string;                       // 按钮文本
  type?: "default" | "primary" | "success" | "warning" | "danger" | "info" | ""; // 按钮类型
  size?: "large" | "default" | "small"; // 按钮大小
  icon?: string;                      // 图标类名
  disabled?: boolean;                 // 是否禁用
  
  // 权限控制
  auth?: string[];                    // 权限标识数组
  
  // 显示控制
  hidden?: (row: any) => boolean;     // 隐藏条件函数
  
  // 确认对话框配置
  popconfirm?: {
    title?: string;                   // 确认对话框标题
    onConfirm?: (row: any) => void;   // 确认回调函数
  };
  
  // 点击事件
  click?: (row: any) => void;         // 点击回调函数
}
```

## 📚 高级示例

### 权限控制表格

```vue
<template>
  <ViTable :data="tableData" :columns="columns">
    <!-- 自定义操作列 -->
    <template #default="{ row }">
      <ViAction
        v-for="action in getAuthorizedActions(row)"
        :key="action.text"
        :config="action"
        :row="row"
      />
    </template>
  </ViTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViTable, ViAction } from '@vi-element-plus/table'

// 模拟当前用户权限
const currentUser = {
  id: 1,
  permissions: ['user:view', 'user:edit', 'user:delete']
}

// 检查权限
const hasPermission = (permission: string) => {
  return currentUser.permissions.includes(permission)
}

const tableData = ref([
  { id: 1, name: '张三', role: 'admin' },
  { id: 2, name: '李四', role: 'user' }
])

const columns = [
  { prop: 'id', label: 'ID', type: 'index' },
  { prop: 'name', label: '姓名' },
  { prop: 'role', label: '角色', type: 'tag' }
]

// 根据权限动态生成操作按钮
const getAuthorizedActions = (row: any) => {
  const actions = []
  
  // 查看权限
  if (hasPermission('user:view')) {
    actions.push({
      text: '查看',
      type: 'primary',
      auth: ['user:view'],
      click: (row: any) => viewUser(row)
    })
  }
  
  // 编辑权限
  if (hasPermission('user:edit')) {
    actions.push({
      text: '编辑',
      type: 'warning',
      auth: ['user:edit'],
      click: (row: any) => editUser(row)
    })
  }
  
  // 删除权限
  if (hasPermission('user:delete') && row.id !== currentUser.id) {
    actions.push({
      text: '删除',
      type: 'danger',
      auth: ['user:delete'],
      popconfirm: {
        title: '确认删除该用户？',
        onConfirm: (row: any) => deleteUser(row)
      }
    })
  }
  
  return actions
}

const viewUser = (row: any) => console.log('查看用户:', row)
const editUser = (row: any) => console.log('编辑用户:', row)
const deleteUser = (row: any) => console.log('删除用户:', row)
</script>
```

### 可展开表格

```vue
<template>
  <ViTable :data="tableData" :columns="columns">
    <template #first>
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template #default="{ row }">
          <div class="expand-content">
            <h4>详细信息</h4>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="姓名">{{ row.name }}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{ row.email }}</el-descriptions-item>
              <el-descriptions-item label="电话">{{ row.phone }}</el-descriptions-item>
              <el-descriptions-item label="地址">{{ row.address }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </template>
      </el-table-column>
    </template>
  </ViTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViTable } from '@vi-element-plus/table'

const tableData = ref([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    address: '北京市朝阳区某某街道'
  }
])

const columns = [
  { prop: 'id', label: 'ID', type: 'index' },
  { prop: 'name', label: '姓名' }
]
</script>
```

### 状态开关表格

```vue
<template>
  <ViTable :data="tableData" :columns="columns" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ViTable } from '@vi-element-plus/table'

const tableData = ref([
  { id: 1, name: '功能A', status: true, description: '启用功能A' },
  { id: 2, name: '功能B', status: false, description: '禁用功能B' },
  { id: 3, name: '功能C', status: true, description: '启用功能C' }
])

const columns = [
  { prop: 'id', label: 'ID', type: 'index' },
  { prop: 'name', label: '功能名称' },
  { prop: 'description', label: '描述' },
  {
    prop: 'status',
    label: '启用状态',
    type: 'switch',
    switchConfig: {
      activeText: '启用',
      inactiveText: '禁用',
      inlinePrompt: true,
      onChange: async (row: any, value: boolean) => {
        // 调用API更新状态
        await updateFeatureStatus(row.id, value)
      }
    }
  }
]

const updateFeatureStatus = async (id: number, status: boolean) => {
  console.log(`更新功能 ${id} 状态为:`, status)
  // 这里实现API调用
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