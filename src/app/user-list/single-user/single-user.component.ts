import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private usersService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.user = new User('', '', '', '', '');
    // tslint:disable-next-line: no-string-literal
    const id = this.route.snapshot.params['id'];
    this.usersService.getSingleUser(+id).then(
      (user: User) => {
        this.user = user;
      }
    );
  }

  onBack() {
    this.router.navigate(['/users']);
  }

}
