import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserData } from '../../../data/user';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }
  fetchData: UserData[] = [] ;
  userData: UserData;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      ets: ['', [Validators.required]]
    });
  }

  getUserData(id: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('users/notes/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
    var ref = firebase.database().ref('/users');
    ref.orderByChild('mail').equalTo(id).on('value', (data: DataSnapshot) => {
    this.fetchData = data.val() ? data.val() : [];
    var index = this.fetchData.length;
    console.log('fetch === ', data.numChildren())
    console.log('userData === ', this.fetchData)
    const droit = this.fetchData[this.fetchData.length - 1].droit;
    const mail = this.fetchData[this.fetchData.length - 1].mail;
    const nom = this.fetchData[this.fetchData.length - 1].nom;
    const prenom = this.fetchData[this.fetchData.length - 1].prenom;
    const newUserData = new UserData(nom, prenom);
    newUserData.droit = droit;
    newUserData.mail = mail;
    console.log('signin === ', newUserData);
});
  }

  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    const ets = this.signInForm.get('ets').value;
    this.authService.signInUser(email, password).then(
      () => {
        this.getUserData(email);
        this.router.navigate(['/notes']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
