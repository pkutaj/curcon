/* AIM
 * the aim of this file is to consolidate various ways of input into bindings that can be passed into app.js
 */

/* REQUIRES */
const codeFileExchangeInput = require("./codeFileExchangeInput.js");
const consoleExchangeInput = require("./consoleInput.js")

/**
 * If inclined to convert from a file, define values in "codeFileExchangeInput.js"
 * @param {string} inputType select "console" OR "codeFile"
 */

 function createInputValues(inputType) {
    let exchangeInput;
    switch (inputType) {
        case "console":
            return exchangeInput = process.argv.slice(2);
            break;
        case "codeFile":

            return exchangeInput = [
                codeFileExchangeInput.values.transactionCurrency, 
                codeFileExchangeInput.values.counterCurrency, 
                codeFileExchangeInput.values.amountExchanged
            ]
            break;
        default: console.log("input type is either console or code file")
            break;
    }
}

module.exports.exchangeInput = createInputValues;
