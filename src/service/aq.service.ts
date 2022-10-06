import { Injectable, Scope } from '@nestjs/common';
import { AirQualityInfo } from 'src/definition/air-quality-info';

@Injectable({ scope: Scope.REQUEST })
export class AQService {

    public calculateCityPeakPollutionDateTime(aqInfos: AirQualityInfo[]) {
        return aqInfos
        .sort((a, b) => (b.aq - a.aq) == 0 ? 0 : (b.aq - a.aq) / Math.abs(a.aq - b.aq))
        .at(0);
    }

}