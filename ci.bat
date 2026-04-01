@echo off
TITLE Pipeline de Integración Continua Local - IS2
echo ================================================
echo Iniciando Pipeline Local de CI...
echo ================================================

:: Etapa 1: Pruebas Unitarias
echo [ETAPA 1] Ejecutando Pruebas Unitarias con Jest...
call npm test
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo X ERROR: Las pruebas unitarias han fallado. Deteniendo pipeline.
    exit /b %ERRORLEVEL%
)
echo OK: Pruebas superadas exitosamente.
echo ------------------------------------------------

:: Etapa 2: Análisis Estático
echo [ETAPA 2] Ejecutando Analisis Estatico con ESLint...
call npx eslint .
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo X ERROR: El analisis estatico detecto problemas de calidad. Deteniendo pipeline.
    exit /b %ERRORLEVEL%
)
echo OK: Analisis estatico aprobado sin errores criticos.
echo ------------------------------------------------

echo ================================================
echo PIPELINE EXITOSO: El codigo cumple con los estandares de calidad.
echo ================================================
pause