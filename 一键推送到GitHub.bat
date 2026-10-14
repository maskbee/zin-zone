@echo off
chcp 65001 >nul
title Zin Zone 一键同步并推送到 GitHub
cd /d "d:\Anti-workspace\hanyu-xiexiu"
echo =====================================================================
echo    🚀 正在将 Zin Zone 项目全量代码与高清音频推送到 GitHub 🚀
echo =====================================================================
echo.
echo [1/3] 检查并暂存变动文件...
git add .
git commit -m "Auto sync update: %date% %time%" >nul 2>&1
echo [2/3] 正在推送到远程 GitHub 仓库...
git push origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [3/3 成功] 项目已全部同步至 GitHub: https://github.com/maskbee/zin-zone !
    echo 网页预览地址: https://maskbee.github.io/zin-zone/
) else (
    echo [提示] 推送遇到问题，请检查网络或 GitHub 授权状态。
)
echo.
pause
