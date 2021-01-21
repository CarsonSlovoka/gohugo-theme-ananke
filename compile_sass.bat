@echo off
REM 因為目前Hugo還是用libSass所以有些語法不支持，暫時先拿產出後的css文件
Set root_dir=%~dp0
Set target_dir=%root_dir%assets\sass
Set output_dir=%root_dir%static\dist\sass
cd %target_dir%
REM echo %cd%
sass main.sass:%output_dir%\main_sass.css --no-source-map
start %output_dir%
echo all done & pause > nul
