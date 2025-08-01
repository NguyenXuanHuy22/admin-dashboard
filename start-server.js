const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = 3001;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('- GET /users');
  console.log('- GET /products');
  console.log('- GET /orders');
  console.log('- GET /carts');
}); 