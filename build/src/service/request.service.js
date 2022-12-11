"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = void 0;
const common_1 = require("@nestjs/common");
const util_service_1 = require("./util.service");
let RequestService = class RequestService {
    constructor(utilService) {
        this.utilService = utilService;
    }
    getLongitudeAndLatitudePairOrFail(query) {
        const { longitude, latitude } = query;
        if (!this.utilService.isString(longitude)
            || !this.utilService.isString(latitude)
            || !this.utilService.isNumerical(longitude)
            || !this.utilService.isNumerical(latitude)) {
            throw new common_1.BadRequestException();
        }
        return [
            parseFloat(longitude),
            parseFloat(latitude),
        ];
    }
};
RequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [util_service_1.UtilService])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map