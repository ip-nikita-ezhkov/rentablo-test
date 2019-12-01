import React from 'react';
import { AuthProvider } from 'libs/use-auth/use-auth';
import Dashboard from 'components/Dashboard';

const App: React.FC = () => (
	<AuthProvider>
		<Dashboard />
	</AuthProvider>
);

export default App;
