const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { url } = req;
  let filePath;

  if (url === '/') {
    filePath = path.join(__dirname, 'project', 'index.html');
  } else {
    filePath = path.join(__dirname, 'project', url);
  }

  // Función para enviar una respuesta después de un segundo
  function sendResponseWithDelay() {
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

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token');
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  }
  sendResponseWithDelay();
});

const PORT = 80;
server.listen(PORT, () => {
  console.log(`Servidor web Node.js iniciado en el puerto ${PORT}`);
});
