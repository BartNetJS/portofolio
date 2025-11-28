#!/bin/bash
# Start local HTTP server for portfolio testing

echo "Starting Portfolio HTTP Server..."
echo ""
echo "Opening http://localhost:8000 in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8000
