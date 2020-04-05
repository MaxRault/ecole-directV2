import { Component, OnInit, OnDestroy } from '@angular/core';
import { EtablissemnentService } from '../../services/etablissemnent.service';
import { Professeur } from '../../models/professeur.model';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-professeur',
  templateUrl: './list-professeur.component.html',
  styleUrls: ['./list-professeur.component.css']
})
export class ListProfesseurComponent implements OnInit, OnDestroy{
  schoolsProfesseur: Professeur[];
  schoolsrofesseursSubscription: Subscription;
  constructor(private route: ActivatedRoute, private schoolService: EtablissemnentService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    this.schoolService.getProfesseurData(id, idFormation);
    this.schoolsrofesseursSubscription = this.schoolService.schoolProfesseurSubject.subscribe(
      (professeur: Professeur[]) => {
        this.schoolsProfesseur = professeur;
        console.log('schoolFormation === ', this.schoolsProfesseur)
      }
    );
    this.schoolService.emitSchoolProfesseur();
  }

  onNewSchoolProfesseur() {
  const id = this.route.snapshot.params['id'];
  const idFormation = this.route.snapshot.params['idformation'];
  this.router.navigate(['/etablissement', 'view', id , 'formationview', idFormation , 'professeur', 'new']);
  }

  onDeleteSchoolProfesseur(idProfesseur: Professeur) {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    this.schoolService.removeSchoolProfesseur(idProfesseur, id, idFormation);
  }

  onViewSchoolProfesseur(idProfesseur: number) {
    const id = this.route.snapshot.params['id'];
    const idFormation = this.route.snapshot.params['idformation'];
    this.router.navigate(['/etablissement', 'view', id, 'formationview', idFormation, 'professeurview', idProfesseur]);
  }
  ngOnDestroy() {
    this.schoolsrofesseursSubscription.unsubscribe();
  }
}
