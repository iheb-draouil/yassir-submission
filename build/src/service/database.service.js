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
exports.DBService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const knex_1 = require("knex");
let DBService = class DBService {
    constructor(configService) {
        this.configService = configService;
        this.db = (0, knex_1.default)({
            client: 'mysql2',
            connection: {
                host: this.configService.getOrThrow('DATABASE_HOST'),
                user: this.configService.getOrThrow('DATABASE_USER'),
                password: this.configService.getOrThrow('DATABASE_PASSWORD'),
                database: this.configService.getOrThrow('DATABASE_NAME'),
                port: this.configService.getOrThrow('DATABASE_PORT'),
            }
        });
    }
    getCities() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.table('city');
        });
    }
    saveCityAQ(cityName, lon, lat, aq) {
        return __awaiter(this, void 0, void 0, function* () {
            const cities = yield this.db.table('city')
                .where('name', cityName);
            if (cities.length == 0) {
                yield this.db.table('city')
                    .insert({ name: cityName, lon, lat });
            }
            const [city] = yield this.db.table('city')
                .where('name', cityName);
            yield this.db.table('aq_info')
                .insert({ city: city.id, ts: Date.now(), aq });
        });
    }
    getCityPollutionInfos(cityName) {
        return __awaiter(this, void 0, void 0, function* () {
            const cities = yield this.db.table('city')
                .where('name', cityName);
            if (cities.length == 0) {
                throw new common_1.NotFoundException();
            }
            return yield this.db.table('aq_info')
                .where('city', cities[0].id);
        });
    }
};
DBService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DBService);
exports.DBService = DBService;
//# sourceMappingURL=database.service.js.map