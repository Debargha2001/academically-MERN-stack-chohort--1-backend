// import packages
const http = require('http');
const url = require('url');

const handleServer = (req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method.toLowerCase();

    // Routes
    if (method === 'get' && path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the Home Page!\n');
    } else if (method === 'get' && path === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the About Page!\n');
    } else if (method === 'post' && path === '/data') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Collecting the request body
        });

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data received', data: body }));
        });
    } else {
        // 404 route
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found\n');
    }
}
// Create server
const server = http.createServer(handleServer);

// Start server
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
