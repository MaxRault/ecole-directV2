import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  post: string;
constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router) { }


ngOnInit() {
    this.initForm();
    this.setUserCategoryValidators();
  }


  setUserCategoryValidators() {
    const matiere = this.userForm.get('matieres');
    const formation = this.userForm.get('formation');
    const post = this.userForm.get('post');

    this.userForm.get('droit').valueChanges
      .subscribe(userCategory => {
        console.log(this.userForm.get('droit').value)
        if (userCategory === 'Admin') {
          post.setValidators([Validators.required]);
          formation.setValidators(null);
          matiere.setValidators(null);
        }

        if (userCategory === 'Professeur') {
          post.setValidators(null);
          formation.setValidators([Validators.required]);
          matiere.setValidators([Validators.required]);
        }

        if (userCategory === 'Etudiant') {
          post.setValidators(null);
          formation.setValidators([Validators.required]);
          matiere.setValidators(null);
        }

        matiere.updateValueAndValidity();
        formation.updateValueAndValidity();
        post.updateValueAndValidity();
      });
  }

getDataStatus() {
  return this.post;
}

initForm() {

    this.userForm = this.formBuilder.group({
      post: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      droit: ['', Validators.required],
      mail:  ['', [Validators.required, Validators.email]],
      matieres: ['', Validators.required],
      formation: ['',Validators.required],
      password:  ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  
onSaveUser() {
    const nom = this.userForm.get('nom').value;
    const prenom = this.userForm.get('prenom').value;
    let droit = this.userForm.get('droit').value;
    const mail = this.userForm.get('mail').value;
    const password = this.userForm.get('password').value;
    const newUser = new User(nom, prenom, droit, mail, password);
    const matieres = this.userForm.get('matieres').value;
    const formation = this.userForm.get('formation').value;
    const post = this.userForm.get('post').value;
    if (this.post === 'Admin') {
      newUser.post = post;
    }
    if (this.post === 'Professeur') {
      newUser.matieres = matieres;
      newUser.formation = formation;
    }
    if (this.post === 'Etudiant') {
      newUser.formation = formation;
    }
    this.userService.createNewUser(newUser);
    this.router.navigate(['/users']);
  }
}
