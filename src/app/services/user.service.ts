import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/User.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {
    this.getUserData();
}
  user: User[] = [];
  userSubject = new Subject<User[]>();

  emitUser() {
    this.userSubject.next(this.user);
  }

  saveUser() {
    firebase.database().ref('/users').set(this.user);
  }

  getUserData() {
    firebase.database().ref('/users')
      .on('value', (data: DataSnapshot) => {
          this.user = data.val() ? data.val() : [];
          this.emitUser();
        }
      );
  }

  getSingleUser(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewUser(newUser: User) {
    this.user.push(newUser);
    this.saveUser();
    this.emitUser();
  }

  removeUser(user: User) {
    const userIndexToRemove = this.user.findIndex(
      (userEl) => {
        if(userEl === user) {
          return true;
        }
      }
    );
    this.user.splice(userIndexToRemove, 1);
    this.saveUser();
    this.emitUser();
  }
}
