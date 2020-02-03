const consolidatedInput = require("./ui/consolidatedInput")
const service = require("./service")
const handleErrors = require("./errorHandler")

consolidatedInput.forEach(inputRecord => {
    try {
        service.getRates(inputRecord)
    } catch (generalError) {
        handleErrors(generalError)
    };
})