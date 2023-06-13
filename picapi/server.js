const dotenv = require("dotenv");
dotenv.config()

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const server = require('./src');

server.app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});