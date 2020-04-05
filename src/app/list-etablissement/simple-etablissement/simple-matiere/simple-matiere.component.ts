import { Component, OnInit } from '@angular/core';
import { Matiere } from '../../../models/matieres.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EtablissemnentService } from '../../../services/etablissemnent.service';

@Component({
  selector: 'app-simple-matiere',
  templateUrl: './simple-matiere.component.html',
  styleUrls: ['./simple-matiere.component.css']
})
export class SimpleMatiereComponent implements OnInit {

  shcoolFormationMatiere: Matiere;

  constructor(private route: ActivatedRoute, private schoolService: EtablissemnentService,
              private router: Router) {}

  ngOnInit() {
    this.shcoolFormationMatiere = new Matiere('', '', '');
    // tslint:disable-next-line: no-string-literal
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    const idMatiere = this.route.snapshot.params['idmatiere'];
    this.schoolService.getSingleShcoolMatiere(+id, +idFormation, +idMatiere).then(
      (matiere: Matiere) => {
        this.shcoolFormationMatiere = matiere;
      }
    );
  }

  onBack() {
    this.router.navigate(['/etablissement']);
  }


}
