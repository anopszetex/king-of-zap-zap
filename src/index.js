const http = require('http');

const PORT = 5000;

async function handleRequest(request, response) {
  response.setHeader('Content-Type', 'application/json');

  if (request.url) {
    if (request.url === '/authenticate') {
      response.end('Hello API!');
    }
  }

  response.end();
}

const app = http.createServer(handleRequest);

app.listen(PORT, function listeningListener() {
  console.log('server running at:', `http://localhost:${PORT}`);
});
