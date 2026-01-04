# 组件库发布指南

本文档介绍了 vi-element-plus 组件库的发布流程，支持统一发布和单独发布两种方式。

## 项目结构

```
vi-element-plus/
├── packages/
│   └── ui/                     # 主包
│       ├── form/               # 表单组件包
│       └── table/              # 表格组件包
├── scripts/                    # 构建和发布脚本
└── 根配置
```

## 包结构

- **vi-element-plus**: 主包，包含所有组件的统一入口
- **@vi-element-plus/form**: 表单组件独立包
- **@vi-element-plus/table**: 表格组件独立包

## 发布方式

### 1. 单独发布

#### 构建单个组件
```bash
# 构建主包
pnpm build:ui

# 构建表单组件
pnpm build:form

# 构建表格组件
pnpm build:table
```

#### 发布单个组件
```bash
# 发布主包
pnpm publish:ui

# 发布表单组件
pnpm publish:form

# 发布表格组件
pnpm publish:table
```

### 2. 统一发布

#### 构建所有组件
```bash
# 使用npm脚本
pnpm build:all

# 或使用脚本文件
# Windows
powershell -File scripts\build-all.ps1

# Linux/MacOS
chmod +x scripts/build-all.sh
./scripts/build-all.sh
```

#### 发布所有组件
```bash
# 使用npm脚本
pnpm publish:all

# 或使用脚本文件
# Windows
powershell -File scripts\publish-all.ps1

# Linux/MacOS
chmod +x scripts/publish-all.sh
./scripts/publish-all.sh
```

## 手动发布流程

### 1. 进入包目录
```bash
cd packages/ui
# 或
cd packages/ui/form
# 或
cd packages/ui/table
```

### 2. 构建包
```bash
pnpm build
```

### 3. 发布包
```bash
pnpm publish
```

## 注意事项

1. **版本管理**: 确保所有包的版本号正确更新
2. **依赖关系**: 发布前检查依赖关系是否正确
3. **构建产物**: 确保dist目录生成正确
4. **npm登录**: 确保已登录npm账号
5. **权限检查**: 确保有发布权限

## 脚本说明

- `build:all`: 构建所有组件包
- `publish:all`: 发布所有组件包
- `clean`: 清理所有构建产物

## 故障排除

### 构建失败
1. 检查TypeScript编译错误
2. 确认所有依赖已安装
3. 检查Vite配置是否正确

### 发布失败
1. 确认npm登录状态
2. 检查包名是否已存在
3. 确认版本号未被占用
4. 检查包配置是否正确