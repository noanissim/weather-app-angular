import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { Contact } from '../models/weather.model';
// import { ContactFilter } from '../models/weather-filter.model';
import { User } from '../models/user.model';
import { ThisReceiver } from '@angular/compiler';
import { StorageService } from './storageService';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private STORAGE_KEY = 'user';

  public async getRate(coins: number) {
    const ans = this.storageService.load('btc');
    if (ans) return of(ans);
    return this.http
      .get<{ answer: any }>(
        `https://blockchain.info/tobtc?currency=USD&value=${coins}`
      )
      .pipe(
        map((res) => {
          this.storageService.store('btc', res);
          return res;
        })
      );
  }

  public async getMarketPrice() {
    const url = `https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true`;
    try {
      //  const res = await axios.get(url)
      //  return res.data.values
      return this.http.get(url).pipe(
        map((res) => {
          console.log('res', res);
          return res;
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  public async getConfirmedTransactions() {
    const url = `https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`;
    try {
      return this.http.get<{ answer: any }>(url).pipe(
        map((res) => {
          console.log('res', res);
          return res;
        })
      );
    } catch (err) {
      console.log(err);
    }
  }
}
