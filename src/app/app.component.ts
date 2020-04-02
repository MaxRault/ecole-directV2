import { Component } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecole-directV2';
  constructor() {
    const config = {
      apiKey: 'AIzaSyAFUKZ3QXb0_HSECRKOqh112efVbvE0mWQ',
      authDomain: 'ecole-directv2.firebaseapp.com',
      databaseURL: 'https://ecole-directv2.firebaseio.com',
      projectId: 'ecole-directv2',
      storageBucket: 'ecole-directv2.appspot.com',
      messagingSenderId: '112279931168',
      appId: '1:112279931168:web:946419820a148c31496f45'
    };
    firebase.initializeApp(config);
  }
}
