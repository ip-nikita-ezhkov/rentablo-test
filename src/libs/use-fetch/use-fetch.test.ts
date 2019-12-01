import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from './use-fetch';

describe('Use Fetch hook', () => {
	it('should be initialized with idle state', () => {
		const mockedApi = jest.fn();
		const { result } = renderHook(() => useFetch<string>(mockedApi));
		const [fetchState, fetchData, reset] = result.current;
		expect(fetchState.status).toBe('idle');
		expect(typeof fetchData).toBe('function');
		expect(typeof reset).toBe('function');
	});

	it('should be in loading state while awaiting for request', async () => {
		const mockedData = 'mocked_data';
		const mockedApi = jest.fn(() => new Promise((resolve) => {
			setTimeout(() => resolve(mockedData), 10);
		}));
		const { result, waitForNextUpdate } = renderHook(() => useFetch(mockedApi));
		const [, fetchData] = result.current;
		await act(async () => {
			fetchData();
			await waitForNextUpdate();
			const [fetchState] = result.current;
			expect(fetchState.status).toBe('loading');
			await waitForNextUpdate();
		});
	});

	it('should be in success state with data after successful request', async () => {
		const mockedData = 'mocked_data';
		const mockedApi = jest.fn(() => new Promise((resolve) => {
			setTimeout(() => resolve(mockedData), 10);
		}));
		const { result, waitForNextUpdate } = renderHook(() => useFetch(mockedApi));
		const [, fetchData] = result.current;
		await act(async () => {
			fetchData();
			await waitForNextUpdate();
			await waitForNextUpdate();
		});
		const [fetchState] = result.current;
		expect(fetchState.status).toBe('success');
		expect(fetchState.data).toBe(mockedData);
	});

	it('should be in error state with error after failed request', async () => {
		const mockedApi = jest.fn(() => new Promise((_resolve, reject) => {
			setTimeout(() => reject('Failed request'), 10);
		}));
		const { result, waitForNextUpdate } = renderHook(() => useFetch(mockedApi));
		const [, fetchData] = result.current;
		await act(async () => {
			fetchData();
			await waitForNextUpdate();
			await waitForNextUpdate();
		});
		const [fetchState] = result.current;
		expect(fetchState.status).toBe('error');
		expect(fetchState.error).toBe('Failed request');
	});

	it('should move to idle state on reset invoking', async () => {
		const mockedApi = jest.fn(() => new Promise((_resolve, reject) => {
			setTimeout(() => reject('Failed request'), 10);
		}));
		const { result, waitForNextUpdate } = renderHook(() => useFetch(mockedApi));
		const [, fetchData, reset] = result.current;
		await act(async () => {
			fetchData();
			await waitForNextUpdate();
			await waitForNextUpdate();
			reset();
		});
		const [fetchState] = result.current;
		expect(fetchState.status).toBe('idle');
	});
});
