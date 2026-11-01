@echo off
setlocal
echo Pulling the three v182 local models. This can take a long time on first run.
echo.
ollama pull granite4.2:8b-q5_K_M || goto :fail
ollama pull gemma4:12b || goto :fail
ollama pull ministral-3:8b-instruct-2512-q4_K_M || goto :fail
echo.
echo All three models are ready.
ollama list
pause
exit /b 0
:fail
echo.
echo A model download failed. Check Ollama and network connectivity.
pause
exit /b 1
