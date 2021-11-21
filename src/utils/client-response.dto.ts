export class ClientResponse<T>{
    constructor(){
        this.data = null;
        this.error = null;
    }
    statusCode: number;
    error: string;
    data:  T;
}