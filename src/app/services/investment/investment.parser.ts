import { injectable } from 'inversify'
import { InvestmentParserInterface } from './investment.parser.interface'
import { InvestmentApiInterface } from './investment-api.interface'
import { Investment } from './investment'

@injectable()
export class InvestmentParser implements InvestmentParserInterface {
    fromApi(data: InvestmentApiInterface): Investment {
        // This is the place to parse sub-deps and cast types

        try {
            return new Investment(
                data.id,
                data.className,
                data.tickerSymbol,
                data.tickerSymbolWithCurrency,
                data.quoteProvider,
                data.type,
                data.literalType,
                data.jsCompatibleName,
                data.currency,
                data.numberOfLots,
                data.exchangeRate,
                data.hasDividend
            );
        } catch (e) {
            console.error(e);

            return null;
        }
    }

}
