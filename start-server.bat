@echo off
REM Start local HTTP server for Codeware website and portfolio testing
REM This batch file runs Python's built-in HTTP server hosting both www and portfolio

echo Starting Codeware HTTP Server...
echo.
echo ========================================
echo         Codeware Local Development
echo ========================================
echo.
echo Main Website (www):
echo   http://localhost:8000/www/
echo.
echo Portfolio:
echo   http://localhost:8000/
echo.
echo Prospects:
echo   http://localhost:8000/prospects/
echo.
echo Presentations:
echo   http://localhost:8000/presentations/
echo.
echo Projects:
echo   http://localhost:8000/projects/
echo.
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 8000 --directory "%CD%"
