import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  usersSubscription: Subscription;

  constructor(private usersService: UserService, private router: Router) {}

  ngOnInit() {
    this.usersSubscription = this.usersService.userSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.usersService.emitUser();
  }

  onNewUser() {
    this.router.navigate(['/users', 'new']);
  }

  onDeleteUser(user: User) {
    this.usersService.removeUser(user);
  }

  onViewUser(id: number) {
    this.router.navigate(['/users', 'view', id]);
  }
  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }


}
