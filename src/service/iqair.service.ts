import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';

import { IQANearestCityResponse } from 'src/definition/iqa-models';

@Injectable({ scope: Scope.REQUEST })
export class IQAirService {

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) { }

    public async getNearestCityAQByLongitudeAndLatitude(longitude: number, latitude: number) {

        const url = this.configService.getOrThrow<string>('IQAIR_PROTOCOL')
        + '://' + this.configService.getOrThrow<string>('IQAIR_BASE_URL')
        + this.configService.getOrThrow<string>('IQAIR_NEAREST_CITY_AQ_EP_PATH')
        + '?lon=' + longitude + '&lat=' + latitude
        + '&key=' + this.configService.getOrThrow<string>('IQAIR_API_KEY');

        const response = await firstValueFrom(this.httpService
            .get<IQANearestCityResponse>(url)
            .pipe(map(response => response.data))
        );

        return response;
    }

}