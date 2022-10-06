export interface Location {
    type: string;
    coordinates: [number, number];
}

export interface PollutionInfo {
    ts: string;
    aqius: number;
    mainus: string;
    aqicn: number;
    maincn: string;
}

export interface WeatherInfo {
    ts: string;
    tp: number;
    pr: number;
    hu: number;
    ws: number;
    wd: number;
    ic: string;
}

export interface IQAResponse<T> {
    status: string;
    data: T;
}

export type IQANearestCityResponse = IQAResponse<{
    city: string;
    state: string;
    country: string;
    location: Location;
    current: {
        pollution: PollutionInfo;
        weather: WeatherInfo;
    }
}>