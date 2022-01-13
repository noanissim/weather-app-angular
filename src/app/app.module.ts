import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { WeatherAppComponent } from './pages/weather-app/weather-app.component';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { WeatherListComponent } from './cmps/weather-list/weather-list.component';
import { WeatherPreviewComponent } from './cmps/weather-preview/weather-preview.component';
import { WeatherFilterComponent } from './cmps/weather-filter/weather-filter.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { DateDescPipe } from './pipes/date-desc.pipe';
// import { FilterArrPipe } from './pipes/filter-arr.pipe';
// import { FetchDataPipe } from './pipes/fetch-data.pipe';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherAppComponent,
    HomepageComponent,
    WeatherListComponent,
    WeatherPreviewComponent,
    WeatherFilterComponent,
    AppHeaderComponent,

    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // MDBBootstrapModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
