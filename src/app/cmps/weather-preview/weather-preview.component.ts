import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Weather } from 'src/app/models/weather.model';

@Component({
  selector: 'weather-preview',
  templateUrl: './weather-preview.component.html',
  styleUrls: ['./weather-preview.component.scss'],
})
export class WeatherPreviewComponent implements OnInit {
  @Input() weather: Weather;
  @Output() onRemove = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
}
