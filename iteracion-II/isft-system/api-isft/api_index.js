const http = require('http');

const server = http.createServer((req, res) => {
  // Configurar encabezados para permitir el CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejo de las solicitudes y respuestas aquí
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  

  let json = JSON.stringify({'greetings': 'Hello, World!'});
  res.end(json);
});

const PORT = 3000; // Puerto en el que se ejecutará el servidor HTTP
server.listen(PORT, () => {
  console.log(`Servidor HTTP iniciado en el puerto ${PORT}`);
});