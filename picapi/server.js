const http = require('http');
const dotenv = require("dotenv");
dotenv.config()
const packagejson = require("./package.json")

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`I am Alive, PIC Api Version ${packagejson.version}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});