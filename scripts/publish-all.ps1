Write-Host "🚀 开始发布所有组件..." -ForegroundColor Green

Write-Host "📦 发布 vi-element-plus 主包..." -ForegroundColor Yellow
pnpm -C packages/ui publish

Write-Host "📦 发布 @vi-element-plus/form 包..." -ForegroundColor Yellow
pnpm -C packages/ui/form publish

Write-Host "📦 发布 @vi-element-plus/table 包..." -ForegroundColor Yellow
pnpm -C packages/ui/table publish

Write-Host "✅ 所有组件发布完成！" -ForegroundColor Green