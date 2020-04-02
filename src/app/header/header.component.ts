import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserData } from '../../data/user'
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
        console.log(UserData)
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}