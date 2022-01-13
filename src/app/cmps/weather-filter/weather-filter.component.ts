import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherFilter } from 'src/app/models/weather-filter.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'weather-filter',
  templateUrl: './weather-filter.component.html',
  styleUrls: ['./weather-filter.component.scss'],
})
export class WeatherFilterComponent implements OnInit {
  filterBy: WeatherFilter;
  subscription: Subscription;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.subscription = this.weatherService.filterBy$.subscribe((filterBy) => {
      this.filterBy = filterBy;
    });
  }

  async onSetFilter() {
    console.log('this.filterBy :>>', this.filterBy);
    await this.weatherService.setFilter({ ...this.filterBy });
  }
}
