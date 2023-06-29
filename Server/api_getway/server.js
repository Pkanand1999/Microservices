const express = require("express");
const PORT = 8080;

const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(express.static("build"));
const routes = {
  "/api/users/public/v2/get": "http://localhost:4001",
  "/api/public/v2/users/update": "http://localhost:4002",
  "/api/download": "http://localhost:4003",
};

for (route in routes) {
  const target = routes[route];
  app.use(route, createProxyMiddleware({ target }));
}

app.get('*/',(req, res) =>{
  res.sendFile(__dirname + '/build/index.html')
})

app.listen(PORT, () => console.log(`get listening at port ${PORT}`));