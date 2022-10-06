import { BadRequestException, Injectable } from '@nestjs/common';
import { UtilService } from './util.service';

@Injectable()
export class RequestService {
    
    constructor(private readonly utilService: UtilService) { }

    public getLongitudeAndLatitudePairOrFail(query: any): [number, number] {

        const { longitude, latitude } = query;

        if (!this.utilService.isString(longitude)
            || !this.utilService.isString(latitude)
            || !this.utilService.isNumerical(longitude)
            || !this.utilService.isNumerical(latitude)) {
            throw new BadRequestException();
        }
        
        return [
            parseFloat(longitude),
            parseFloat(latitude),
        ];
        
    }

}