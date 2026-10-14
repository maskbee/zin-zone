[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "Zin Zone 一键部署到 GitHub"

Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "   🚀 正在将 Zin Zone 项目全量代码与高清音频推送到 GitHub 🚀" -ForegroundColor Yellow
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "d:\Anti-workspace\hanyu-xiexiu"

Write-Host "[1/3] 检查代码与音频改动..." -ForegroundColor Green
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
Write-Host "[2/3] 正在推送到 GitHub 远程仓库 (origin/main)..." -ForegroundColor Green
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=====================================================================" -ForegroundColor Green
    Write-Host "   🎉 [成功] 项目已全部同步至 GitHub！" -ForegroundColor Green
    Write-Host "   🔗 仓库地址: https://github.com/maskbee/zin-zone" -ForegroundColor Cyan
    Write-Host "   🌐 在线预览: https://maskbee.github.io/zin-zone/" -ForegroundColor Cyan
    Write-Host "=====================================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "=====================================================================" -ForegroundColor Red
    Write-Host "   ❌ [提示] 推送遇到问题，请检查网络连接或 GitHub 授权状态。" -ForegroundColor Red
    Write-Host "=====================================================================" -ForegroundColor Red
}

Write-Host ""
try {
    Write-Host "按任意键退出..." -ForegroundColor Yellow
    $null = [System.Console]::ReadKey($true)
} catch {
    Read-Host "按回车键退出"
}
