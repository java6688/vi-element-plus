#!/bin/bash

echo "🚀 开始发布所有组件..."

# 发布所有组件包
echo "📦 发布 vi-element-plus 主包..."
pnpm -C packages/ui publish

echo "📦 发布 @vi-element-plus/form 包..."
pnpm -C packages/ui/form publish

echo "📦 发布 @vi-element-plus/table 包..."
pnpm -C packages/ui/table publish

echo "✅ 所有组件发布完成！"