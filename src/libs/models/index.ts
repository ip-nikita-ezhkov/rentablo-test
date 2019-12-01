type UserRole = string;
export type User = {
  access_token: string;
  expires_in: number; // ms
  refresh_token: string;
  roles: UserRole[];
  token_type: string;
  username: string;
};

type InvestmentType =
  | '11_stock'
  | '21_fund'
  | '31_bond'
  | '41_cash'
  | '51_certos'
  | '61_pmetals'
  | '71_massets'
  | '81_fcurr'
  | '22_etf'
  | '91_managed'
;
type InvestmentQuote = {
  currency: string;
  quoteProvider: string;
  last: number;
  lastEUR: number;
  lastDateTime: string;
  isToday: boolean;
  changeAbs: number;
  changeAbsEUR: number;
  changePercentAbs: number;
};
export type Investment = {
  id: string;
  finApiId: string;
  className: string;
  tickerSymbol: string;
  tickerSymbolWithCurrency: string;
  quoteProvider: string;
  type: InvestmentType;
  literalType: string;
  name: string;
  jsCompatibleName: string;
  isin: string;
  hasValidIsin: boolean;
  hasValidTickerSymbol: boolean;
  currency: string;
  numberOfLots: number;
  exchangeRate: number;
  bondYield: number;
  dueDate: string;
  hasDividend: boolean;
  receivedAverageDividend: number;
  receivedTotalDividend: number;
  receivedAverageDividendPercent: number;
  receivedAverageDividendAC: number;
  receivedTotalDividendAC: number;
  receivedAverageDividendPercentAC: number;
  quote: InvestmentQuote;
  // TODO: add rest fields
};

export type RegularCashFlows = {
	date: string;
	totalRegularIncome: number;
	totalRegularExpenses: number;
	regularTransactions: Record<string, any>[];
};

export type AverageCashFlowsData = {
	mean: number;
	curatedMean: number;
	extendedDateValuePairs: Record<string, any>[];
};

export type Account = {
	id: number;
	bankConnectionId: number;
  // TODO: add rest fields
};
