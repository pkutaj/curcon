/* 
 * The concern of this is the gathering of exchange input from the console
 * And exporting this 
 * This is the part of the UI module 
 */

const Input = require("./input")
let consoleInputCollector = process.argv.slice(2);
let consoleInput = new Input(consoleInputCollector[0],consoleInputCollector[1],consoleInputCollector[2] );
module.exports = consoleInput;