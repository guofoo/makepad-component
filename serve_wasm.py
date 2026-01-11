#!/usr/bin/env python3
"""
Simple HTTP server with CORS headers required for Makepad WebAssembly.
Usage: python3 serve_wasm.py [port]
"""

import http.server
import socketserver
import sys
import os

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
WASM_DIR = "./target/makepad-wasm-app/release/component-zoo"

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WASM_DIR, **kwargs)

    def end_headers(self):
        # Required headers for SharedArrayBuffer (needed by Makepad wasm)
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        super().end_headers()

    def guess_type(self, path):
        """Set correct MIME types"""
        if path.endswith('.wasm'):
            return 'application/wasm'
        elif path.endswith('.js'):
            return 'text/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.ttf'):
            return 'application/font-sfnt'
        elif path.endswith('.svg'):
            return 'image/svg+xml'
        return super().guess_type(path)

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
        print(f"Serving component-zoo at http://localhost:{PORT}")
        print(f"Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped")
