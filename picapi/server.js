const dotenv = require("dotenv");
dotenv.config()

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

//Checking if Server Variables aren't empty at \.Env

if (hostname === undefined || hostname === null) {
  throw "Hostname is Null or Undefined check if you have setup .Env"
}

if (port === undefined || port === null) {
  throw "Port is Null or Undefined check if you have setup .Env"
}

//Checking if Database Variables aren't empty at \.Env

if (process.env.DB_HOST === undefined || process.env.DB_HOST === null) {
  throw "DB_HOST is Null or Undefined check if you have setup .Env"
}

if (process.env.DB_USER === undefined || process.env.DB_USER === null) {
  throw "DB_USER is Null or Undefined check if you have setup .Env"
}

if (process.env.DB_PASS === undefined || process.env.DB_PASS === null) {
  throw "DB_PASS is Null or Undefined check if you have setup .Env"
}

if (process.env.DB_NAME === undefined || process.env.DB_NAME === null) {
  throw "DB_NAME is Null or Undefined check if you have setup .Env"
}

if (process.env.DB_PORT === undefined || process.env.DB_PORT === null) {
  throw "DB_PORT is Null or Undefined check if you have setup .Env"
}

//Checking if jwt Token aren't empty at \.Env
if (process.env.TOKEN_KEY === undefined || process.env.TOKEN_KEY === null) {
  throw "TOKEN_KEY is Null or Undefined check if you have setup .Env"
}

//Checking if bCrypt SaltRounds aren't empty at \.Env
if (process.env.SALT_ROUNDS === undefined || process.env.SALT_ROUNDS === null) {
  throw "SALT_ROUNDS is Null or Undefined check if you have setup .Env"
}
//Check if bCrypt SaltRounds is a number
if (typeof Number(process.env.SALT_ROUNDS) !== "number") {
  throw "SALT_ROUNDS isn't a Number check .Env"
}


const server = require('./src');

server.app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});