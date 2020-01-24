/* 
 * The concern of this module the gathering of exchange input from the console
 * And exporting this 
 * This is the part of the UI module 
 */

const Input = require("./Input")
let input = new Input();
let consoleInput = process.argv.slice(2);
const checkInputPresence = () => {return consoleInput.length === 3 ? true : false};

let consoleInputPresent = checkInputPresence();
function normaliseConsoleInput(consoleInput) {
    const normalisedConsoleInput = {
        transactionCurrency: consoleInput[0],
        counterCurrency: consoleInput[1],
        amountExchanged: consoleInput[2]
    };
    return normalisedConsoleInput;
}

if (consoleInputPresent) {
    consoleInput = normaliseConsoleInput(consoleInput);
    input.emit("input", consoleInput);
    module.exports = input;
} else(module.exports = null);