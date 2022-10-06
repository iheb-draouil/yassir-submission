import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import knex, { Knex } from 'knex';

import { AirQualityInfo } from 'src/definition/air-quality-info';
import { City } from 'src/definition/city';

@Injectable({ scope: Scope.REQUEST })
export class DBService {

    private readonly db: Knex;

    constructor(private readonly configService: ConfigService) {

        this.db = knex({
            client: 'mysql2',
            connection: {
                host: this.configService.getOrThrow<string>('DATABASE_HOST'),
                user: this.configService.getOrThrow<string>('DATABASE_USER'),
                password: this.configService.getOrThrow<string>('DATABASE_PASSWORD'),
                database: this.configService.getOrThrow<string>('DATABASE_NAME'),
                port: this.configService.getOrThrow<number>('DATABASE_PORT'),
            }
        });

    }

    public async getCities(): Promise<City[]> {
        return this.db.table('city');
    }

    public async saveCityAQ(
        cityName: string,
        lon: number,
        lat: number,
        aq: number,
    ) {

        const cities = await this.db.table('city')
        .where<City[]>('name', cityName);

        if (cities.length == 0) {

            await this.db.table<City>('city')
            .insert({ name: cityName, lon, lat });

        }

        const [city] = await this.db.table('city')
        .where<City[]>('name', cityName);

        await this.db.table<AirQualityInfo>('aq_info')
        .insert({ city: city.id, ts: Date.now(), aq });

    }

    public async getCityPollutionInfos(cityName: string) {

        const cities = await this.db.table('city')
        .where<City[]>('name', cityName);

        if (cities.length == 0) {
            throw new NotFoundException();
        }

        return await this.db.table('aq_info')
        .where('city', cities[0].id);

    }

}