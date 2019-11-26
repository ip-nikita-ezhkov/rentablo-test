import { inject, injectable } from 'inversify'
import { rawFetch } from './fetch'
import { TransportServiceInterface } from './transport.service.interface'
import { AuthServiceInterface } from '../auth/auth.service.interface'
import { AUTH_SERVICE_TYPE } from '../auth/auth.service.type'

@injectable()
class TransportService implements TransportServiceInterface {
    constructor(@inject(AUTH_SERVICE_TYPE) private _auth: AuthServiceInterface) {}

    post(url, data: { [_: string]: string; }): Promise<object> {
        return this._send(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    get(url: string, query: { [_: string]: string; }): Promise<object> {
        return this._send(url);
    }

    private _send(url: string, options?: RequestInit): Promise<object> {
        const headers = {'Content-Type': 'application/json'};

        if (this._auth.isLoggedIn()) {
            headers['Authorization'] = this._auth.getAuthorizationHeader();
        } else if (this._auth.isExpired()) {
            return this._auth.renew()
                .then(() => this._send(url, options))
        }

        return rawFetch(url, {
            ...{ headers },
            ...options
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    const error = new Error(response.statusText);

                    error['response'] = response;
                    throw error;
                }
            })
            .then(response => response.json());
    }
}

export { TransportService };
