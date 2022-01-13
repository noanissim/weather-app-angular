import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = true;
  constructor(private userService: UserService) {}
  user: User;
  checkIsLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.user = this.userService.getUser();
      // console.log('this.user :>>', this.user);
      if (this.user) resolve(this.isLoggedIn);
      else resolve(false);
    });
  }
}
