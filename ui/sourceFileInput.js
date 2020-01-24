/* The concern of this module is to provide an interface for defining currency conversion request via a code file
 * It is used by the "ui.js"
 */

const Input = require("./Input")
let input = new Input();
let codeInput;

/* codeInput = {
    transactionCurrency: "GBP",
    counterCurrency: "CZK",
    amountExchanged: "1000000",
} */

if (codeInput !== undefined) {
    input.emit("input", codeInput);
    module.exports = input;
} else(module.exports = null);

