import { Component, OnInit, OnDestroy } from '@angular/core';
import { EtablissemnentService } from '../../services/etablissemnent.service';
import { Matiere } from '../../models/matieres.model';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-matieres',
  templateUrl: './list-matieres.component.html',
  styleUrls: ['./list-matieres.component.css']
})
export class ListMatieresComponent implements OnInit, OnDestroy {
  schoolsMatieres: Matiere[];
  schoolsMatieresSubscription: Subscription;
  constructor(private route: ActivatedRoute, private schoolService: EtablissemnentService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    this.schoolService.getMatiereData(id, idFormation);
    this.schoolsMatieresSubscription = this.schoolService.schoolMatiereSubject.subscribe(
      (matieres: Matiere[]) => {
        this.schoolsMatieres = matieres;
        console.log('schoolFormation === ', this.schoolsMatieres)
      }
    );
    this.schoolService.emitSchoolMatiere();
  }

  onNewSchoolMatiere() {
  const id = this.route.snapshot.params['id'];
  const idFormation = this.route.snapshot.params['idformation'];
  this.router.navigate(['/etablissement', 'view', id , 'formationview', idFormation , 'new']);
  }

  onDeleteSchoolMatiere(idMatiere: Matiere) {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    this.schoolService.removeSchoolMatiere(idMatiere, id, idFormation);
  }

  onViewSchoolMatiere(idMatiere: number) {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    this.router.navigate(['/etablissement', 'view', id, 'formationview', idFormation, 'matiereview', idMatiere]);
  }
  ngOnDestroy() {
    this.schoolsMatieresSubscription.unsubscribe();
  }
}
