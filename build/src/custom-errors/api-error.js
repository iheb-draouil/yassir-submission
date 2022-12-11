"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(api, path, message) {
        super(`API: ${api}, Path: ${path}, Message: ${message}`);
    }
}
exports.APIError = APIError;
//# sourceMappingURL=api-error.js.map