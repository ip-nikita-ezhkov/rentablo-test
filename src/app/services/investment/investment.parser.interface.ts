import { InvestmentApiInterface } from './investment-api.interface'
import { Investment } from './investment'

export interface InvestmentParserInterface {
    fromApi(data: InvestmentApiInterface): Investment;
}
