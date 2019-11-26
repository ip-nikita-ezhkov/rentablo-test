export interface InvestmentApiInterface {
    id: number,
    className: string,
    tickerSymbol: string,
    tickerSymbolWithCurrency: string,
    quoteProvider: string,
    type: string,
    literalType: string,
    name: string,
    jsCompatibleName: string,
    currency: string,
    numberOfLots: number,
    exchangeRate: number,
    hasDividend: boolean

    [_: string]: any
}
