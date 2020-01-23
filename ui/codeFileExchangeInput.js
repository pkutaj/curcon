/* 
 * The concern of this file is to provide an interface for defining currency conversion request via a code file
 * It is used by the "ui.js"
 */
const Input = require("./input")
let transactionCurrency = "GBP"
let counterCurrency = "CZK"
let amountExchanged = "999"
let codeFileExchangeInput = new Input(transactionCurrency, counterCurrency, amountExchanged)

console.dir(codeFileExchangeInput);

module.exports = codeFileExchangeInput;