@echo off
cd /d %~dp0
echo # carregador > README.md
git init
git add README.md
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/shinnystar07/carregador.git
git push -u origin main
pause