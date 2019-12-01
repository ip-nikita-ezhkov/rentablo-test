import axios, { AxiosRequestConfig } from 'axios';
import {
	User,
	Investment,
	Account,
	RegularCashFlows,
	AverageCashFlowsData,
} from 'libs/models';

type Login = (username: string, password: string) => Promise<User>;
export const login: Login = async (username, password) => {
	const response = await axios.post('/api/v1/login', {
		username,
		password,
	});
	return response.data;
};

export type InvestementsListQuery = {
	id: number[];
	accountId: number[];
	wkn: string[];
	isin: string[];
	tickerSymbol: string[];
	name: string;
	currency: string[];
	industryId: number[];
	regionId: number[];
	includeHistoric: boolean;
	positiveAmountOrLastTransactionAfter: string;
	page: number;
	perPage: number;
	order: string;
};
export type FetchInvestmentsResponse = {
	investments: Investment[];
	paging: {
		page: number;
		perPage: number;
		pageCount: number;
		totalCount: number;
	};
};
type FetchInvestments = (
		query: Partial<InvestementsListQuery>,
		headers?: AxiosRequestConfig['headers']
) => Promise<FetchInvestmentsResponse>;
export const fetchInvestments: FetchInvestments = async (query, headers) => {
	const response = await axios.get('/api/v1/investments', {
		headers,
		params: query,
	});
	return response.data;
};

type FetchCashFlowAnalyticsQuery = {
	id: number[];
};
export type FetchCashFlowAnalyticsResponse = {
	thisMonthExpectedRegularCashFlows: RegularCashFlows;
	nextMonthExpectedRegularCashFlows: RegularCashFlows;
	averageNonRegularExpenses: AverageCashFlowsData;
	averageNonRegularIncome: AverageCashFlowsData;
	averageRegularExpenses: AverageCashFlowsData;
	averageRegularIncome: AverageCashFlowsData;
};
type FetchCashFlowAnalytics = (
		query: Partial<FetchCashFlowAnalyticsQuery>,
		headers?: AxiosRequestConfig['headers']
) => Promise<FetchCashFlowAnalyticsResponse>;
export const fetchCashFlowAnalytics: FetchCashFlowAnalytics = async (query, headers) => {
	const response = await axios.get('/api/v1/cashFlowAnalytics', {
		headers,
		params: query,
	});
	return response.data;
};

type FetchAccountsQuery = Record<string, any>;
export type FetchAccountsResponse = {
	accounts: Account[];
};
type FetchAccounts = (
		query: Partial<FetchAccountsQuery>,
		headers?: AxiosRequestConfig['headers']
) => Promise<FetchAccountsResponse>;
export const fetchAccounts: FetchAccounts = async (query, headers) => {
	const response = await axios.get('/api/v1/accounts', {
		headers,
		params: query,
	});

	return response.data;
};
