const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { url } = req;
  let filePath;

  if (url === '/') {
    filePath = path.join(__dirname, 'project', 'index.html');
  } 
  else if (url === '/login') {
    filePath = path.join(__dirname, 'project', 'login.html');
  } 
  else {
    filePath = path.join(__dirname, 'project', url);
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Recurso no encontrado');
      } else {
        res.writeHead(500);
        res.end('Error interno del servidor');
      }
    } else {
      const extension = path.extname(filePath);
      let contentType = 'text/plain';

      switch (extension) {
        case '.html':
          contentType = 'text/html';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.js':
          contentType = 'text/javascript';
          break;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = 80; // Puerto en el que se ejecutará el servidor HTTP
server.listen(PORT, () => {
  console.log(`Servidor web Node.js iniciado en el puerto ${PORT}`);
});
