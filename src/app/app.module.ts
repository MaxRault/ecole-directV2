import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { NoteListComponent } from './note-list/note-list.component';
import { SingleNoteComponent } from './note-list/single-note/single-note.component';
import { NoteFormComponent } from './note-list/note-form/note-form.component';
import { AuthService } from './services/auth.service';
import { NoteService } from './services/note.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-list/user-form/user-form.component';
import { SingleUserComponent } from './user-list/single-user/single-user.component';
import { UserService } from './services/user.service';
import { ListEtablissementComponent } from './list-etablissement/list-etablissement.component';
import { SimpleEtablissementComponent } from './list-etablissement/simple-etablissement/simple-etablissement.component';
import { EtablissementFormComponent } from './list-etablissement/etablissement-form/etablissement-form.component';
import { EtablissemnentService } from './services/etablissemnent.service';
import { SimpleFormationComponent } from './list-etablissement/simple-etablissement/simple-formation/simple-formation.component';
import { FormationFormComponent } from './list-etablissement/etablissement-form/formation-form/formation-form.component';
import { ListFormationComponent } from './list-etablissement/list-formation/list-formation.component';
import { MatiereFormComponent } from './list-etablissement/etablissement-form/matiere-form/matiere-form.component';
import { ListMatieresComponent } from './list-etablissement/list-matieres/list-matieres.component';
import { SimpleMatiereComponent } from './list-etablissement/simple-etablissement/simple-matiere/simple-matiere.component';
import { ListProfesseurComponent } from './list-etablissement/list-professeur/list-professeur.component';
import { SimpleProfesseurComponent } from './list-etablissement/simple-etablissement/simple-professeur/simple-professeur.component';
import { ProfesseurFormComponent } from './list-etablissement/etablissement-form/professeur-form/professeur-form.component';
import { ListEtudiantComponent } from './list-etablissement/list-etudiant/list-etudiant.component';
import { EtudiantFormComponent } from './list-etablissement/etablissement-form/etudiant-form/etudiant-form.component';
import { SimpleEtudiantComponent } from './list-etablissement/simple-etablissement/simple-etudiant/simple-etudiant.component';

const appRoutes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'notes', canActivate: [AuthGuardService], component: NoteListComponent },
  { path: 'notes/new', canActivate: [AuthGuardService], component: NoteFormComponent },
  { path: 'notes/view/:id', canActivate: [AuthGuardService], component: SingleNoteComponent },
  { path: 'users', canActivate: [AuthGuardService], component: UserListComponent },
  { path: 'users/new', canActivate: [AuthGuardService], component: UserFormComponent },
  { path: 'users/view/:id', canActivate: [AuthGuardService], component: SingleUserComponent },
  { path: 'etablissement', canActivate: [AuthGuardService], component: ListEtablissementComponent },
  { path: 'etablissement/new', canActivate: [AuthGuardService], component: EtablissementFormComponent },
  { path: 'etablissement/view/:id', canActivate: [AuthGuardService], component: SimpleEtablissementComponent },
  { path: 'etablissement/view/:id/new', canActivate: [AuthGuardService], component: FormationFormComponent },
  { path: 'etablissement/view/:id/formationview/:idformation', canActivate: [AuthGuardService], component: SimpleFormationComponent },
  { path: 'etablissement/view/:id/formationview/:idformation/new', canActivate: [AuthGuardService], component: MatiereFormComponent },
  { path: 'etablissement/view/:id/formationview/:idformation/matiereview/:idmatiere', canActivate: [AuthGuardService], component: SimpleMatiereComponent },
  { path: 'etablissement/view/:id/formationview/:idformation/professeur/new', canActivate: [AuthGuardService], component: ProfesseurFormComponent },
  { path: 'etablissement/view/:id/formationview/:idformation/professeurview/:idprofesseur', canActivate: [AuthGuardService], component: SimpleProfesseurComponent },
  { path: 'etablissement/view/:id/formationview/:idformation/etudiant/new', canActivate: [AuthGuardService], component: EtudiantFormComponent },
  { path: 'etablissement/view/:id/formationview/:idformation/etudiantview/:idetudiant', canActivate: [AuthGuardService], component: SimpleEtudiantComponent },
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: '**', redirectTo: 'notes' }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    NoteListComponent,
    SingleNoteComponent,
    NoteFormComponent,
    UserListComponent,
    UserFormComponent,
    SingleUserComponent,
    ListEtablissementComponent,
    SimpleEtablissementComponent,
    EtablissementFormComponent,
    SimpleFormationComponent,
    FormationFormComponent,
    ListFormationComponent,
    MatiereFormComponent,
    ListMatieresComponent,
    SimpleMatiereComponent,
    ListProfesseurComponent,
    SimpleProfesseurComponent,
    ProfesseurFormComponent,
    ListEtudiantComponent,
    EtudiantFormComponent,
    SimpleEtudiantComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, NoteService, UserService, EtablissemnentService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
