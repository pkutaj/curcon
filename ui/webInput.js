/* 
 * The concern of this module will be the handling of HTTP input requests and passing it further into the input consolidation layer
 */

const Input = require("./Input")
let input = new Input();

//WEB SERVER
const http = require('http');
const server = http.createServer(globalRouter);
server.listen(8080);

function globalRouter(req, res) {
  /* TEST-START */
//AIM: parse request.url into an array and then into a standard object
var inputMessage = req.url.split("/")
console.log(inputMessage)
//RESULT: [ '', 'exchange', '1000', 'cze', 'gbp' ] PASS

/* TEST-END */
  if (req.url === "/") homeRoute(req, res);
  if (inputMessage.length > 0) exchangeRoute(req, res, inputMessage);
};

//2. Handle HTTP route GET / and POST / i.e. Home
function homeRoute(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  setInterval(function () {
    res.write(new Date() + "\n");
  }, 1000)
};

//3. Handle HTTP route GET /:username i.e. /chalkers
function exchangeRoute(req, res, inputMessage) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  let webInput = normaliseWebInput(inputMessage);
  input.emit("input", webInput);
  module.exports = input;
};

//4. Normalization function before passing the input to the service layer
function normaliseWebInput(webInput) {
    const normalisedWebInput = {
        transactionCurrency: webInput[2],
        counterCurrency: webInput[3],
        amountExchanged: webInput[4]
    };
    return normalisedWebInput;
}

//passing into the consolidationLayer
/* input.emit("input", webInput);
module.exports = input; */