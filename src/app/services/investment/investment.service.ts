import { inject, injectable } from 'inversify'
import { EventEmitter } from "events"
import { InvestmentServiceInterface } from './investment.service.interface'
import { InvestmentQueryInterface } from './investment-query.interface'
import { Investment } from './investment'
import { TransportServiceInterface } from '../transport/transport.service.interface'
import { AuthServiceInterface } from '../auth/auth.service.interface'
import { InvestmentParserInterface } from './investment.parser.interface'
import { InvestmentApiInterface } from './investment-api.interface'
import { AUTH_SERVICE_TYPE } from '../auth/auth.service.type'
import { TRANSPORT_SERVICE_TYPE } from '../transport/transport.service.type'
import { INVESTMENT_PARSER_TYPE } from './investment.parser.type'

@injectable()
export class InvestmentService implements InvestmentServiceInterface {
    private _inProgress = false;
    private _investments: Array<Investment> = [];

    public onChange = new EventEmitter();

    constructor(
        @inject(AUTH_SERVICE_TYPE) private _auth: AuthServiceInterface,
        @inject(TRANSPORT_SERVICE_TYPE) private _transport: TransportServiceInterface,
        @inject(INVESTMENT_PARSER_TYPE) private _parser: InvestmentParserInterface
    ) {
        this._auth.onChange.addListener(null, this._onAuthChange.bind(this));
        this._onAuthChange();
    };

    isInProgress(): boolean {
        return this._inProgress;
    }

    getInvestments(): Array<Investment> {
        return this._investments;
    }

    fetch(query?: InvestmentQueryInterface): void {
        this._inProgress = true;
        this.onChange.emit(null);

        this._transport.get('/api/v1/investments', this._getPlainQuery(query))
            .then((response: object) => {
                const result: Array<Investment> = [];

                if (response && Array.isArray(response['investments'])) {
                    response['investments']
                        .forEach((investment: InvestmentApiInterface) => {
                            const model: Investment = this._parser.fromApi(investment);

                            if (model) {
                                result.push(model);
                            }
                        });
                }

                this._investments = result;
                this._inProgress = false;
                this.onChange.emit(null);
            })
            .catch(() => {
                this._inProgress = false;
                this.onChange.emit(null);
            });
    }

    private _onAuthChange(): void {
        if (this._auth.isLoggedIn()) {
            this.fetch();
        } else if (!this._auth.isExpired()) {
            this._investments = [];
            this.onChange.emit(null);
        }
    }

    private _getPlainQuery(query: InvestmentQueryInterface): { [_: string]: string; } {
        if (!query) {
            return {};
        }

        return Object.keys(query).reduce((result: object, key: string) => {
            result[key] = String(query[key]);

            return result;
        }, {});
    }
}
