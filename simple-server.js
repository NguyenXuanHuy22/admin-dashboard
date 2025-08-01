const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

// Đọc dữ liệu từ db.json
const dbPath = path.join(__dirname, 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL
  const url = req.url;
  
  // Route cho /users
  if (url === '/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dbData.users));
    return;
  }
  
  // Route cho /products
  if (url === '/products') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dbData.products));
    return;
  }
  
  // Route cho /orders
  if (url === '/orders') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dbData.orders));
    return;
  }
  
  // Route cho /carts
  if (url === '/carts') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dbData.carts));
    return;
  }
  
  // Default response
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`🚀 Simple JSON Server running on http://localhost:${PORT}`);
  console.log('📡 Available endpoints:');
  console.log('  - GET /users');
  console.log('  - GET /products');
  console.log('  - GET /orders');
  console.log('  - GET /carts');
}); 