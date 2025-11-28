@echo off
REM Start local HTTP server for Codeware website testing
REM This batch file runs Python's built-in HTTP server

echo Starting Codeware HTTP Server...
echo.
echo ========================================
echo         Codeware Local Development
echo ========================================
echo.
echo Main Website:
echo   http://localhost:8000/
echo.
echo Portofolio Hub:
echo   http://localhost:8000/portfolio/
echo.
echo Portfolio Sections:
echo   - Projects:       http://localhost:8000/portfolio/projects/
echo   - Presentations:  http://localhost:8000/portfolio/presentations/
echo   - Prospects:      http://localhost:8000/portfolio/prospects/
echo.
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 8000 --directory "%CD%"
