import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPreviewComponent } from './weather-preview.component';

describe('WeatherPreviewComponent', () => {
  let component: WeatherPreviewComponent;
  let fixture: ComponentFixture<WeatherPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherPreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
