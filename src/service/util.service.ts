import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {

    public static NumericalRegex = /[0-9]+/;

    public isString(input: any): input is string {
        return typeof(input) == 'string';
    }
    
    public isNumerical(input: string): input is string {
        return UtilService.NumericalRegex.test(input);
    }

}