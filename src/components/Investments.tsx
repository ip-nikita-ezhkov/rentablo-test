import React, { useEffect } from 'react';
import { Table, Row, Col } from 'react-bootstrap';

import * as api from 'libs/api';
import useFetch from 'libs/use-fetch/use-fetch';
import { withAuth } from 'libs/use-auth/use-auth';

const investmentsQuery: Partial<api.InvestementsListQuery> = {
	page: 1,
	perPage: 10,
};

const Investments: React.FC = () => {
	const [
		investmentsState,
		fetchInvestments,
	] = withAuth(useFetch<api.FetchInvestmentsResponse>(api.fetchInvestments));

	useEffect(() => {
		fetchInvestments(investmentsQuery);
	}, []);

	let content: React.ReactNode = null;
	switch (investmentsState.status) {
		case 'idle': {
			content = 'No data';
			break;
		}
		case 'loading': {
			content = 'Loading investments...';
			break;
		}
		case 'error': {
			content = `Cannot load investments ${investmentsState.error}`;
			break;
		}
		case 'success': {
			const { investments } = investmentsState.data;
			content = (
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{investments.map(({ id, name }) => (
							<tr key={id}>
								<td>{id}</td>
								<td>{name}</td>
							</tr>
						))}
					</tbody>
				</Table>
			);
			break;
		}
		default:
			throw new Error('unsupported investments state status');
	}

	return (
		<Row className="mt-3">
			<Col>
				{content}
			</Col>
		</Row>
	);
};

export default Investments;
