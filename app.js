/* GEPARD 
 * 
 * 
 *
 *
 *
 *
 */
/* REQUIRES */
const http = require("http");
const https = require("https");
const consoleInput = require("./ui/consoleInput.js")
const codeFileInput = require("./ui/codeFileExchangeInput.js")

/* test */
console.log(codeFileInput);

/* INITS */


/* ERROR-HANDLER */
const handleErrors = error => console.error(`Hello, there is a problem: ${error.message}`);

/*4. DO THE WORK FUNCTION */
function curConverter(amountExchanged, exchangeRate) {
    /* 4.1 PARSE */
    let finalResult = parseFloat(amountExchanged) * parseFloat(exchangeRate);
    /* 4.2 ROUND & RETURN */
    return finalResult.toFixed(2);
}

/* ERRROR-2 GENERAL HANDLER */
try {

    /* 1. GET RESPONSE */
    const request = https.get(`https://api.exchangeratesapi.io/latest?base=${codeFileInput.transactionCurrency}`, response => {
        /* ERROR-4 HTTP STATUS ERRORS */
        if (response.statusCode === 200) {
            /* 2. EXTRACT PAYLOAD */
            let responsePayload = "";
            response.on("data", data => {
                responsePayload += data.toString();
            })

            response.on("end", () => {

                /* 3. PARSE PAYLOAD */
                /* ERROR-3 PARSE ERROR */
                try {

                    const parsedResponsePayload = JSON.parse(responsePayload);
                    let exchangeRate = parsedResponsePayload.rates[codeFileInput.counterCurrency];

                    /* 4. DO THE WORK (SERVICE) */
                    console.log(`for ${codeFileInput.amountExchanged} ${codeFileInput.transactionCurrency} you receive ` + curConverter(codeFileInput.amountExchanged, exchangeRate) + " " + codeFileInput.counterCurrency);

                } catch (parseError) {
                    handleErrors(parseError)
                }
            })
        }
    }
    )
    /* ERROR-1: request errors */
    request.on("error", handleErrors);

} catch (generalError) {
    handleErrors(generalError)
};