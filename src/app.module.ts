import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpModule } from '@nestjs/axios';

import { MainController } from './controller/main.controller';
import { RequestService } from './service/request.service';
import { DBService } from 'src/service/database.service';
import { IQAirService } from './service/iqair.service';
import { UtilService } from './service/util.service';
import { AQService } from './service/aq.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpModule.register({ timeout: 5000 }),
    ],
    controllers: [MainController],
    providers: [
        RequestService,
        IQAirService,
        UtilService,
        AQService,
        DBService,
        Logger,
    ],
})

export class AppModule { }
