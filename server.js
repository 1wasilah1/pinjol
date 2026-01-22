const http = require('http');
const url = require('url');
const fs = require('fs');

// Baca data dari db.json
const mockData = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Routes
  if (path === '/auth/login' && method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.auth));
  } 
  else if (path === '/loans/apply' && method === 'POST') {
    res.writeHead(201);
    res.end(JSON.stringify({
      loan_id: "loan123",
      status: "pending",
      message: "Pengajuan pinjaman berhasil disubmit"
    }));
  }
  else if (path.startsWith('/loans/') && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.loans));
  }
  else if (path.includes('/payments') && method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.payments));
  }
  else if (path.includes('/credit-score') && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.credit));
  }
  else if (path.includes('/schedule') && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.schedule));
  }
  else if (path.includes('/notifications') && method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify(mockData.notifications));
  }
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Pinjol API Mock Server running at http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log('   POST http://localhost:3000/auth/login');
  console.log('   POST http://localhost:3000/loans/apply');
  console.log('   GET  http://localhost:3000/loans/loan123');
  console.log('   POST http://localhost:3000/loans/loan123/payments');
  console.log('\nPress Ctrl+C to stop server');
});