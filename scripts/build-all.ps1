Write-Host "🚀 开始构建所有组件..." -ForegroundColor Green

Write-Host "📦 构建 vi-element-plus 主包..." -ForegroundColor Yellow
pnpm -C packages/ui build

Write-Host "📦 构建 @vi-element-plus/form 包..." -ForegroundColor Yellow
pnpm -C packages/ui/form build

Write-Host "📦 构建 @vi-element-plus/table 包..." -ForegroundColor Yellow
pnpm -C packages/ui/table build

Write-Host "✅ 所有组件构建完成！" -ForegroundColor Green