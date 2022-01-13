import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { BitcoinService } from 'src/app/services/bitcoin.service';
@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: User;
  btc: any;

  async ngOnInit(): Promise<void> {
    // this.user = this.userService.getUser();
    // this.btc = await this.bitcoinService.getRate(this.user.coins || 0);
  }
}
