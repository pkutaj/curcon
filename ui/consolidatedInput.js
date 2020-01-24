/* 
 * The aim of the module is to build a composite array with normalized structure and pass it into a service layer.
 * Instructions for adding another UI type (csv file for example) 
 * 1. require the .js file that processes / normalizes the input:
 *    const csvFileInput = require("./csvFileInput.js")
 * 2. call the addToCondolidatedInput function to append the input to the array that is passed further
 * 
 */

const codeFileInput = require("./sourceFileInput.js")
const consoleInput = require("./consoleInput");

let consolidatedInput = [];
function addToConsolidatedInput(input) {
    if (input !== null) { 
        consolidatedInput.push(input);}
}
addToConsolidatedInput(codeFileInput);
addToConsolidatedInput(consoleInput);
module.exports = consolidatedInput;