import { Component, OnInit } from '@angular/core';
import { Formation } from '../../../models/formation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EtablissemnentService } from '../../../services/etablissemnent.service';

@Component({
  selector: 'app-simple-formation',
  templateUrl: './simple-formation.component.html',
  styleUrls: ['./simple-formation.component.css']
})
export class SimpleFormationComponent implements OnInit {

  shcoolFormation: Formation;

  constructor(private route: ActivatedRoute, private schoolService: EtablissemnentService,
              private router: Router) {}

  ngOnInit() {
    this.shcoolFormation = new Formation('', '', '');
    // tslint:disable-next-line: no-string-literal
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    this.schoolService.getSingleFormationShcool(+id, +idFormation).then(
      (formation: Formation) => {
        this.shcoolFormation = formation;
      }
    );
  }

  onBack() {
    this.router.navigate(['/etablissement']);
  }


}
