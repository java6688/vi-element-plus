#!/bin/bash

echo "🚀 开始构建所有组件..."

# 构建所有组件包
echo "📦 构建 vi-element-plus 主包..."
pnpm -C packages/ui build

echo "📦 构建 @vi-element-plus/form 包..."
pnpm -C packages/ui/form build

echo "📦 构建 @vi-element-plus/table 包..."
pnpm -C packages/ui/table build

echo "✅ 所有组件构建完成！"