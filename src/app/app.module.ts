import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
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

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'notes', canActivate: [AuthGuardService], component: NoteListComponent },
  { path: 'notes/new', canActivate: [AuthGuardService], component: NoteFormComponent },
  { path: 'notes/view/:id', canActivate: [AuthGuardService], component: SingleNoteComponent },
  { path: 'users', canActivate: [AuthGuardService], component: UserListComponent },
  { path: 'users/new', canActivate: [AuthGuardService], component: UserFormComponent },
  { path: 'users/view/:id', canActivate: [AuthGuardService], component: SingleUserComponent },
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: '**', redirectTo: 'notes' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    NoteListComponent,
    SingleNoteComponent,
    NoteFormComponent,
    UserListComponent,
    UserFormComponent,
    SingleUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, NoteService, UserService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
