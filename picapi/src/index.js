import express from 'express'; //app server
import bodyParser from 'body-parser'; // parser for post requests

const app = express();

app.use(function (_, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Acess-Control-Allow-Origin', '*')

  //Request methods you wish to allow
  res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');

  //Request headers you wish to allow
  res.setHeader('Acess-Control-Allow-Headers', 'X-Requestes-With, content-type, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', "true");

  //Pass to next layer of middleware
  next();
});

app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());


export default app;