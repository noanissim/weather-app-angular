import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { lastValueFrom, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  @Output() onSelectPage = new EventEmitter<string>();

  constructor(private userService: UserService) {}
  user: User;
  // user$: Observable<User>;
  subscription: Subscription;

  name: string = '';
  coins: number = null;
  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.name = user.name;
        this.coins = user.coins;
      }
    });
    // this.user$ = this.userService.user$
  }

  linkClicked(ev) {
    console.log('ev', ev.target.innerText);
    this.onSelectPage.emit(ev.target.innerText);
  }
}
