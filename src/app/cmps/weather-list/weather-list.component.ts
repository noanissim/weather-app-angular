import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Weather } from 'src/app/models/weather.model';

@Component({
  selector: 'weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss'],
})
export class WeatherListComponent implements OnInit {
  @Input() weathers: Weather[];
  @Output() onRemove = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
}
