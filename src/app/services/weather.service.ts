import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  of,
  throwError,
  lastValueFrom,
  Subscription,
  firstValueFrom,
} from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../models/weather.model';
import { WeatherFilter } from '../models/weather-filter.model';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const WEATHERS = [
  {
    _id: '5a56640269f443a5d64b32ca',
    name: '215854',
    date: '2022-01-13T19:00:00+02:00',
    desc: 'Rain',
    temp: 66,
    more: '"http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sun.svg/2048px-Sun.svg.png',
  },
  {
    _id: '5a56640269f443a5d64b32cb',
    name: '215854',
    date: '2022-01-13T19:00:00+02:00',
    desc: 'Rain',
    temp: 66,
    more: '"http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sun.svg/2048px-Sun.svg.png',
  },
  {
    _id: '5a56640269f443a5d64b32cc',
    name: '215854',
    date: '2022-01-13T19:00:00+02:00',
    desc: 'Rain',
    temp: 66,
    more: '"http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sun.svg/2048px-Sun.svg.png',
  },
  {
    _id: '5a56640269f443a5d64b32cd',
    name: '215854',
    date: '2022-01-13T19:00:00+02:00',
    desc: 'Rain',
    temp: 66,
    more: '"http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"',
    imgUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sun.svg/2048px-Sun.svg.png',
  },
];

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  //mock the server
  private _weathersDb: Weather[];

  private subscription: Subscription;

  private _weathers$ = new BehaviorSubject<Weather[]>([]);
  public weathers$ = this._weathers$.asObservable();

  private _filterBy$ = new BehaviorSubject<WeatherFilter>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable();

  constructor(private http: HttpClient) {}

  public getDefualtWeather(locKey: any): Observable<any> {
    const ans = this.load('weathers');
    if (ans) {
      console.log('loaded from cache', ans);
      return of(ans);
    } else {
      return this.http
        .get<{ answer: any }>(
          `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locKey}?apikey=4X8DGMp86wMojURGrA8YjHl4HHyyF883`
        )
        .pipe(
          map((res) => {
            console.log('res', res);
            this.store('weathers', res);

            return res;
          })
        );
    }
  }

  public async getSearchWeather(locWord: any): Promise<string> {
    console.log('locWord :>>', locWord);
    const ans = this.load('currSearch');
    if (ans && ans.name.toLowerCase() === locWord.toLowerCase()) {
      console.log('key loaded from cache', ans);
      return Promise.resolve(ans.key);
    } else {
      const ans2 = await firstValueFrom(
        this.http.get<{ answer: any }>(
          `https://dataservice.accuweather.com//locations/v1/cities/search?apikey=4X8DGMp86wMojURGrA8YjHl4HHyyF883&q=${locWord}`
        )
      );
      console.log('ans2', ans2);
      this.store('currSearch', {
        name: ans2[0].LocalizedName,
        key: ans2[0].Key,
      });
      return ans2[0].Key;
    }
    // .pipe(
    //   map((res) => {
    //     this.store('currSearch', {name: res[0].LocalizedName, key:res[0].Key});
    //     return res[0].Key
    //   })
    // );
  }

  private store(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  private load(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
  }
  private async _loadWeathers(locKey) {
    const ans = this.load('currSearch');
    await this.getDefualtWeather(locKey).subscribe((w) => {
      console.log('w', w);
      // this._weathersDb = JSON.parse(JSON.stringify(w.DailyForecasts));
      this._weathersDb = w.DailyForecasts.map((day, idx) => {
        let newWeather2 = new Weather() as Weather;
        // console.log('newWeather2 :>>', newWeather2);
        newWeather2.name = ans.name;
        newWeather2.date = day.Date.substring(0, 10);
        newWeather2.desc =
          day.Day.PrecipitationIntensity || day.Day.PrecipitationType
            ? day.Day?.PrecipitationIntensity + ' ' + day.Day?.PrecipitationType
            : day.Day.IconPhrase;
        newWeather2.temp = day.Temperature.Maximum.Value;
        newWeather2.more = day.Link;
        newWeather2.imgUrl = day.Day.Icon + '';
        newWeather2.key = locKey;
        newWeather2._id = day.EpochDate + '';
        // console.log('newWeather2 :>>', newWeather2);
        return newWeather2;
      });
    });
    // weathers = this.load('weathers');
    // console.log('weathers DB :>>', this._weathersDb);

    // if (!weathers || !weathers.length) weathers = await this.getDefualtWeather;
    // this.store('weathers', weathers);
    return this._weathersDb;
  }

  public async loadWeathers(): Promise<any> {
    const filterBy = this._filterBy$.getValue();
    // const key = await this.getSearchWeather(filterBy.term);
    // console.log('key :>>', key);
    // let weathers = this._weathersDb;
    let weathers = await this._loadWeathers(filterBy.term);
    console.log('weathers :>>', weathers);
    // if (filterBy && filterBy.term) {
    //   weathers = this._filter(weathers, filterBy.term);
    // }
    // this._weathers$.next(this._sort(weathers));
    this._weathers$.next(weathers);
  }

  public async setFilter(filterBy) {
    console.log('filterBy :>>', filterBy);
    const ans = await this.getSearchWeather(filterBy.term);
    console.log('ans', ans);
    this._filterBy$.next({ term: ans });
    let weathers = await this._loadWeathers(ans);
    this._weathers$.next(weathers);
  }

  public getWeatherById(id: string): Observable<Weather> {
    //mock the server work
    const weather = this._weathersDb.find((weather) => weather._id === id);
    return of({ ...weather }).pipe(delay(0));
    //return an observable
    // return weather ? of(weather) : Observable.throwError(`Weather id ${id} not found!`)
    // return weather ? of(weather) : ErrorObservable.create(`Weather id ${id} not found!`)
    // return weather
    //   ? of(weather)
    //   : throwError(new Error(`Weather id ${id} not found!`));
  }

  public deleteWeather(id: string) {
    //mock the server work
    this._weathersDb = this._weathersDb.filter((weather) => weather._id !== id);

    // change the observable data in the service - let all the subscribers know
    this._weathers$.next(this._weathersDb);
    this.store('weathers', this._weathersDb);
  }

  public saveWeather(weather: Weather) {
    return weather._id
      ? this._updateWeather(weather)
      : this._addWeather(weather);
  }

  private _updateWeather(weather: Weather) {
    //mock the server work
    this._weathersDb = this._weathersDb.map((c) =>
      weather._id === c._id ? weather : c
    );
    // change the observable data in the service - let all the subscribers know
    this._weathers$.next(this._sort(this._weathersDb));
    this.store('weathers', this._weathersDb);
    return of(weather);
  }

  private async _addWeather(weather: Weather) {
    //mock the server work
    const newWeather = new Weather(weather.name);
    newWeather.setId();

    this._weathersDb.push(newWeather);
    this._weathers$.next(this._sort(this._weathersDb));
    this.store('weathers', this._weathersDb);
    return of(weather);
  }

  private _sort(weathers: Weather[]): Weather[] {
    return weathers.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    });
  }

  public getEmptyWeather() {
    return { name: '' };
  }

  private _filter(weathers, term) {
    term = term.toLocaleLowerCase();
    return weathers.filter((weather) => {
      return weather.name.toLocaleLowerCase().includes(term);
    });
  }
}
