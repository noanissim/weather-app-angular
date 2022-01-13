import { Component, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom, Observable, Subscription } from 'rxjs';
import { Weather } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss'],
})
export class WeatherAppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  weathers: Weather[];
  weathers$: Observable<Weather[]>;
  subscription: Subscription;
  imgUrl: string;

  async ngOnInit(): Promise<void> {
    await this.weatherService.loadWeathers();
    this.weathers$ = this.weatherService.weathers$;
  }

  onRemoveWeather(weatherId: string) {
    this.weatherService.deleteWeather(weatherId);
  }
}
