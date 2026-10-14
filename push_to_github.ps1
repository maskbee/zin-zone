[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "Zin Zone 一键部署到 GitHub 与 Cloudflare"

Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "   🚀 正在同步 Zin Zone 全量代码至 GitHub 与 Cloudflare (zin.zone) 🚀" -ForegroundColor Yellow
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "d:\Anti-workspace\hanyu-xiexiu"

Write-Host "[1/4] 检查代码与音频改动..." -ForegroundColor Green
git add .
$status = git status --porcelain
if ($status) {
    $commitMsg = "Auto update: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    git commit -m $commitMsg
    Write-Host "已自动记录变动并生成提交: $commitMsg" -ForegroundColor Gray
} else {
    Write-Host "所有文件均为最新状态，无需生成新提交。" -ForegroundColor Gray
}

Write-Host ""
Write-Host "[2/4] 正在推送到 GitHub 远程仓库 (origin/main)..." -ForegroundColor Green
git push origin main

Write-Host ""
Write-Host "[3/4] 正在发布部署到 Cloudflare 生产环境 (zin.zone)..." -ForegroundColor Green
npx wrangler pages deploy . --project-name=hanyu-xiexiu --commit-dirty=true

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=====================================================================" -ForegroundColor Green
    Write-Host "   🎉 [成功] 项目已全部同步至 GitHub 与 Cloudflare 生产环境！" -ForegroundColor Green
    Write-Host "   🔗 GitHub 仓库: https://github.com/maskbee/zin-zone" -ForegroundColor Cyan
    Write-Host "   🌐 生产正式站: https://zin.zone" -ForegroundColor Cyan
    Write-Host "   📄 Pages 预览: https://maskbee.github.io/zin-zone/" -ForegroundColor Cyan
    Write-Host "=====================================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "=====================================================================" -ForegroundColor Red
    Write-Host "   ❌ [提示] 部署遇到问题，请检查网络连接。" -ForegroundColor Red
    Write-Host "=====================================================================" -ForegroundColor Red
}

Write-Host ""
try {
    Write-Host "按任意键退出..." -ForegroundColor Yellow
    $null = [System.Console]::ReadKey($true)
} catch {
    Read-Host "按回车键退出"
}