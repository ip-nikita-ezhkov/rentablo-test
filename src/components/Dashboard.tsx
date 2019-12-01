import React from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from 'libs/use-auth/use-auth';

import Login from 'components/Login';
import Investments from 'components/Investments';
import CashFlowAnalytics from 'components/CashFlowAnalytics';

const Dashboard: React.FC = () => {
	const [authState] = useAuth();

	const loginBtnLayout = authState.status === 'success' ? 4 : undefined;

	return (
		<Container className="py-4">
			<Row className="d-flex justify-content-end">
				<Col xs={loginBtnLayout} className="d-flex justify-content-center">
					<Login />
				</Col>
			</Row>
			{authState.status === 'success' && (
				<Tabs defaultActiveKey="investments" id="dashboard">
					<Tab eventKey="investments" title="Investments">
						<Investments />
					</Tab>
					<Tab eventKey="cashFlow" title="Cash Flow Analytics">
						<CashFlowAnalytics />
					</Tab>
				</Tabs>
			)}
		</Container>
	);
};

export default Dashboard;
