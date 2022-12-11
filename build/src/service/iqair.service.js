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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IQAirService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let IQAirService = class IQAirService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
    }
    getNearestCityAQByLongitudeAndLatitude(longitude, latitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.configService.getOrThrow('IQAIR_PROTOCOL')
                + '://' + this.configService.getOrThrow('IQAIR_BASE_URL')
                + this.configService.getOrThrow('IQAIR_NEAREST_CITY_AQ_EP_PATH')
                + '?lon=' + longitude + '&lat=' + latitude
                + '&key=' + this.configService.getOrThrow('IQAIR_API_KEY');
            const response = yield (0, rxjs_1.firstValueFrom)(this.httpService
                .get(url)
                .pipe((0, rxjs_1.map)(response => response.data)));
            return response;
        });
    }
};
IQAirService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], IQAirService);
exports.IQAirService = IQAirService;
//# sourceMappingURL=iqair.service.js.map