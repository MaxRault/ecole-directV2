import { Component, OnInit, OnDestroy } from '@angular/core';
import { EtablissemnentService } from '../services/etablissemnent.service';
import { Etablissement } from '../models/etablissement.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-etablissement',
  templateUrl: './list-etablissement.component.html',
  styleUrls: ['./list-etablissement.component.css']
})
export class ListEtablissementComponent implements OnInit, OnDestroy {
  schools: Etablissement[];
  schoolsSubscription: Subscription;

  constructor(private schoolService: EtablissemnentService, private router: Router) {}

  ngOnInit() {
    this.schoolsSubscription = this.schoolService.schoolSubject.subscribe(
      (schools: Etablissement[]) => {
        this.schools = schools;
      }
    );
    this.schoolService.emitSchool();
  }

  onNewSchool() {
    this.router.navigate(['/etablissement', 'new']);
  }

  onDeleteSchool(school: Etablissement) {
    this.schoolService.removeSchool(school);
  }

  onViewSchool(id: number) {
    this.router.navigate(['/etablissement', 'view', id]);
  }
  ngOnDestroy() {
    this.schoolsSubscription.unsubscribe();
  }


}
