"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const main_controller_1 = require("./controller/main.controller");
const request_service_1 = require("./service/request.service");
const database_service_1 = require("./service/database.service");
const iqair_service_1 = require("./service/iqair.service");
const util_service_1 = require("./service/util.service");
const aq_service_1 = require("./service/aq.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            axios_1.HttpModule.register({ timeout: 5000 }),
        ],
        controllers: [main_controller_1.MainController],
        providers: [
            request_service_1.RequestService,
            iqair_service_1.IQAirService,
            util_service_1.UtilService,
            aq_service_1.AQService,
            database_service_1.DBService,
            common_1.Logger,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map