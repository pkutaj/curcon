const http = require("http");
const https = require("https");
const events = require("events");
const consolidatedInput = require("./ui/consolidatedInput")
const handleErrors = error => console.error(`Hello, there is a problem: ${error.message}`);

function curConverter(amountExchanged, exchangeRate) {
    let finalResult = parseFloat(amountExchanged) * parseFloat(exchangeRate);
    return finalResult.toFixed(2);
}

consolidatedInput.forEach(inputRecord => {
    try {
        const request = https.get(`https://api.exchangeratesapi.io/latest?base=${inputRecord.transactionCurrency}`, response => {
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
    } catch (generalError) {
        handleErrors(generalError)
    };
})