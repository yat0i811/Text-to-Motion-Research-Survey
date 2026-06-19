import http.server
import socketserver
import os
import sys

PORT = 8528
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")

print(f"Serving Text-to-Motion Research Survey at http://localhost:{PORT}")
print(f"Directory: {DIRECTORY}")
print("Ctrl+C to stop.")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
