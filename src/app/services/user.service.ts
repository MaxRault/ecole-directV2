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
  user: User[];
  fetchData: User[] = [];
  userData: User;
  userSubject = new Subject<User[]>();
  userDataSubject = new Subject<User>();

  emitUser() {
    this.userSubject.next(this.user);
  }

  emitUserData() {
    this.userDataSubject.next(this.userData);
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
  
  getData() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users').orderByChild('mail').equalTo(firebase.auth().currentUser.email).once('value').then(
          (data: DataSnapshot) => {
           this.fetchData.push(data.val());
           resolve(this.userData);
           for (let i = 0; this.fetchData[0][i] !== firebase.auth().currentUser.email; i++) {
              if (this.fetchData[0][i] === undefined) {
                // tslint:disable-next-line: no-unused-expression
                this.fetchData[0][i + 1];
              } else {
                this.userData = this.fetchData[0][i];
                console.log('in Signin', this.userData);
                this.emitUserData();
                break;
              }
            }
          }, (error) => {
            reject(error);
          }
        );
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
