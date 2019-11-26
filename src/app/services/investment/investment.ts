export class Investment {
    constructor(
        readonly id: number,
        readonly className: string,
        readonly tickerSymbol: string,
        readonly tickerSymbolWithCurrency: string,
        readonly quoteProvider: string,
        readonly type: string,
        readonly literalType: string,
        readonly name: string,
        readonly currency: string,
        readonly numberOfLots: number,
        readonly exchangeRate: number,
        readonly hasDividend: boolean
    ) {};
}


