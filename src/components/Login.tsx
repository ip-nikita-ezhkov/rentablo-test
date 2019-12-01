import React, { useCallback } from 'react';
import { Button, Alert } from 'react-bootstrap';

import { useAuth } from 'libs/use-auth/use-auth';

const username = 'evgenyakawr@gmail.com';
const password = 'asifh19ruhfsauihfg1782eg';

const LoginForm: React.FC = () => {
	const [authState, login, logout] = useAuth();

	const handleLoginClick = useCallback(() => {
		login(username, password)
	}, [username, password]);

	switch(authState.status) {
		case 'idle': {
			const txtLogin = 'Login';
			return (
				<Button variant="primary" onClick={handleLoginClick}>
					{txtLogin}
				</Button>
			);
		}
		case 'loading': {
			const txtLoading = 'Logging in...';
			return (
				<Button variant="primary" disabled>
					{txtLoading}
				</Button>
			);
		}
		case 'success': {
			const { data: user } = authState;
			const txtLogout = `${user.username} - logout`;
			return (
				<Button variant="secondary" onClick={logout}>
					{txtLogout}
				</Button>
			);
		}
		case 'error': {
			const { error } = authState;
			const txtTryAgain = 'Try again';
			const txtErrorAlert = `Cannot login now - ${error.message}`;
			return (
				<React.Fragment>
					<Button variant="primary" onClick={handleLoginClick}>
						{txtTryAgain}
					</Button>
					<Alert variant="danger">
						{txtErrorAlert}
					</Alert>
				</React.Fragment>
			);
		}
		default:
			throw new Error('unsupported auth state status');
	}
};

export default LoginForm;
