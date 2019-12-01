import { useState, useCallback } from 'react';

export type FetchState<Data> =
	| { status: 'idle'; }
	| { status: 'loading'; }
	| { status: 'success'; data: Data; }
	| { status: 'error'; error: Error; }
;

type FetchApi<Data> = (...args: any[]) => Promise<Data>;
type ResetState = () => void;
export type ReturnTypeUseFetch<Data> = [FetchState<Data>, FetchApi<Data | Error>, ResetState];
const useFetch = <Data>(fetchApi: FetchApi<Data>): ReturnTypeUseFetch<Data> => {
	const [fetchState, setFetchState] = useState<FetchState<Data>>({
		status: 'idle',
	});

	const fetchData = useCallback(async (...args: any[]) => {
		setFetchState({ status: 'loading' });
		try {
			const data = await fetchApi(...args);
			setFetchState({
				data,
				status: 'success',
			});
			return data;
		} catch (err) {
			setFetchState({
				status: 'error',
				error: err,
			});
			return err;
		};
	}, [fetchApi]);

	const reset = useCallback(() => {
		setFetchState({ status: 'idle' });
	}, []);

	return [fetchState, fetchData, reset];
};

export default useFetch;
