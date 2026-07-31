import http.server
import socketserver
import socket
import sys

PORT = 8081

class DualStackServer(http.server.ThreadingHTTPServer):
    address_family = socket.AF_INET6

    def server_bind(self):
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        return super().server_bind()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with DualStackServer(("", port), handler) as httpd:
            print(f"Serving HTTP on dual-stack (IPv4 & IPv6) port {port}...")
            httpd.serve_forever()
    except Exception as e:
        class IPv4Server(http.server.HTTPServer):
            allow_reuse_address = True
        with IPv4Server(("0.0.0.0", port), handler) as httpd:
            print(f"Serving HTTP on IPv4 port {port}...")
            httpd.serve_forever()
