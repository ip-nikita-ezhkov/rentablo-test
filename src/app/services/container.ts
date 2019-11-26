import "reflect-metadata";
import { Container } from 'inversify';
import { AuthServiceInterface } from './auth/auth.service.interface';
import { AuthService } from './auth/auth.service';
import { AUTH_SERVICE_TYPE } from './auth/auth.service.type';
import { TransportServiceInterface } from './transport/transport.service.interface';
import { TransportService } from './transport/transport.service';
import { TRANSPORT_SERVICE_TYPE } from './transport/transport.service.type';
import { InvestmentParserInterface } from './investment/investment.parser.interface';
import { InvestmentParser } from './investment/investment.parser';
import { INVESTMENT_PARSER_TYPE } from './investment/investment.parser.type'
import { InvestmentServiceInterface } from './investment/investment.service.interface'
import { InvestmentService } from './investment/investment.service'
import { INVESTMENT_SERVICE_TYPE } from './investment/investment.service.type';

const container = new Container();

container.bind<AuthServiceInterface>(AUTH_SERVICE_TYPE).to(AuthService).inSingletonScope();
container.bind<TransportServiceInterface>(TRANSPORT_SERVICE_TYPE).to(TransportService).inSingletonScope();
container.bind<InvestmentParserInterface>(INVESTMENT_PARSER_TYPE).to(InvestmentParser).inSingletonScope();
container.bind<InvestmentServiceInterface>(INVESTMENT_SERVICE_TYPE).to(InvestmentService).inSingletonScope();

export { container };
