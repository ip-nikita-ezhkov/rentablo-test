import React, { useEffect, useCallback } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import * as api from 'libs/api';
import useFetch, { ReturnTypeUseFetch } from 'libs/use-fetch/use-fetch';
import { withAuth } from 'libs/use-auth/use-auth';

const useCashFlowAnalyticsQuery = (): ReturnTypeUseFetch<api.FetchCashFlowAnalyticsResponse> => {
	const [
		cashFlowAnalyticsState,
		fetchCashFlowAnalytics,
		reset,
	] = withAuth(useFetch<api.FetchCashFlowAnalyticsResponse>(api.fetchCashFlowAnalytics));

	const [, fetchAccounts] = withAuth(useFetch<api.FetchAccountsResponse>(api.fetchAccounts));

	const queryCashFlowAnalytics = useCallback(async () => {
		const accountsResponse = await fetchAccounts({});
		if (accountsResponse instanceof Error) return accountsResponse;
		const { accounts } = accountsResponse;
		const ids = accounts.filter(({ bankConnectionId }) => bankConnectionId).map(({ id }) => id);
		return fetchCashFlowAnalytics({
			id: ids,
		});
	}, []);

	return [cashFlowAnalyticsState, queryCashFlowAnalytics, reset];
};

const formatDateXAxisTick = (value: string) => {
	const [date] = value.split('T');
	return date;
};

const CashFlowAnalytics: React.FC = () => {
	const [
		cashFlowAnalyticsState,
		fetchCashFlowAnalytics,
	] = useCashFlowAnalyticsQuery();

	useEffect(() => {
		fetchCashFlowAnalytics();
	}, []);

	let content: React.ReactNode = null;
	switch (cashFlowAnalyticsState.status) {
		case 'idle': {
			content = 'No data';
			break;
		}
		case 'loading': {
			content = 'Loading cash flow analytics...';
			break;
		}
		case 'error': {
			content = `Cannot load cash flow analytics ${cashFlowAnalyticsState.error}`;
			break;
		}
		case 'success': {
			const { data } = cashFlowAnalyticsState;
			console.log(data);
			content = (
				<LineChart width={600} height={300} data={data.thisMonthExpectedRegularCashFlows.regularTransactions}>
					<Legend verticalAlign="top" height={36}/>
					<Line type="monotone" dataKey="amount" stroke="#8884d8" name="This month regular transactions" />
					<CartesianGrid stroke="#ccc" />
					<XAxis dataKey="valueDate" tickFormatter={formatDateXAxisTick} />
					<YAxis />
					<Tooltip />
				</LineChart>
			);
			break;
		}
		default:
			throw new Error('unsupported cash flow analytics state status');
	}

	return (
		<div>
			{content}
		</div>
	);
};

export default CashFlowAnalytics;
