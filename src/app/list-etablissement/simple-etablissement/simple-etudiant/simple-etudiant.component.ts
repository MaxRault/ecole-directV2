import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../../../models/etudiant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EtablissemnentService } from '../../../services/etablissemnent.service';

@Component({
  selector: 'app-simple-etudiant',
  templateUrl: './simple-etudiant.component.html',
  styleUrls: ['./simple-etudiant.component.css']
})
export class SimpleEtudiantComponent implements OnInit {

  shcoolFormationEtudiant: Etudiant;

  constructor(private route: ActivatedRoute, private schoolService: EtablissemnentService,
              private router: Router) {}

  ngOnInit() {
    this.shcoolFormationEtudiant = new Etudiant('', '', '', '', '');
    // tslint:disable-next-line: no-string-literal
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    const idEtudiant = this.route.snapshot.params['idetudiant'];
    this.schoolService.getSingleShcoolEtudiant(+id, +idFormation, +idEtudiant).then(
      (etudiant: Etudiant) => {
        this.shcoolFormationEtudiant = etudiant;
      }
    );
  }

  onBack() {
    this.router.navigate(['/etablissement']);
  }
}
