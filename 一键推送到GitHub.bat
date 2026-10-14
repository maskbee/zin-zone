@echo off
chcp 65001 >nul
title Zin Zone 一键部署到 GitHub
cd /d "%~dp0"
echo =====================================================================
echo    🚀 正在将 Zin Zone 项目全量代码与高清音频推送到 GitHub 🚀
echo =====================================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [成功] 代码已成功推送到您的 GitHub: https://github.com/maskbee/zin-zone !
) else (
    echo [提示] 如果弹出登录验证，请在浏览器中点击 Authorize 确认授权。
)
echo.
pause
