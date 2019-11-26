import * as React from 'react';
import { container } from '../../services/container';
import { AuthServiceInterface } from '../../services/auth/auth.service.interface'
import { AUTH_SERVICE_TYPE } from '../../services/auth/auth.service.type'
import { LoginButtonStateInterface } from './login-button-state.interface';
import './login-button.scss';

export class LoginButtonComponent extends React.Component<null, LoginButtonStateInterface> {
    private _authService: AuthServiceInterface;

    constructor(props) {
        super(props);

        this._authService = container.get<AuthServiceInterface>(AUTH_SERVICE_TYPE);
        this._authService.onChange.addListener(null, this.onChangeHandler.bind(this));

        this.state = {
            isPending: this._authService.isPending(),
            isLoggedIn: this._authService.isLoggedIn()
        };
    }

    onChangeHandler() {
        this.setState({
            isPending: this._authService.isPending(),
            isLoggedIn: this._authService.isLoggedIn()
        });
    }

    onClick = () => {
        this._authService.login('evgeny.syrtsov@infopunks.com', 'asd12easfdg23#');
    };

    render() {
        if (this.state.isPending) {
            return <span className='msg'>Auth request is in progress</span>;
        }

        if (this.state.isLoggedIn) {
            return <span className='msg'>Logged in</span>;
        }

        return <button className='button' onClick={this.onClick}>Login</button>;
    }
}
