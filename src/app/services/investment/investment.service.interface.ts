import { Investment } from './investment'
import { InvestmentQueryInterface } from './investment-query.interface'
import { EventEmitter } from 'events'

export interface InvestmentServiceInterface {
    onChange: EventEmitter;

    isInProgress(): boolean;
    getInvestments(): Array<Investment>;

    fetch(query?: InvestmentQueryInterface): void;

}
