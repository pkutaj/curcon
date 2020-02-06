const EventEmitter = require("events");
class Input extends EventEmitter {
    constructor() {
        super();
        this.on("input", (input) => {
            this._transactionCurrency = input.transactionCurrency;
            this._counterCurrency = input.counterCurrency;
            this._amountExchanged = input.amountExchanged;
        })
    }
    set transactionCurrency(transactionCurrency) {
        this._transactionCurrency = transactionCurrency;
    }

    get transactionCurrency() {
        return this._transactionCurrency
    }

    set counterCurrency(counterCurrency) {
        this._counterCurrency = counterCurrency;
    }

    get counterCurrency() {
        return this._counterCurrency
    }

    set amountExchanged(amountExchanged) {
        this._amountExchanged = amountExchanged;
    }

    get amountExchanged() {
        return this._amountExchanged
    }


};

module.exports = Input;