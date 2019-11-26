import { Investment } from '../../services/investment/investment'

export interface InvestmentsTableStateInterface {
    isPending: boolean;
    investments: Array<Investment>;
}
