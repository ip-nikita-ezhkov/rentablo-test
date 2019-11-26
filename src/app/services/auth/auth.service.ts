import { injectable } from 'inversify';
import { EventEmitter } from 'events';
import { AuthServiceInterface } from './auth.service.interface'
import { AuthLoginApiInterface } from './auth-login-api.interface';
import { rawFetch } from '../transport/fetch'

@injectable()
export class AuthService implements AuthServiceInterface {
    private _tokenType: string;
    private _accessToken: string;
    private _expireAt: number;
    private _refreshToken: string;
    private _abortController: AbortController = null;

    public onChange = new EventEmitter();

    isLoggedIn(): boolean {
        return this._tokenType && this._accessToken && !this.isExpired();
    };

    isExpired(): boolean {
        return Date.now() >= this._expireAt;
    }

    isPending(): boolean {
        return this._abortController !== null;
    }

    getAuthorizationHeader(): string {
        if (!this.isLoggedIn()) {
            return null;
        }

        return `${this._tokenType} ${this._accessToken}`;
    }

    login(username:string, password:string): void {
        const requestSendTime = Date.now();
        const abortController = new AbortController();

        if (this._abortController) {
            this._abortController.abort();
        }

        this._abortController = abortController;
        this.onChange.emit(null);

        rawFetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            signal: abortController.signal,
            body: JSON.stringify({ username, password })
        })
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then((responseJSON: AuthLoginApiInterface) => {
            this._tokenType = responseJSON.token_type;
            this._accessToken = responseJSON.access_token;
            this._expireAt = requestSendTime + responseJSON.expires_in * 1000;
            this._refreshToken = responseJSON.refresh_token;

            this._abortController = null;
            this.onChange.emit(null);
        })
        .catch((error: Error) => {
            if (error.name !== 'AbortError') {
                alert(`Authorization error: ${error.message}`);
            }

            this._abortController = null;
            this.onChange.emit(null);
        });
    };

    renew(): Promise<boolean> {
        return new Promise<boolean>(resolve => resolve(true));
    }
}
