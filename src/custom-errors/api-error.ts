export class APIError extends Error {
    constructor(api: string, path: string, message: string) {
        super(`API: ${api}, Path: ${path}, Message: ${message}`);
    }
}