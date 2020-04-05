import { Component, OnInit } from '@angular/core';
import { Etablissement } from '../../models/etablissement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EtablissemnentService } from '../../services/etablissemnent.service';

@Component({
  selector: 'app-simple-etablissement',
  templateUrl: './simple-etablissement.component.html',
  styleUrls: ['./simple-etablissement.component.css']
})
export class SimpleEtablissementComponent implements OnInit {

  shcool: Etablissement;
  show: boolean;

  constructor(private route: ActivatedRoute, private schoolService: EtablissemnentService,
              private router: Router) {}

  ngOnInit() {
    this.shcool = new Etablissement('', '');
    // tslint:disable-next-line: no-string-literal
    const id = this.route.snapshot.params['id'];
    this.schoolService.getSingleShcool(+id).then(
      (school: Etablissement) => {
        this.shcool = school;
      }
    );
  }

  onBack() {
    this.router.navigate(['/etablissement']);
  }


}
