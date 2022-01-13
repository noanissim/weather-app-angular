import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
// import { AboutComponent } from './pages/about/about.component';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { WeatherAppComponent } from './pages/weather-app/weather-app.component';
// import { WeatherResolverService } from './services/weather-resolver.service';
import { SignupComponent } from './pages/signup/signup.component';
const routes: Routes = [
  // {
  //   path: 'weather/edit/:id',
  //   component: WeatherEditComponent,
  //   resolve: { weather: WeatherResolverService },
  // },
  // {
  //   path: 'weather/edit',
  //   component: WeatherEditComponent,
  //   resolve: { weather: WeatherResolverService },
  // },
  // {
  //   path: 'weather/:id',
  //   component: WeatherDetailsComponent,
  //   resolve: { weather: WeatherResolverService },
  //   canActivate: [AuthGuard],
  // },
  // { path: 'weather', component: WeatherAppComponent },
  {
    path: 'weather',
    component: WeatherAppComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '',
    component: HomepageComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
