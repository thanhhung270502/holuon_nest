export class ResponseObject {
    private statusCode: number;
    private message: string;
    private data: Object;

    constructor(statusCode: number, message: string, data: Object) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

    public setStatusCode(value: number): void {
        this.statusCode = value;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(value: string): void {
        this.message = value;
    }

    public getData(): Object {
        return this.data;
    }

    public setData(value: Object): void {
        this.data = value;
    }
}
