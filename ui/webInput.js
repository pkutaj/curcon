/* 
 * The concern of this module will be the handling of HTTP input requests and passing it further into the input consolidation layer
 * STATE: UNDER-CONSTRUCTION
 * COMMENT: you need to finish the connection of the service layer to make the webserver run properly
 * DATE: 2020-02-06
 */

/* INITS */
const service = require("../service")
const handleErrors = require("../errorHandler")
const Input = require("./Input")
let input = new Input();
const http = require('http');

/* AUXILIARIES */
function normaliseWebInput(webInput) {
  const normalisedWebInput = {
    transactionCurrency: webInput[1].toUpperCase(),
    counterCurrency: webInput[2].toUpperCase(),
    amountExchanged: webInput[3]
  };
  return normalisedWebInput;
}

/* ROUTERS */
function homeRoute(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  setInterval(function () {
    res.write(new Date() + "\n");
  }, 1000)
};

function exchangeRoute(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log("dwarf says we received the request for the forex calculation!")
  let forexResultPromise = service.getRates(input)
  forexResultPromise.then(finalResult => {
    res.write(finalResult)
    res.end();
  }
  )
};

/* THE GLOBAL LISTENER / ROUTER */

function globalRouter(req, res) {
  if(req.url === "/favicon.ico") return res.end();
  var inputMessage = req.url.split("/")
  console.log(inputMessage)
  let webInput = normaliseWebInput(inputMessage);
  input.emit("input", webInput);
  module.exports = input;
  if (req.url === "/") homeRoute(req, res);
  else exchangeRoute(req,res)
};

/* MAIN */
function main() {
  const server = http.createServer(globalRouter);
  server.listen(8080);
  module.exports = server;
}

main();
