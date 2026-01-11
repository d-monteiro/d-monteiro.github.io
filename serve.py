#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, HTTPServer

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    server = HTTPServer(('', 8000), NoCacheHandler)
    print('Server running at http://localhost:8000/')
    print('Press Ctrl+C to stop')
    server.serve_forever()
