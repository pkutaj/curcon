const consolidatedInput = require("./ui/consolidatedInput")
const service = require("./service")
const handleErrors = require("./errorHandler")

consolidatedInput.forEach(inputRecord => {
    try {
        let forexResultPromise = service.getRates(inputRecord)
        forexResultPromise.then()
    } catch (generalError) {
        handleErrors(generalError)
    };
})