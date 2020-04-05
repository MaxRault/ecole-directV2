import { Component, OnInit, OnDestroy } from '@angular/core';
import { EtablissemnentService } from '../../services/etablissemnent.service';
import { Formation } from '../../models/formation.model';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css']
})
export class ListFormationComponent implements OnInit, OnDestroy {
  schoolsFormation: Formation[];
  schoolsFormationSubscription: Subscription;
  constructor(private route: ActivatedRoute, private schoolService: EtablissemnentService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.schoolService.getFormationData(id);
    this.schoolsFormationSubscription = this.schoolService.schoolFormationSubject.subscribe(
      (formations: Formation[]) => {
        this.schoolsFormation = formations;
        console.log('schoolFormation === ', this.schoolsFormation)
      }
    );
    this.schoolService.emitSchoolFormationData();
  }

  onNewFormationSchool() {
  const id = this.route.snapshot.params['id'];
  this.router.navigate(['/etablissement', 'view', id , 'new']);
  }

  onDeleteFormationSchool(formation: Formation) {
    const id = this.route.snapshot.params['id'];
    this.schoolService.removeFormationSchool(formation, id);
  }

  onViewFormationSchool(idformation: number) {
    const id = this.route.snapshot.params['id'];
    console.log('id ', id)
    console.log('idFormation === ', idformation)
    this.router.navigate(['/etablissement', 'view', id, 'formationview', idformation]);
  }
  ngOnDestroy() {
    this.schoolsFormationSubscription.unsubscribe();
  }
}
