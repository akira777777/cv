const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.mp4': 'video/mp4',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
};

const COMPRESSIBLE_TYPES = new Set([
    'text/html',
    'text/css',
    'application/javascript',
    'application/json',
    'image/svg+xml',
    'application/xml',
]);

const SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';

    // URL-decode the path (e.g. for spaces in filenames)
    urlPath = decodeURIComponent(urlPath);

    const filePath = path.join(ROOT, urlPath);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403, SECURITY_HEADERS);
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS });
            res.end('Not Found: ' + urlPath);
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const mime = MIME[ext] || 'application/octet-stream';
        const headers = { 'Content-Type': mime, ...SECURITY_HEADERS };

        // Gzip compress text-based responses
        const acceptEncoding = req.headers['accept-encoding'] || '';
        const canCompress = COMPRESSIBLE_TYPES.has(mime.split(';')[0]) && acceptEncoding.includes('gzip');

        if (canCompress && data.length > 1024) {
            zlib.gzip(data, (gzipErr, compressed) => {
                if (gzipErr) {
                    headers['Cache-Control'] = 'no-cache';
                    res.writeHead(200, headers);
                    res.end(data);
                    return;
                }
                headers['Content-Encoding'] = 'gzip';
                headers['Content-Length'] = compressed.length;
                headers['Cache-Control'] = ext === '.html' ? 'no-cache' : 'public, max-age=86400';
                res.writeHead(200, headers);
                res.end(compressed);
            });
        } else {
            headers['Content-Length'] = data.length;
            headers['Cache-Control'] = ext === '.html' ? 'no-cache' : 'public, max-age=86400';
            res.writeHead(200, headers);
            res.end(data);
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});

