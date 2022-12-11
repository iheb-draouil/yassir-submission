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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.MainController = void 0;
const common_1 = require("@nestjs/common");
const request_service_1 = require("../service/request.service");
const database_service_1 = require("../service/database.service");
const iqair_service_1 = require("../service/iqair.service");
const util_service_1 = require("../service/util.service");
const aq_service_1 = require("../service/aq.service");
let MainController = class MainController {
    constructor(requestService, iqAirService, utilService, aqService, dbService) {
        this.requestService = requestService;
        this.iqAirService = iqAirService;
        this.utilService = utilService;
        this.aqService = aqService;
        this.dbService = dbService;
    }
    getNearestCityAirQuality(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.iqAirService
                .getNearestCityAQByLongitudeAndLatitude(...this.requestService.getLongitudeAndLatitudePairOrFail(request.query));
            return { result: { pollution: data.current.pollution } };
        });
    }
    registerCityAQ(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const [longitude, latitude] = this.requestService
                .getLongitudeAndLatitudePairOrFail(request.query);
            const { data: { city, current } } = yield this.iqAirService
                .getNearestCityAQByLongitudeAndLatitude(longitude, latitude);
            yield this.dbService
                .saveCityAQ(city, longitude, latitude, current.pollution.aqius);
            return { result: 'done' };
        });
    }
    getCities() {
        return __awaiter(this, void 0, void 0, function* () {
            return { result: yield this.dbService.getCities() };
        });
    }
    getCityMaxPollutionDateTime(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityName = request.query.cityName;
            if (!this.utilService.isString(cityName)) {
                throw new common_1.BadRequestException();
            }
            const peakPollutionInfo = this.aqService.calculateCityPeakPollutionDateTime(yield this.dbService.getCityPollutionInfos(cityName));
            if (!peakPollutionInfo) {
                return { result: 'no-air-quality-informations-found' };
            }
            return { result: (new Date(peakPollutionInfo.ts)).toISOString() };
        });
    }
};
__decorate([
    (0, common_1.Get)('/nearest-city-aq'),
    (0, common_1.Header)('content-type', 'application/json'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getNearestCityAirQuality", null);
__decorate([
    (0, common_1.Post)('/register-city-aq'),
    (0, common_1.Header)('content-type', 'application/json'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "registerCityAQ", null);
__decorate([
    (0, common_1.Get)('/cities'),
    (0, common_1.Header)('content-type', 'application/json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getCities", null);
__decorate([
    (0, common_1.Get)('/city-peak-pollution-datetime'),
    (0, common_1.Header)('content-type', 'application/json'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getCityMaxPollutionDateTime", null);
MainController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [request_service_1.RequestService,
        iqair_service_1.IQAirService,
        util_service_1.UtilService,
        aq_service_1.AQService,
        database_service_1.DBService])
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map