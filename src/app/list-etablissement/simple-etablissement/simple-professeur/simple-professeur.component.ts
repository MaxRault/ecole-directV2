import { Component, OnInit } from '@angular/core';
import { Professeur } from '../../../models/professeur.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EtablissemnentService } from '../../../services/etablissemnent.service';

@Component({
  selector: 'app-simple-professeur',
  templateUrl: './simple-professeur.component.html',
  styleUrls: ['./simple-professeur.component.css']
})
export class SimpleProfesseurComponent implements OnInit {

  shcoolFormationProfesseur: Professeur;

  constructor(private route: ActivatedRoute, private schoolService: EtablissemnentService,
              private router: Router) {}

  ngOnInit() {
    this.shcoolFormationProfesseur = new Professeur('', '', '', '', '');
    // tslint:disable-next-line: no-string-literal
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    const idProfesseur = this.route.snapshot.params['idprofesseur'];
    this.schoolService.getSingleShcoolProfesseur(+id, +idFormation, +idProfesseur).then(
      (professeur: Professeur) => {
        this.shcoolFormationProfesseur = professeur;
      }
    );
  }

  onBack() {
    this.router.navigate(['/etablissement']);
  }
}
