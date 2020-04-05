import { Component, OnInit, OnDestroy } from '@angular/core';
import { EtablissemnentService } from '../../services/etablissemnent.service';
import { Etudiant } from '../../models/etudiant.model';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent implements OnInit,  OnDestroy {
  schoolsEtudiants: Etudiant[];
  schoolsEtudiantsSubscription: Subscription;
  constructor(private route: ActivatedRoute, private schoolService: EtablissemnentService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    this.schoolService.getEtudiantData(id, idFormation);
    this.schoolsEtudiantsSubscription = this.schoolService.schoolEtudiantSubject.subscribe(
      (etudiant: Etudiant[]) => {
        this.schoolsEtudiants = etudiant;
        console.log('schoolFormation === ', this.schoolsEtudiants)
      }
    );
    this.schoolService.emitSchoolEtudiant();
  }

  onNewSchoolEtudiant() {
  const id = this.route.snapshot.params['id'];
  const idFormation = this.route.snapshot.params['idformation'];
  this.router.navigate(['/etablissement', 'view', id , 'formationview', idFormation , 'etudiant', 'new']);
  }

  onDeleteSchoolEtudiant(idEtudiant: Etudiant) {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    this.schoolService.removeSchoolEtudiant(idEtudiant, id, idFormation);
  }

  onViewSchoolEtudiant(idEtudiant: number) {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    this.router.navigate(['/etablissement', 'view', id, 'formationview', idFormation, 'etudiantview', idEtudiant]);
  }
  ngOnDestroy() {
    this.schoolsEtudiantsSubscription.unsubscribe();
  }
}
