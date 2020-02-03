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
    const connectionURL = `https://api.exchangeratesapi.io/latest?base=${inputRecord.transactionCurrency}`
    const request = https.get(connectionURL, response => {
        if (response.statusCode === 200) {
            let responsePayload = "";
            response.on("data", data => {
                responsePayload += data.toString();
            })
            response.on("end", () => {
                try {
                    const parsedResponsePayload = JSON.parse(responsePayload);
                    let exchangeRate = parsedResponsePayload.rates[inputRecord.counterCurrency];
                    console.log(`for ${inputRecord.amountExchanged} ${inputRecord.transactionCurrency} you receive ` + curConverter(inputRecord.amountExchanged, exchangeRate) + " " + inputRecord.counterCurrency);
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
    request.on("error", handleErrors);
}

module.exports.curConverter = curConverter;
module.exports.getRates = getRates;