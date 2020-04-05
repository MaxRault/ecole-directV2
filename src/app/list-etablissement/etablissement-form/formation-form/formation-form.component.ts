import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formation } from '../../../models/formation.model';
import { EtablissemnentService } from '../../../services/etablissemnent.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.css']
})
export class FormationFormComponent implements OnInit {

  formationForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private schoolService: EtablissemnentService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formationForm = this.formBuilder.group({
      formationName: ['', Validators.required],
      annee: ['', Validators.required],
      commentaire: ['', Validators.required],
    });
  }
  
  onSaveSchool() {
    const id = this.route.snapshot.params['id'];
    console.log('id === ', id)
    const formationName = this.formationForm.get('formationName').value;
    const annee = this.formationForm.get('annee').value;
    const commentaire = this.formationForm.get('commentaire').value;
    const newFormation = new Formation(formationName, annee, commentaire);
    console.log('newFormation === ', newFormation)
    this.schoolService.createNewFormationSchool(newFormation, id);
    this.router.navigate(['/etablissement']);
  }


}
