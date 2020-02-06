/* 
 * The concern of this module is to provide the currency exchange service to the whole application
 * Todo: the abstraction of http-related functions, deeply embedded into the business itself here
 */
const http = require("http");
const https = require("https");
const handleErrors = require("./errorHandler")

function curConverter(amountExchanged, exchangeRate) {
    let finalResult = parseFloat(amountExchanged) * parseFloat(exchangeRate);
    return finalResult.toFixed(2);
}

function getRates(inputRecord) {
    return new Promise((resolve, reject) => {
        const connectionURL = `https://api.exchangeratesapi.io/latest?base=${inputRecord.transactionCurrency}`
        const request = https.get(connectionURL, response => {
            if (response.statusCode === 200) {
                let responsePayload = "";
                response.on("data", chunk => {
                    responsePayload += chunk.toString();
                })
                response.on("end", () => {
                    try {
                        const parsedResponsePayload = JSON.parse(responsePayload);
                        let exchangeRate = parsedResponsePayload.rates[inputRecord.counterCurrency];
                        let finalResult = `for ${inputRecord.amountExchanged} ${inputRecord.transactionCurrency} you receive ` + curConverter(inputRecord.amountExchanged, exchangeRate) + " " + inputRecord.counterCurrency
                        resolve(finalResult);
                        console.log(finalResult);
                    } catch (parseError) {
                        handleErrors(parseError)
                    }
                })
            } else {
                const currentStatusCode = response.statusCode;
                const HTTPStatus = `${currentStatusCode}: ${http.STATUS_CODES.currentStatusCode}`;
                const HTTPStatusCodeError = new Error(`There was an HTTP ${HTTPStatus} error)`);
                handleErrors(HTTPStatusCodeError);
            }
        }
        )
        request.on("error", error => {
            reject("error", error);
        });
    })
}

module.exports.curConverter = curConverter;
module.exports.getRates = getRates;