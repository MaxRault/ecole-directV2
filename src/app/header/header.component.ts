import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  userData: User;
  usersSubscription: Subscription;

  constructor(private authService: AuthService, private usersService: UserService) { }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
          if (this.isAuth === true) {
            console.log('before getData');
            this.usersService.getData().then( () => {
              this.usersSubscription = this.usersService.userDataSubject.subscribe(
                (data: User) => {
                  this.userData = data;
                }
              );
              this.usersService.emitUserData();
              console.log('header === ', this.userData);
            }
            );
          }
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}