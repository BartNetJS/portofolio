@echo off
REM Start local HTTP server for portfolio testing
REM This batch file runs Python's built-in HTTP server

echo Starting Portfolio HTTP Server...
echo.
echo Opening http://localhost:8000 in your browser
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 8000 --directory "%CD%"
