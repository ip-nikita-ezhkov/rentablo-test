import React, { useContext, createContext, useCallback } from 'react';
import * as api from 'libs/api';
import { User } from 'libs/models';
import useFetch, { FetchState, ReturnTypeUseFetch } from 'libs/use-fetch/use-fetch';

type AuthState = FetchState<User>;
type Login = (username: string, password: string) => void;
type Logout = () => void;

type ContextValue = [AuthState, Login, Logout];
const AuthContext = createContext<ContextValue | []>([]);

export const AuthProvider: React.FunctionComponent<{}> = ({ children }) => {
	const auth = useFetch<User>(api.login);
	return (
		<AuthContext.Provider value={auth}>
			{children}
		</AuthContext.Provider>
	);
};

type UseAuth = () => ContextValue;
export const useAuth: UseAuth = () => {
	const [authState, login, logout] = useContext(AuthContext);
	if (!authState || !login || !logout) {
		throw new Error('Login Form could be used within AuthProvider only');
	}
	return [authState, login, logout];
};

type WithAuth = <Data>(fetchHookData: ReturnTypeUseFetch<Data>) => ReturnTypeUseFetch<Data>;
export const withAuth: WithAuth = (fetchHookData) => {
	const [state, fetchStart, reset] = fetchHookData;
	const [authState] = useAuth();

	const withAuthFetchStart = useCallback((...args: any[]) => {
		if (authState.status !== 'success') throw new Error('Unauthorized fetch cannot be performed');
		const { access_token: token, token_type: tokenType } = authState.data;
		const authHeader = {
			Authorization: `${tokenType} ${token}`,
		};
		return fetchStart(...args, authHeader);
	}, [authState]);

	return [state, withAuthFetchStart, reset];
};
