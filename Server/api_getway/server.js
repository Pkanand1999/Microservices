const express = require("express");
const PORT = 8080;

const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const routes = {
  "/users/public/v2/get": "http://localhost:3001",
  "/public/v2/users/update": "http://localhost:3002",
  "/download": "http://localhost:3003",
};

for (route in routes) {
  const target = routes[route];
  app.use(route, createProxyMiddleware({ target }));
}

app.listen(PORT, () => console.log(`get listening at port ${PORT}`));