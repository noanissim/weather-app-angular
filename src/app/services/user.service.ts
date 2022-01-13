import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../models/weather.model';
import { WeatherFilter } from '../models/weather-filter.model';
import { User } from '../models/user.model';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private STORAGE_KEY = 'user';

  private store(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  private load(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
  }
  private _user$ = new BehaviorSubject<User>(null);
  public user$ = this._user$.asObservable();

  public signup(name) {
    const user = this.getEmptyUser();
    // user['name'] = name;
    user.name = name;
    this.store(this.STORAGE_KEY, user);
    // console.log('user :>>', user);
    this._user$.next(user);
    return user;
  }

  public signout() {
    this.store(this.STORAGE_KEY, '');
    this._user$.next(null);
  }

  public getEmptyUser() {
    const newUser = new User();
    newUser.setId();
    newUser.name = '';
    newUser.coins = 100;
    newUser.places = [];
    return newUser;
  }

  public getUser() {
    // const newUser = new User();
    // newUser.setId();
    // newUser.name = 'Ochoa Hyde';
    // newUser.coins = 100;
    // newUser.moves = [];
    // this._user$.push(newUser)
    // this._user$.next(newUser)
    // return of({newUser})
    const user = this.load(this.STORAGE_KEY);
    if (!user) return '';
    this._user$.next(user);
    return user;
  }

  public async addMove(weatherName, amount) {
    console.log('weatherName, amount :>>', weatherName, amount);
    let currUser = this.getUser();
    console.log('currUser :>>', currUser);
    let weather: Weather = {
      name: '215854',
      date: '2022-01-13T19:00:00+02:00',
      desc: 'Rain',
      temp: 66,
      more: '"http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sun.svg/2048px-Sun.svg.png',
      key: 215854,
    };
    console.log('move', weather);
    // move.to = weatherId;
    // move.amount = amount;
    // move.from = currUser._id;
    // move.at = new Date();
    console.log('move', weather);
    currUser.moves.push(weather);
    await this.saveUser(currUser);
  }

  public async saveUser(user) {
    console.log(user);
    if (user._id) {
      this.store(this.STORAGE_KEY, user);
      this._user$.next(user);
    }

    return user;
  }
}
