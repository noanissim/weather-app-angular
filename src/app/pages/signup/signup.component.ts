import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  user: User;
  name: string;
  ngOnInit(): void {
    this.user = this.userService.getUser();
    // console.log('this.user :>>', this.user);
    if (this.user) this.name = this.user.name;
  }

  onSaveUser() {
    // console.log('clicked');
    // console.log('this.user :>>', this.user);
    this.userService.signup(this.name);
    this.router.navigateByUrl('');
  }

  onSignout() {
    this.userService.signout();
    this.user = this.userService.getUser();
    this.name = '';
  }
}
