export interface TransportServiceInterface {
    post(url:string, data: { [_: string]: string; }): Promise<object>;
    get(url: string, query: { [_: string]: string; }): Promise<object>;
}
