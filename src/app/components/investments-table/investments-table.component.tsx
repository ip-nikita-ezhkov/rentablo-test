import * as React from 'react';
import { container } from '../../services/container';
import { InvestmentServiceInterface } from '../../services/investment/investment.service.interface'
import { INVESTMENT_SERVICE_TYPE } from '../../services/investment/investment.service.type'
import { InvestmentsTableStateInterface } from './investments-table-state.interface'
import { Investment } from '../../services/investment/investment'

export class InvestmentsTableComponent extends React.Component<null, InvestmentsTableStateInterface> {
    private _investmentService: InvestmentServiceInterface;

    constructor(props) {
        super(props);

        this._investmentService = container.get<InvestmentServiceInterface>(INVESTMENT_SERVICE_TYPE);
        this._investmentService.onChange.addListener(null, this.onChangeHandler);

        this.state = {
            isPending: this._investmentService.isInProgress(),
            investments: this._investmentService.getInvestments()
        }
    }

    onChangeHandler = () => {
        const investments: Array<Investment> = this._investmentService.getInvestments();

        if (this._investmentService.isInProgress() && investments.length === 0) {
            this.setState({
                isPending: true
            });
        } else {
            this.setState({
                isPending: false,
                investments,
            });
        }
    }

    render() {
        if (this.state.isPending) {
            return <span>Pending Investments</span>;
        }

        return <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
                {this.state.investments.map((investment: Investment) => {
                    return <tr>
                        <td>{investment.id}</td>
                        <td>{investment.name}</td>
                    </tr>;
                })}
            </tbody>
        </table>;
    }
}
