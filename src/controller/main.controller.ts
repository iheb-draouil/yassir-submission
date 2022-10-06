import { BadRequestException, Controller, Get, Header, Logger, Post, Req } from '@nestjs/common';

import { Request } from 'express';

import { RequestService } from 'src/service/request.service';
import { DBService } from 'src/service/database.service';
import { IQAirService } from 'src/service/iqair.service';
import { UtilService } from 'src/service/util.service';
import { AQService } from 'src/service/aq.service';

@Controller()
export class MainController {

    constructor(
        private readonly requestService: RequestService,
        private readonly iqAirService: IQAirService,
        private readonly utilService: UtilService,
        private readonly aqService: AQService,
        private readonly dbService: DBService,
    ) { }

    @Get('/nearest-city-aq')
    @Header('content-type', 'application/json')
    public async getNearestCityAirQuality(@Req() request: Request) {

        const { data } = await this
        .iqAirService
        .getNearestCityAQByLongitudeAndLatitude(
            ...this.requestService.getLongitudeAndLatitudePairOrFail(request.query)
        );

        return { result: { pollution: data.current.pollution } };
    }

    @Post('/register-city-aq')
    @Header('content-type', 'application/json')
    public async registerCityAQ(@Req() request: Request) {

        const [longitude, latitude] = this.requestService.getLongitudeAndLatitudePairOrFail(request.query);

        const { data: { city, current } } = await this
        .iqAirService
        .getNearestCityAQByLongitudeAndLatitude(longitude, latitude);

        await this.dbService
        .saveCityAQ(city, longitude, latitude, current.pollution.aqius);

        return { result: 'done' };
    }

    @Get('/city')
    @Header('content-type', 'application/json')
    public async getCities(@Req() request: Request) {

        return {
            result: await this
            .dbService
            .getCities()
        };

    }

    @Get('/city-peak-pollution-datetime')
    @Header('content-type', 'application/json')
    public async getCityMaxPollutionDateTime(@Req() request: Request) {

        const cityName = request.query.cityName;

        if (!this.utilService.isString(cityName)) {
            throw new BadRequestException();
        }
        
        const peakPollutionInfo = this.aqService.calculateCityPeakPollutionDateTime(
            await this.dbService.getCityPollutionInfos(cityName)
        );

        if (!peakPollutionInfo) {
            return { result: 'no-air-quality-informations-found' };
        }

        return { result: (new Date(peakPollutionInfo.ts)).toISOString() }
    }

}