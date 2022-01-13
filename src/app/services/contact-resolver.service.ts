import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Weather } from '../models/weather.model';
import { WeatherService } from './weather.service';
import { interval, lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WeatherResolverService implements Resolve<Promise<Weather>> {
  constructor(private weatherService: WeatherService) {}

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id;
    const weather = await lastValueFrom(
      await this.weatherService.getWeatherById(id)
    );
    return weather;
  }
}
