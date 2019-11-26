import { EventEmitter } from "events";

export interface AuthServiceInterface {
    onChange: EventEmitter;

    isLoggedIn(): boolean;
    isExpired(): boolean;
    isPending(): boolean;

    getAuthorizationHeader(): string;

    login(username: string, password: string): void;

    renew(): Promise<boolean>;
}

