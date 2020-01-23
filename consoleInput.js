/* 
 * The concern of this is the gathering of exchange input from the console
 * And exporting this 
 * This is the part of the UI module 
 */

let consoleExchangeInput = process.argv.slice(2);
let transactionCurrency = consoleExchangeInput[0];
let counterCurrency = consoleExchangeInput[1];
let amountExchanged = consoleExchangeInput[2];

module.exports.transactionCurrency = transactionCurrency;
module.exports.counterCurrency = counterCurrency; 
module.exports.amountExchanged = amountExchanged;
 